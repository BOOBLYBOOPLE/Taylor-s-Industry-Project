import { Component, OnInit, ViewChild } from '@angular/core';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'department', 'leaveType', 'dateStart', 'dateEnd', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;

  public apiUrl = globalEnv.apiUrl;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private web: webService) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves() {
    this.web.webServiceRetrieve(`${this.apiUrl}/leaves`).subscribe({
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
          const dept = data.employeeId?.department?.toLowerCase() || '';
          const type = data.type?.toLowerCase() || '';
          const status = data.status?.toLowerCase() || '';

          return name.includes(searchString) ||
                 dept.includes(searchString) ||
                 type.includes(searchString) ||
                 status.includes(searchString);
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

  updateStatus(element: any, newStatus: string) {
    const id = element._id;
    const updateData = { status: newStatus };

    this.web.webServiceUpdate(`${this.apiUrl}/leaves/${id}`, updateData).subscribe({
      next: () => {
        element.status = newStatus;
      },
      error: (error) => console.error('Error updating status:', error)
    });
  }

  onDelete(element: any) {
    const id = element._id;
      this.web.webServiceDelete(`${this.apiUrl}/leaves/${id}`, {}).subscribe({
        next: () => {
          this.loadLeaves();
        },
        error: (error) => console.error(error)
      });
    }
}
