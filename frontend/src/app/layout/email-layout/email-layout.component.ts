import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/assets/services/data.service';
import { ReportBugsComponent } from 'src/app/components/report-bugs/report-bugs.component';
import { DocumentationComponent } from 'src/app/components/documentation/documentation.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-email-layout',
  templateUrl: './email-layout.component.html',
  styleUrls: ['./email-layout.component.css']
})
export class EmailLayoutComponent{

  constructor(
    private data: DataService,
    public dialog: MatDialog
  ){}

  sendFilter(filter: string){
    this.data.sendData(filter);
    this.data.triggerFunction();
  }

  openReport(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mat-dialog-panel';
    const dialogRef = this.dialog.open(ReportBugsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('67');
    });
  }

  openInfo(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mat-dialog-panel';
    const dialogRef = this.dialog.open(DocumentationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('69');
    });
  }

}
