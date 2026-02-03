import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { webService } from 'src/assets/services/webServices'; //
import { globalEnv } from 'src/assets/shared/global-env.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-recruitment',
  templateUrl: './view-recruitment.component.html',
  styleUrls: ['./view-recruitment.component.css']
})
export class ViewRecruitmentComponent implements OnInit {
  data: any = null;
  private apiUrl = globalEnv.apiUrl + '/recruitment';

  constructor(
    private route: ActivatedRoute,
    private web: webService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.web.webServiceRetrieve<any>(`${this.apiUrl}/${id}`).subscribe({
        next: (res) => {
          this.data = res;
        },
        error: (err) => console.error(err)
      });
    }
  }

  goBack() {
    this.router.navigate(['/recruitment']);
  }
}
