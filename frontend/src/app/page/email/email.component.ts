import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { emailDataModel } from 'src/assets/shared/data.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataService } from 'src/assets/services/data.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
})

export class EmailComponent implements OnInit{
  public panelOpenState = false;
  public displayedColumns: string[] = ['position', 'from', 'to', 'subject', 'date', 'actions'];
  public dataSource = new MatTableDataSource<emailDataModel>([]);
  public filterData: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public apiURL = globalEnv.apiUrl;
  public user: any = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(
    public webService: webService,
    public http: HttpClient,
    public router: Router,
    public data: DataService
  ){}

  ngOnInit(): void {
  this.syncEmails();

  this.getEmailList(this.filterData || 'all');

  this.data.data$.subscribe(filter => {
    this.filterData = filter;
    this.getEmailList(filter);
  });

}

  getEmailList(filter?: string) {
    this.webService.webServiceRetrieve(`${this.apiURL}/emails`).subscribe({
      next: (res: any) => {
        const emailData = res as any[];
        if (filter && filter !== 'all') {
          this.dataSource.data = this.applyFilterLogic(emailData, filter);
        } else {
          this.dataSource.data = emailData;
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.error(error)
    });
  }

syncEmails() {
  const data = { userId: this.user.id };
  this.webService.webServiceCreate(`${this.apiURL}/emails/sync`, data).subscribe({
    next: responseData => {
      console.log(responseData);
    },
    error: (err) => console.error("Sync failed", err)
  });
}

private applyFilterLogic(data: any[], filter: string): any[] {
  switch (filter) {
    case "important": return data.filter(item => item.important === true);
    case "draft":     return data.filter(item => item.draft === true);
    case "spam":      return data.filter(item => item.spam === true);
    case "trash":     return data.filter(item => item.trashed === true);
    case "inbox":     return data.filter(item => item.received === true);
    case "sent":      return data.filter(item => item.sent === true);
    default:          return data;
  }
}

markFilter(filter: string, id: string, index: number, reverse: boolean) {
  const email = this.dataSource.data[index];

  if (filter === "important") email.important = reverse === true ?  false : true;
  if (filter === "spam")      email.spam = reverse === true ?  false : true;
  if (filter === "trash")     email.trashed = reverse === true ?  false : true;
  if (filter === "draft")     email.draft = reverse === true ?  false : true;

  const updateData = {
    ...email,
    userId: email.userID
  };

  this.webService.webServiceUpdate(`${this.apiURL}/emails/${id}`, updateData).subscribe({
    next: () => {
      this.getEmailList(this.filterData);
    }
  });
}

  viewEmail(id: string){
    this.router.navigate(['/email/view', id]);
  }

  composeEmail(){
    this.router.navigate(['/email/compose']);
  }
}
