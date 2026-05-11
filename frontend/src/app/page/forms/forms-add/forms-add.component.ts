import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-forms-add',
  templateUrl: './forms-add.component.html',
  styleUrls: ['./forms-add.component.css']
})
export class FormsAddComponent implements OnInit {
  private apiUrl = globalEnv.apiUrl;

  formData = {
    date: Date.now(),
    description: '',
    employeeId: null
  };
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  selectedEmployee: any;
  employees: any = [];

  constructor(private web: webService, private router: Router) {}

  ngOnInit(): void {
    this.web.webServiceRetrieve(`${this.apiUrl}/employees`).subscribe((data: any) => {
      this.employees = data;
      console.log(this.employees);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }

  goBack() {
    this.router.navigate(['forms']);
  }

  onEmployeeSelect(event: any) {
    const empId = event.value;
    this.selectedEmployee = this.employees.find((e: { _id: any; id: any; }) => e._id === empId || e.id === empId);
  }

  onSubmit() {
  if (!this.selectedFile) {
    alert('Please select a file.');
    return;
  }

  const uploadData = new FormData();

  uploadData.append('file', this.selectedFile);
  uploadData.append('description', this.formData.description || ''); // Handle empty string
  uploadData.append('employeeId', this.formData.employeeId || '');
  uploadData.append('date', this.formData.date.toString());

  this.web.webServiceCreate(`${this.apiUrl + '/forms/upload'}`, uploadData).subscribe({
    next: (res) => {
      alert('Document Uploaded Successfully!');
      this.router.navigate(['/forms']);
    },
    error: (err) => {
      console.error(err);
      alert('Error uploading: ' + err.message);
    }
  });
}
}
