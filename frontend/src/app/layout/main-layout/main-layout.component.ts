import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/assets/services/auth.service';
import { ReportBugsComponent } from 'src/app/components/report-bugs/report-bugs.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DocumentationComponent } from 'src/app/components/documentation/documentation.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit, OnDestroy{

  @ViewChild('sidenav') sidenav!: MatSidenav;

  titleDisplay: any;
  displayedColumns = {
    home: ' Home',
    employee: ' Employee',
    paynfin: '  Payroll & Finance',
    payroll: '  Payroll',
    finance: '  Finance',
    timetable: '  Scheduling & Attendance',
    attendance: ' Attendance',
    leaves: ' Leaves',
    calendar: ' Calendar',
    recruit: '  Recruitment',
    eva: '  Evaluation & Forms',
    complaints: ' Complaints',
    analytics: '  Analytics',
    reports: '  Reports',
    settings: ' Settings'
  }
  payrollPanelOpenState = false;
  calendarPanelOpenState = false;
  formsPanelOpenState = false;
  currentUrl: string ='';
  isAdmin = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    public dialog: MatDialog){
      this.isAdmin = this.auth.getRole() === 'admin';
  }
  homeUrl: string = '/home';

  changeTitle(text: string){
    this.titleDisplay = text;
    this.currentUrl = this.router.url;
    localStorage.setItem('activeTitle', this.titleDisplay);
  }

  ngOnInit(): void {
        this.currentUrl = this.router.url;
      const title = localStorage.getItem('activeTitle');
      if(this.currentUrl === this.homeUrl)
        this.titleDisplay = this.displayedColumns.home;
      else
        this.titleDisplay = title;
  }

  ngOnDestroy(): void {
      localStorage.clear();
  }

  openReport(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mat-dialog-panel';
    const dialogRef = this.dialog.open(ReportBugsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('67', result);
    });
  }
  toggleSideNav(){
    if(!this.sidenav.opened){
      this.payrollPanelOpenState = false;
      this.calendarPanelOpenState = false;
      this.formsPanelOpenState = false;
      console.log(this.payrollPanelOpenState);

    }
    else{
            console.log(this.payrollPanelOpenState);
            console.log("AWE");
    }
    this.sidenav.toggle();
  }

  openInfo(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mat-dialog-panel';
    const dialogRef = this.dialog.open(DocumentationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('67', result);
    });
  }
}
