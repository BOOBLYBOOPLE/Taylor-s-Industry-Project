import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-add',
  templateUrl: './email-add.component.html',
  styleUrls: ['./email-add.component.css']
})
export class EmailAddComponent implements OnInit {

 public apiURL = globalEnv.apiUrl;
  public emailForm!: FormGroup;
  public recipient: any;
  public sender: any;
  public CC: any;
  public subject: any;
  public content: any;

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

  constructor(
    public http: HttpClient,
    public router: Router,
    public webService: webService,
    public fb: FormBuilder
  ){}
  public user = JSON.parse(localStorage.getItem('user') || '{}');

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      recipient: new FormControl(null, [Validators.required, Validators.email]),
      sender: new FormControl(this.user.email, Validators.required),
      userId: new FormControl(this.user.id, Validators.required),
      subject: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      sendDate: new FormControl(new Date())
    });
  }

  sendEmail(){

    const data = {
      userId: this.user.id,
      recipient: this.emailForm.value.recipient,
      sender: this.emailForm.value.sender,
      subject: this.emailForm.value.subject,
      content: this.emailForm.value.content,
      sendDate: new Date().getTime()
    }

    this.webService.webServiceCreate(`${this.apiURL}/emails/send`, data).subscribe({
      next: () => {
        alert('Sent');
        this.router.navigate(['/email/main']);
      },
      error: (err) => console.error(err)
    });
  }

  saveDraft(){
    const data = {
      userId: this.user.id,
      recipient: this.emailForm.value.recipient,
      sender: this.emailForm.value.sender,
      subject: this.emailForm.value.subject,
      content: this.emailForm.value.content,
      sendDate: new Date().getTime()
    }

    this.webService.webServiceCreate(`${this.apiURL}/emails/draft`, data).subscribe({
      next: () => {
        alert('drafted');
        this.router.navigate(['/email/main']);
      },
      error: (err) => console.error(err)
    });
  }

}
