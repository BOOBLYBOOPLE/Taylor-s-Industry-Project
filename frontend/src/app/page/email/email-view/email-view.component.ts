import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.css']
})
export class EmailViewComponent implements OnInit{

  public apiUrl = globalEnv.apiUrl;

  public emailData: any = {};

  constructor(
    public http: HttpClient,
    public webService: webService,
    public router: ActivatedRoute,
    public route: Router
  ){}

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if(id) {
      this.getEmail(id);
    }
  }

  composeEmail(){
      this.route.navigate(['/email/compose', this.emailData._id]);
  }

  getEmail(id: string): void {
    this.webService.webServiceRetrieve(`${this.apiUrl}/emails/${id}`).subscribe({
      next: (res) => this.emailData = res,
      error: (err) => console.error(err)
    });
  }
}
