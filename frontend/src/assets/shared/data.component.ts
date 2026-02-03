import { Injectable } from "@angular/core";
import { employeeDataModel } from "./data.model";
import { payrollDataModel } from "./data.model";
import { Subject } from "rxjs";

@Injectable({providedIn: "root"})
export class dataComponentService{
  EmployeeSubject = new Subject<employeeDataModel[]>();
  PayrollSubject = new Subject<payrollDataModel[]>();

  EmployeeDataModel: employeeDataModel[] = [
    new employeeDataModel(1, "Dalibor Walter", "Department of Stuff", "COO"),
    new employeeDataModel(2, "Erlan Sully", "Email Forwarding Division", "CEO"),
    new employeeDataModel(3, "Kim Hirohito", "Strategic Coffee Operations", "CEO"),
    new employeeDataModel(4, "Ofnir Audrey", "Innovation & Buzzwords", "CFO"),
    new employeeDataModel(5, "Ramesh Michael", "Temporary Solutions", "JUNIOR")
  ]

  payrollDataModel: payrollDataModel[] = [

  ]

  onDeleteEmployeeData(index: number){
    this.EmployeeDataModel.splice(index, 1);
    this.EmployeeSubject.next(this.EmployeeDataModel);
  }

  onAddEmployeeData(employee: employeeDataModel){
    this.EmployeeDataModel.push(employee);
    this.EmployeeSubject.next(this.EmployeeDataModel);
  }
}
