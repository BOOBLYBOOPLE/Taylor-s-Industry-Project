import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report-bugs',
  templateUrl: './report-bugs.component.html',
  styleUrls: ['./report-bugs.component.css'] // Ensure this file exists, or remove this line
})
export class ReportBugsComponent {

  bugData = {
    email: '',
    type: 'UI Issue',
    description: ''
  };

  isLoading = false;

  bugTypes = ['UI Issue', 'Functional Bug', 'Performance', 'Other'];

  constructor(
    public dialogRef: MatDialogRef<ReportBugsComponent>,
    private snackBar: MatSnackBar
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.bugData.description) {
      this.snackBar.open('Please describe the issue.', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;

    // Simulate network delay
    setTimeout(() => {
      this.isLoading = false;
      this.snackBar.open('Bug report submitted successfully! Thank you.', 'OK', { duration: 3000 });
      this.dialogRef.close();
    }, 1500);
  }
}
