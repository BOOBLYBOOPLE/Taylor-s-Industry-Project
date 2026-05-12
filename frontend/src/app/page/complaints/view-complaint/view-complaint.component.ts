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
    this.getInfo();
  }

  getInfo(){
    const id = this.route.snapshot.paramMap.get('id');
    this.web.webServiceRetrieve(`${this.apiUrl}/complaints/${id}`).subscribe({
      next: (data: any) => {
        this.complaint = data;
      },
      error: (err) => console.error(err)
    });
  }

markAsResolved() {
  if (this.complaint && !this.complaint.resolved) {
    const id = this.route.snapshot.paramMap.get('id');
    const updateData = { resolved: true };

    this.web.webServiceUpdate(`${this.apiUrl}/complaints/${id}`, updateData).subscribe({
      next: () => {
        console.log('updated');
        this.router.navigate(['/complaints']);
      },
      error: (error: any) => console.error('Error resolving complaint:', error)
    });
  }
}

  goBack() {
    this.router.navigate(['/complaints']);
  }
}
