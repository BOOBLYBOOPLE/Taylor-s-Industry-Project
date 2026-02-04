import { Injectable } from "@angular/core";
import { employeeDataModel, leavesDataModel } from "./data.model";
import { payrollDataModel } from "./data.model";
import { Subject } from "rxjs";

@Injectable({providedIn: "root"})
export class dataComponentService{
  EmployeeSubject = new Subject<employeeDataModel[]>();
  PayrollSubject = new Subject<payrollDataModel[]>();
  LeavesSubject = new Subject<leavesDataModel[]>();

  EmployeeDataModel: employeeDataModel[] = [

  ]

  PayrollDataModel: payrollDataModel[] = []

  LeavesDataModel: leavesDataModel[] = []

}
