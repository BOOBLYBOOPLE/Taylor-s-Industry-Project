import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {
    constructor(
      public dialogRef: MatDialogRef<DocumentationComponent>,
    ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

}
