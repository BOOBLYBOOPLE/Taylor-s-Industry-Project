import { Component, Inject, inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData{
  something: string,
  idk: string
}

@Component({
  selector: 'app-forgot-password-window',
  templateUrl: './forgot-password-window.component.html',
})
export class ForgotPasswordWindowComponent {

  hide = true;
  hide1 = true;

  data = {
    identifier: '',
    newPassword: '',
    confirmPassword: ''
  };
  isLoading = false;
  public apiUrl = globalEnv.apiUrl + '/users/reset-password-direct';

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private web: webService,
    private snackBar: MatSnackBar
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.data.identifier || !this.data.newPassword) {
      this.snackBar.open('Please fill in all fields', 'Close');
      return;
    }

    if (this.data.newPassword !== this.data.confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Close');
      return;
    }

    this.isLoading = true;

    this.web.webServiceCreate(this.apiUrl, {
      identifier: this.data.identifier,
      newPassword: this.data.newPassword
    }).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.snackBar.open(res.message, 'OK', { duration: 3000 });
        this.dialogRef.close();
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open(err.error.message || 'Error resetting password', 'Close');
      }
    });
  }
}
