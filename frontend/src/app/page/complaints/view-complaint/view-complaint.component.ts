import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.component.html',
  styleUrls: ['./view-complaint.component.css']
})
export class ViewComplaintComponent implements OnInit {

  complaint: any = null;
  apiUrl = globalEnv.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private web: webService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.web.webServiceRetrieve(`${this.apiUrl}/complaints/${id}`).subscribe({
        next: (data: any) => {
          this.complaint = data;
        },
        error: (err) => console.error(err)
      });
    }
  }

  markAsResolved() {
    if (this.complaint && !this.complaint.resolved) {
      const id = this.complaint._id;
      // Sends { resolved: true } to the PUT route we created earlier
      this.web.webServiceUpdate(`${this.apiUrl}/complaints/${id}`, { resolved: true }).subscribe({
        next: (response) => {
          // Update the local object immediately to reflect changes in the UI
          this.complaint.resolved = true;
        },
        error: (err) => console.error('Error resolving complaint:', err)
      });
    }
  }

  goBack() {
    this.router.navigate(['/complaints']);
  }
}
