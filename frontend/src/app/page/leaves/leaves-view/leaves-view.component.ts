import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-leaves-view',
  templateUrl: './leaves-view.component.html',
  styleUrls: ['./leaves-view.component.css']
})
export class LeavesViewComponent implements OnInit {

  leaveData: any = null;
  apiUrl = globalEnv.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private web: webService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.web.webServiceRetrieve(`${this.apiUrl}/leaves/${id}`).subscribe({
        next: (data) => this.leaveData = data,
        error: (err) => console.error(err)
      });
    }
  }

  updateStatus(newStatus: string) {
    if (this.leaveData) {
      const id = this.leaveData._id;
      this.web.webServiceUpdate(`${this.apiUrl}/leaves/${id}`, { status: newStatus }).subscribe({
        next: () => {
          this.leaveData.status = newStatus; // Update UI immediately
        },
        error: (err) => console.error(err)
      });
    }
  }

  goBack() {
    this.router.navigate(['/leaves']);
  }
}
