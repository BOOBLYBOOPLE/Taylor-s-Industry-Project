import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-leaves-create',
  templateUrl: './leaves-create.component.html',
  styleUrls: ['./leaves-create.component.css']
})
export class LeavesCreateComponent implements OnInit{
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private web: webService,
      private fb: FormBuilder){}

    selectedEmployee: any = null;
    public content: any;
    public apiUrl = globalEnv.apiUrl;
    public leavesForm!: FormGroup;
    public leaveId: any;
    public isEditMode: any;
    public employees: any[] = [];
    public leavesTypes: any[] = [
      'MC',
      'Emergency',
      'Other'
    ];
    public status: any[] = [
      'Unapproved',
      'Approved',
      'Reject'
    ];

  goBack(){
    this.router.navigate(['leaves'])
  }

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
    this.leavesForm = this.fb.group({
      employeeId: [null, Validators.required],
      type: [null],
      dateStart: [],
      dateEnd: [],
      status: [],
      content: [],
      paid: [false]
    });
    this.web.webServiceRetrieve(`${this.apiUrl}/employees`).subscribe((data: any) => {
      this.employees = data;
    });

    this.leaveId = this.route.snapshot.paramMap.get('id');

    if (this.leaveId) {
      this.isEditMode = true;
      this.loadLeaveData(this.leaveId);
    }
  }

  loadLeaveData(id: string) {
    this.web.webServiceRetrieve(`${this.apiUrl}/leaves/${id}`).subscribe((data: any) => {
      // PatchValue automatically fills the form fields that match the data keys
      this.leavesForm.patchValue({
        employeeId: data.employeeId._id || data.employeeId, // Handle populated object or raw ID
        type: data.type,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        status: data.status,
        content: data.content,
        paid: data.paid
      });
    });
  }

  onEmployeeSelect(event: any) {
    const empId = event.value;
    this.selectedEmployee = this.employees.find(e => e._id === empId || e.id === empId);
  }

    onSubmit() {
    if (this.leavesForm.valid) {
      const leavesData = this.leavesForm.value;

      if (this.isEditMode && this.leaveId) {
        this.web.webServiceUpdate(`${this.apiUrl}/leaves/${this.leaveId}`, leavesData).subscribe({
          next: () => this.router.navigate(['leaves']),
          error: (err) => console.log(err)
        });
      } else {
        this.web.webServiceCreate(`${this.apiUrl}/leaves`, leavesData).subscribe({
          next: () => this.router.navigate(['leaves']),
          error: (err) => console.log(err)
        });
      }
    }
  }
}
