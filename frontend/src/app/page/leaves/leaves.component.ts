import { Component, OnInit, ViewChild } from '@angular/core';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { leavesDataModel } from 'src/assets/shared/data.model';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'department', 'leaveType', 'dateStart', 'dateEnd', 'status', 'actions'];
  dataSource = new MatTableDataSource<leavesDataModel>([]);

  public apiUrl = globalEnv.apiUrl;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private web: webService) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves() {
    this.web.webServiceRetrieve<leavesDataModel[]>(`${this.apiUrl}/leaves`).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('Leaves loaded:', data);
        },
        error: (err) => console.error('Error loading leaves:', err)
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
