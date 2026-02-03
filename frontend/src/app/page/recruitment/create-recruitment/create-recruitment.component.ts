import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices'; //
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-create-recruitment',
  templateUrl: './create-recruitment.component.html',
  styleUrls: ['./create-recruitment.component.css']
})


export class CreateRecruitmentComponent {
  private apiUrl = globalEnv.apiUrl + '/recruitment/add';

    public quillStyle = {
      'width': '100%',
      'min-height': '200px',
      'display': 'block',
      'background': "#fff"
    }
    public quillConfig = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // basic formatting
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // header dropdown
        [{ 'color': [] }, { 'background': [] }], // color options
        ['link', 'image', 'video'], // embeds
        ['clean'] // remove formatting button
      ]
    };

  formData = {
    name: '',
    University: '',
    age: null,
    date: '',
    description: '',
    exp: ''
  };
  selectedFile: File | null = null;

  // Inject webService directly
  constructor(private web: webService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  goBack(){
    this.router.navigate(['recruitment'])
  }

  onSubmit() {
    const uploadData = new FormData();
    uploadData.append('name', this.formData.name);

    if (this.formData.date) {
      const dateString = new Date(this.formData.date).toISOString();
      uploadData.append('date', dateString);
    }

    if (this.formData.age) {
      uploadData.append('age', this.formData.age);
    }

    uploadData.append('University', this.formData.University);
    uploadData.append('status', 'Applied');
    uploadData.append('description', this.formData.description);
    uploadData.append('exp', this.formData.exp)

    if (this.selectedFile) {
      uploadData.append('resume', this.selectedFile, this.selectedFile.name);
    } else {
      alert('Please select a resume file.');
      return;
    }

    this.web.webServiceCreate(this.apiUrl, uploadData).subscribe({
      next: (res) => {
        alert('Recruitment Added!');
        this.router.navigate(['/recruitment']);
      },
      error: (err) => {
        console.error(err);
        alert('Error uploading: ' + err.message);
      }
    });
  }
}
