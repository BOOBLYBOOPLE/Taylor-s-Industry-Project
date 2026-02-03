import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/assets/services/auth.service';
import { ForgotPasswordWindowComponent } from '../../components/popup-window/forgot-password-window/forgot-password-window.component';
import { ReportBugsComponent } from 'src/app/components/report-bugs/report-bugs.component';
import { DocumentationComponent } from 'src/app/components/documentation/documentation.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit{
  public form!: FormGroup;
  hide = true;
    panelOpenState = false;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private auth: AuthService
  ){}

  ngOnInit(){
    this.form  = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    if (!this.form.invalid) {
      this.auth.login(this.form.value).subscribe({
        next: responseData => {
          this.auth.saveToken(responseData.token);
          const role = responseData.user.role;
          this.router.navigate(['/home']);
        },
        error: err => {
          alert("Login Failed");
        }
      });
    }
  }

  openForgot(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mat-dialog-panel';
    const dialogRef = this.dialog.open(ForgotPasswordWindowComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('67', result);
    })
  }

  openReport(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mat-dialog-panel';
    const dialogRef = this.dialog.open(ReportBugsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('67', result);
    });
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
