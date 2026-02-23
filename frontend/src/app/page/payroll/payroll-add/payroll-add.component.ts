import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-payroll-add',
  templateUrl: './payroll-add.component.html',
})
export class PayrollAddComponent implements OnInit{

  public payrollForm!: FormGroup;
  public employees: any[] = [];
  selectedEmployee: any = null;
  apiUrl = globalEnv.apiUrl;
  constructor(
    private router: Router,
    private web: webService,
    private fb: FormBuilder){}

    goBack(){
      this.router.navigate(['payroll'])
    }

    ngOnInit(): void {
        this.payrollForm = this.fb.group({
          employeeId: [null, Validators.required],
          date: [new Date(), Validators.required],
          amount: [0, Validators.required],
          hoursWorked: [0],
          deductions: [0],
          bonuses: [0]
        });
        this.web.webServiceRetrieve(`${this.apiUrl}/employees`).subscribe((data: any) => {
          this.employees = data;
        })
    }

    onEmployeeSelect(event: any) {
    const empId = event.value;
    this.selectedEmployee = this.employees.find(e => e._id === empId || e.id === empId);
     this.payrollForm = this.fb.group({
          employeeId: [this.selectedEmployee._id, Validators.required],
          date: [new Date(), Validators.required],
          amount: [this.selectedEmployee.salary, Validators.required],
          hoursWorked: [0],
          deductions: [0],
          bonuses: [0]
        });
  }

  onSubmit() {
        console.log("something");
    if (this.payrollForm.valid) {

      // This object matches the new Schema perfectly
      const payrollData = this.payrollForm.value;
      this.web.webServiceCreate(`${this.apiUrl}/finance`, payrollData).subscribe({
        next: () => {
          console.log("Payroll created!");
          this.router.navigate(['payroll']);
        },
        error: (err) => console.error(err)
      });
    }
  }
}
