import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { employeeDataModel } from 'src/assets/shared/data.model';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { webService } from 'src/assets/services/webServices';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/assets/services/auth.service';
import { ChatService } from '../chat/chatService.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {

  isAdmin = false;
  displayedColumns: string[] = [
    'position',
    'name',
    'department',
    'title',
    'workingHours',
    'salary',
    'actions'];

  dataSource = new MatTableDataSource<employeeDataModel>([]);

  private apiUrl = globalEnv.apiUrl;
  public userList: any = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  socket: any;

  constructor(
    private router: Router,
    private webService: webService,
    private auth: AuthService,
    private chatService: ChatService
  ) {
    this.isAdmin = this.auth.getRole() === 'admin';
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.socket = this.chatService.socket;
  }

  loadEmployees() {
    this.webService.webServiceRetrieve<employeeDataModel[]>(`${this.apiUrl}/employees`)
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('Employees loaded:', data);
        },
        error: (err) => console.error('Error loading employees:', err)
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(element: any) {
    const id = element._id;
    if (confirm(`Are you sure you want to delete ${element.name}? ` + '\r' + 'Doing so will remove all records related to this employee.')) {
      this.webService.webServiceRetrieve(`${this.apiUrl}/users/all`).subscribe({
        next: (responseData) => {
          this.userList = responseData;
          console.log(this.userList)
          this.userList.forEach((user: any) => {
            if(user.username === element.name){
              this.webService.webServiceDelete(`${this.apiUrl}/users/${user._id}`, {}).subscribe({
                next: () => {
                  console.log('user deleted');
                }, error: (error) => {
                  console.log(error);
                }
              });
            }
          });
        }
      });

      this.webService.webServiceDelete(`${this.apiUrl}/employees/${id}`, {}).subscribe({
        next: () => {
          console.log("Data deleted");
          this.socket.emit('refresh-user-list');
          this.loadEmployees();
        },
        error: (error) => console.error(error)
      });

    }
  }
}
