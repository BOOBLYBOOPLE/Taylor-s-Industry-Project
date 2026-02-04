import { Component, OnInit, ViewChild } from '@angular/core';
import { webService } from 'src/assets/services/webServices'; //
import { globalEnv } from 'src/assets/shared/global-env.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { recruitmentDataModel } from 'src/assets/shared/data.model';

export interface RecruitmentLog {
  _id: string;
  name: string;
  age: string;
  University_enrolled: string;
  date: string;
  status: string;
  resume: string;
}

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
})
export class RecruitmentComponent implements OnInit {
  private apiUrl = globalEnv.apiUrl + '/recruitment';

  displayedColumns: string[] = ['position', 'name', 'age', 'University_enrolled', 'date', 'status', 'resume', 'actions'];
  dataSource = new MatTableDataSource<recruitmentDataModel[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private web: webService) {}

  ngOnInit(): void {
    this.getAllRecruitments();
  }

  getAllRecruitments() {
    this.web.webServiceRetrieve<any[]>(this.apiUrl).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('Recruitment loaded:', data);
        },
        error: (err) => console.error('Error loading recruitment:', err)
    });
  }

   onDelete(element: any) {
    const id = element._id;
    if (confirm(`Are you sure you want to delete ${element.name}?`)) {
      this.web.webServiceDelete(`${this.apiUrl}/${id}`, {}).subscribe({
        next: () => {
          console.log("Data deleted");

          this.getAllRecruitments();
        },
        error: (error) => console.error(error)
      });
    }
  }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    updateStatus(element: any, newStatus: string) {
    const id = element._id;
    // Call the PUT route we just created
    this.web.webServiceUpdate(`${this.apiUrl}/${id}`, { status: newStatus }).subscribe({
      next: () => {
        element.status = newStatus;
      },
      error: (err) => console.error('Error updating status:', err)
    });
  }
}
