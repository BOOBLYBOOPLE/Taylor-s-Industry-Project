import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

export interface LeaveLog{
  name: string;
  position: number;
  department: string;
  leaveType: string;
  dateStart: string;
  dateEnd: string;
  status: string;
}

const ELEMENT_DATA: LeaveLog[] = [
  {position: 1, name: 'Dalibor Walter', department: 'Department of Miscellaneous Stuff', leaveType: 'Sick', dateStart: '19/10/2025', dateEnd: '21/10/2025', status: 'Approved'},
  {position: 2, name: 'Erlan Sully', department: 'Email Forwarding Division', leaveType: 'Break', dateStart: '19/10/2025', dateEnd: '21/10/2025', status: 'Unapproved'},
  {position: 3, name: 'Kim Hirohito', department: 'Strategic Coffee Operations', leaveType: 'Emergency', dateStart: '19/10/2025', dateEnd: '21/10/2025', status: 'Approved'},
  {position: 4, name: 'Ofir Audrey', department: 'Innovation & Buzzword Management', leaveType: 'Sick', dateStart: '19/10/2025', dateEnd: '21/10/2025', status: 'Unapproved'},
  {position: 5, name: 'Ramesh Michael', department: 'Temporary Solutions Department', leaveType: 'Emergency', dateStart: '19/10/2025', dateEnd: '21/10/2025', status: 'Unapproved'},
  {position: 6, name: 'Venceslau Francesca', department: 'Spreadsheet Optimization Unit', leaveType: 'Sick', dateStart: '19/10/2025', dateEnd: '21/10/2025', status: 'Approved'},
  {position: 7, name: 'Natalia Sunil', department: 'Meeting Scheduling Office', leaveType: 'Sick', dateStart: '19/10/2025', dateEnd: '21/10/2025', status: 'Approved'},
  {position: 8, name: 'Jordanes Fabiana', department: 'Department of Red Tape', leaveType: 'Sick', dateStart: '19/10/2025', dateEnd: '21/10/2025', status: 'Rejected'},
  {position: 9, name: 'Meng Joanne', department: 'Moral Support Team', leaveType: 'Break', dateStart: '19/10/2025', dateEnd: '21/10/2025', status: 'UnApproved'},
  {position: 10, name: 'Lillias Charles', department: 'IT (Ignore Tickets) Support', leaveType: 'Break', dateStart: '19/10/2025', dateEnd: '21/10/2025', status: 'Approved'}
];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
})

export class CalendarComponent {
  panelOpenState = false;
  displayedColumns: string[] = ['position', 'name', 'department', 'leaveType', 'dateStart', 'dateEnd', 'status', 'actions'];
  dataSource = ELEMENT_DATA;
}
