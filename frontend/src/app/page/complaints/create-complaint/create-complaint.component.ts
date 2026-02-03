import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { webService } from 'src/assets/services/webServices';
import { ActivatedRoute } from '@angular/router';
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-create-complaint',
  templateUrl: './create-complaint.component.html',
  styleUrls: ['./create-complaint.component.css']
})
export class CreateComplaintComponent implements OnInit{

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
    private router: Router,
    private route: ActivatedRoute,
    private web: webService,
    private fb: FormBuilder){}

    public complaintForm!: FormGroup;
    public apiUrl = globalEnv.apiUrl;
    public employees: any[] = [];
    public complaintTypes: any[] = [
      'Harassment',
      'Safety',
      'Other'
    ];
  selectedEmployee: any = null;

  goBack(){
    this.router.navigate(['complaints'])
  }

  ngOnInit(): void {
      this.complaintForm = this.fb.group({
        employeeId: [null, Validators.required],
        targetedEmployee: [null],
        date: [new Date()],
        type: [null],
        summary: [null, Validators.required],
        content: [null, Validators.required],
      });
      this.web.webServiceRetrieve(`${this.apiUrl}/employees`).subscribe((data: any) => {
        this.employees = data;
      });
  }

  get availableTargets(){
    const reporterId = this.complaintForm.get('employeeId')?.value;

    if (!reporterId) {
      return this.employees;
    }
    return this.employees.filter(emp => (emp._id || emp.id) !== reporterId);
  }

  onEmployeeSelect(event: any) {
    const empId = event.value;
    this.selectedEmployee = this.employees.find(e => e._id === empId || e.id === empId);
  }


  onSubmit(){
    if(this.complaintForm.valid){
      const complaintData = this.complaintForm.value;
      this.web.webServiceCreate(`${this.apiUrl}/complaints`, complaintData).subscribe({
        next: responseData => {
          this.router.navigate(['complaints']);
        }, error : error => {
          console.log(error);
        }
      });
    }
  }
}
