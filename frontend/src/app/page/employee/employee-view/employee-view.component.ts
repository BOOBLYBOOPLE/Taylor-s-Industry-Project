import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { MatGridListModule } from "@angular/material/grid-list";
import { DatePipe } from '@angular/common';
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatGridListModule, DatePipe, MatDividerModule, MatDividerModule]
})

export class EmployeeViewComponent implements OnInit {
  public name: any;
  public email: any;
  public department: any;
  public title: any;
  public DOB: any;
  public dateOfEntry: any;
  public phone: any;
  public salary: any;
  public workingHours: any;
  public about: any;
  constructor(
    private router: Router,
    private web: webService,
    private route: ActivatedRoute){}

  public apiUrl = globalEnv.apiUrl;

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');

      if(id){
        this.web.webServiceRetrieve(`${this.apiUrl}/employees/${id}`).subscribe({
          next: (responseData: any) => {
            this.name = responseData.name;
            this.department = responseData.department;
            this.title = responseData.title;
            this.DOB = responseData.DOB;
            this.dateOfEntry = responseData.dateOfEntry;
            this.email = responseData.email;
            this.phone = responseData.phone;
            this.salary = responseData.salary;
            this.workingHours = responseData.workingHours;
            this.about = responseData.about;
          }, error: error => {
            console.log("CANNOT VIEW EMPLOYEE");
          }
        });
      }
    }

  goBack(){
    this.router.navigate(['employee'])
  }
}
