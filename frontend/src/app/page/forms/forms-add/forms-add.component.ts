import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-forms-add',
  templateUrl: './forms-add.component.html',
  styleUrls: ['./forms-add.component.css']
})
export class FormsAddComponent {
  private apiUrl = globalEnv.apiUrl + '/forms/upload';

  formData = {
    date: Date.now(),
    description: '',
    submit: ''
  };
  selectedFile: File | null = null;
  selectedFileName: string | null = null;

  constructor(private web: webService, private router: Router) {}

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

  onSubmit() {
  if (!this.selectedFile) {
    alert('Please select a file.');
    return;
  }

  const uploadData = new FormData();

  uploadData.append('file', this.selectedFile);
  uploadData.append('description', this.formData.description || ''); // Handle empty string
  uploadData.append('submit', this.formData.submit || '');
  uploadData.append('date', this.formData.date.toString());

  this.web.webServiceCreate(this.apiUrl, uploadData).subscribe({
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
