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
  public empStartTime: any;
  public empEndTime: any;
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
        });
    }

    calculateTimeDiff(time1: string, time2: string): number{
      const [h1, m1] = time1.split(":").map(Number);
      const [h2, m2] = time2.split(":").map(Number);

      const totalMinutes1 = h1 + m1;
      const totalMinutes2 = h2 + m2;

      const finalAmt = totalMinutes2 - totalMinutes1;
      console.log(finalAmt);
      return (finalAmt) * (this.getTotalDays() - this.getWeekends())
    }

    getTotalDays(): number{
      const now = new Date();

      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return lastDay.getDate();
    }

    getWeekends(): number {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      let weekendCount = 0;

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        const dayOfWeek = currentDate.getDay();

        if (dayOfWeek === 0 || dayOfWeek === 6) {
          weekendCount++;
        }
      }

      return weekendCount;
    }

    onEmployeeSelect(event: any) {
    const empId = event.value;
    this.selectedEmployee = this.employees.find(e => e._id === empId || e.id === empId);
    this.empStartTime = this.selectedEmployee.startTime;
    this.empEndTime = this.selectedEmployee.endTime;
    const totalTime = this.calculateTimeDiff(this.empStartTime, this.empEndTime);
    console.log(totalTime);

    this.payrollForm = this.fb.group({
      employeeId: [this.selectedEmployee._id, Validators.required],
      date: [new Date(), Validators.required],
      amount: [this.selectedEmployee.salary, Validators.required],
      hoursWorked: [totalTime],
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
