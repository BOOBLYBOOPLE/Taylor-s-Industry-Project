import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices';
import { ActivatedRoute } from '@angular/router';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-payroll-view',
  templateUrl: './payroll-view.component.html',
  styleUrls: ['./payroll-view.component.css']
})
export class PayrollViewComponent implements OnInit{
  constructor(
    @Inject(LOCALE_ID)
    private locale: string,
    private router: Router,
    private web: webService,
    private route: ActivatedRoute){}

    public apiUrl = globalEnv.apiUrl;
    public employeeName: any;
    public employeeDepartment: any;
    public employeeTitle: any;
    public totalAmount: any;
    public hoursWorked: any;
    public deductions: any;
    public bonuses: any;
    public earned: any;
    public date: any;

  goBack(){
    this.router.navigate(['payroll']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id){
      this.web.webServiceRetrieve(`${this.apiUrl}/finance/${id}`).subscribe({
        next: (responseData: any) => {
          //employee details
          this.date = responseData.date;
          this.hoursWorked = responseData.hoursWorked;
          this.deductions = responseData.deductions;
          this.earned = responseData.amount;
          this.bonuses = responseData.bonuses;
          this.date = this.getFormattedDate();

          const empId = responseData.employeeId;

          this.web.webServiceRetrieve(`${this.apiUrl}/employees/${empId}`).subscribe({
            next: (empData: any) => {
              this.employeeName = empData.name;
              this.employeeDepartment = empData.department;
              this.employeeTitle = empData.title;
            }
          });
          console.log(responseData);
        }
      });
    }
  }

  getFormattedDate(): string {
    if(!this.date) return '';
    return formatDate(this.date, 'dd-MM-yyyy', this.locale)
  }
}
