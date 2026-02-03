import { Component, OnInit, ViewChild } from '@angular/core';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'type', 'summary', 'date', 'actions'];
  public apiUrl = globalEnv.apiUrl;

  constructor(private web: webService){}

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(){
      this.web.webServiceRetrieve(`${this.apiUrl}/complaints`).subscribe({
        next: (data: any) => {
          const formattedData = data.map((item: any, index: number) => ({
            ...item,
            position: index + 1
          }));
      this.dataSource = new MatTableDataSource(formattedData);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const searchString = filter.toLowerCase();
        const name = data.employeeId?.name?.toLowerCase() || '';
        return name.includes(searchString);
      };
    }
    });
  }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  markAsResolved(element: any) {
    const id = element._id;
    const updateData = { resolved: true };

    this.web.webServiceUpdate(`${this.apiUrl}/complaints/${id}`, updateData).subscribe({
      next: () => {
        this.loadComplaints();
        element.resolved = true;
      },
      error: (error: any) => console.error('Error resolving complaint:', error)
    });
  }

    onDelete(element: any) {
    const id = element._id;
    if (confirm(`Are you sure you want to delete ${element.name}?`)) {
      this.web.webServiceDelete(`${this.apiUrl}/complaints/${id}`, {}).subscribe({
        next: () => {
          console.log("Data deleted");
          this.loadComplaints();
        },
        error: (error) => console.error(error)
      });
    }
  }
}
