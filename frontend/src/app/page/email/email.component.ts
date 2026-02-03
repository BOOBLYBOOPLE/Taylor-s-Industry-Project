import { Component } from '@angular/core';

export interface EmailLog{
  from: string;
  position: number;
  to: string;
  subject: string;
  date: string;
}

const ELEMENT_DATA: EmailLog[] = [
  {position: 1, from: 'Dalibor Walter', to: 'Lillias Charles', subject: 'Update on Current Task / Project Status', date: '25/11/2025'},
  {position: 2, from: 'Erlan Sully', to: 'Meng Joanne', subject: 'Request for Clarification on Requirements', date: '25/11/2025'},
  {position: 3, from: 'Kim Hirohito', to: 'Jordanes Fabiana', subject: 'Scheduling a Meeting Regarding New Project', date: '25/11/2025'},
  {position: 4, from: 'Ofir Audrey', to: 'Natalia Sunil', subject: 'Update on Leave Application', date: '25/11/2025'},
  {position: 5, from: 'Ramesh Michael', to: 'Venceslau Francesca', subject: 'Deliverables for the Upcoming Sprint', date: '25/11/2025'}
];

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
})
export class EmailComponent {
  panelOpenState = false;
  displayedColumns: string[] = ['position', 'from', 'to', 'subject', 'date', 'actions'];
  dataSource = ELEMENT_DATA;
}
