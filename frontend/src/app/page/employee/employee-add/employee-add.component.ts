import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices';
import { dataComponentService } from 'src/assets/shared/data.component';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { employeeDataModel } from 'src/assets/shared/data.model';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
})
export class EmployeeAddComponent implements OnInit {
  constructor(
    private router: Router,
    public webService: webService,
    private route: ActivatedRoute){}

  public isEditing = false;
  public employeeID: any;
  public apiUrl = globalEnv.apiUrl;
  public employeeAddForm!: FormGroup;

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

  ngOnInit(): void {
      this.employeeAddForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        department: new FormControl(null, Validators.required),
        title: new FormControl(null, Validators.required),
        DOB: new FormControl(null),
        dateOfEntry: new FormControl(null),
        email: new FormControl(null, Validators.email),
        phone: new FormControl(null, Validators.pattern('^[0-9]+$')),
        salary: new FormControl(null, Validators.required),
        workingHours: new FormControl(null, Validators.required),
        about: new FormControl(null)
      });

      this.employeeID = this.route.snapshot.paramMap.get('id');

      if(this.employeeID){
        this.isEditing = true;
        this.loadEmployeeData(this.employeeID);
      }
  }

  loadEmployeeData(id: any){
    this.webService.webServiceRetrieve(`${this.apiUrl}/employees/${id}`).subscribe((data: any) => {
      this.employeeAddForm.patchValue({
        name: data.name,
        department: data.department,
        title: data.title,
        DOB: data.DOB,
        dateOfEntry: data.dateOfEntry,
        email: data.email,
        phone: data.phone,
        salary: data.salary,
        workingHours: data.workingHours,
        about: data.about
      });
    });
  }
  goBack(){
    this.router.navigate(['employee']);
  }
  onSubmit(){
    const form = this.employeeAddForm.value;
    const newEmployee: any = {
       name: form.name,
       department: form.department,
       title: form.title,
       DOB: form.DOB,
       dateOfEntry: form.dateOfEntry,
       email: form.email,
       phone: form.phone,
       salary: form.salary,
       workingHours: form.workingHours,
       about: form.about
    };

    if(this.isEditing){
      this.webService.webServiceUpdate(`${this.apiUrl}/employees/${this.employeeID}`, newEmployee).subscribe({
        next: responseData => {
          console.log("updated");
          this.router.navigate(['employee']);
        }, error: error => { console.log(error); }
      });
    } else {
      this.webService.webServiceCreate(`${this.apiUrl}/employees`, newEmployee).subscribe({
        next: responseData =>{
          console.log("success");
          this.employeeAddForm.reset();
          this.router.navigate(['employee']);
        },
        error : err => { console.log("failed"); }
      });
    }

  }
}
