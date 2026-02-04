import { Component, OnInit, ViewChild } from '@angular/core';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { payrollDataModel } from 'src/assets/shared/data.model';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
})
export class PayrollComponent implements OnInit {

  constructor(private web: webService) {}
  public apiUrl = globalEnv.apiUrl;
  panelOpenState = false;

  displayedColumns: string[] = ['position', 'name', 'department', 'title', 'date', 'amount', 'hours', 'actions'];
  dataSource = new MatTableDataSource<payrollDataModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadPayload();
  }

  loadPayload() {
    this.web.webServiceRetrieve<payrollDataModel[]>(`${this.apiUrl}/finance`).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('Payroll loaded:', data);
        },
        error: (err) => console.error('Error loading payroll:', err)
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
    if (confirm(`Are you sure you want to delete ${element.employeeId?.name || 'this record'}?`)) {
      this.web.webServiceDelete(`${this.apiUrl}/finance/${id}`, {}).subscribe({
        next: () => {
          console.log("Data deleted");
          this.loadPayload();
        },
        error: (error) => console.error(error)
      });
    }
  }
}
