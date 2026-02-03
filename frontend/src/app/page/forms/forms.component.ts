import { Component, OnInit, ViewChild } from '@angular/core';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface StoredDocument {
  _id: string;
  name: string;
  size: string;
  submit: string;
  uploadDate: string;
  path: string;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
})
export class FormsComponent implements OnInit {
  private apiUrl = globalEnv.apiUrl + '/forms';

  displayedColumns: string[] = ['position', 'name', 'submit', 'size', 'date', 'description',  'actions'];
  dataSource!: MatTableDataSource<StoredDocument>;

  constructor(private web: webService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllDocuments();
  }

  getAllDocuments() {
    this.web.webServiceRetrieve<StoredDocument[]>(this.apiUrl).subscribe({
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
        const name = data.name?.toLowerCase() || '';
        return name.includes(searchString);
      };
      },
      error: (err) => console.error('Error fetching documents:', err)
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
    if (confirm(`Are you sure you want to delete ${element.originalName}?`)) {
      this.web.webServiceDelete(`${this.apiUrl}/${element._id}`, {}).subscribe({
        next: () => {
          this.getAllDocuments();
        },
        error: (error) => console.error(error)
      });
    }
  }

  // Helper to get download URL
  getDownloadUrl(filename: string): string {
    const baseUrl = globalEnv.apiUrl.replace('/api', '');
    return `${baseUrl}/uploads/${filename}`;
  }
}
