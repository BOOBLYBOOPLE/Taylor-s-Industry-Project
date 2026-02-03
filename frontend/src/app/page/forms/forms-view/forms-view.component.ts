import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-forms-view',
  templateUrl: './forms-view.component.html',
  styleUrls: ['./forms-view.component.css']
})

export class FormsViewComponent {

  data: any = null;
  // Note: We need a backend endpoint that gets a SINGLE document by ID
  // e.g., GET /api/documents/:id
  private apiUrl = globalEnv.apiUrl + '/forms';

  constructor(
    private route: ActivatedRoute,
    private web: webService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Fetch specific document details (Backend must support this GET route)
      this.web.webServiceRetrieve<any>(`${this.apiUrl}/${id}`).subscribe({
        next: (res) => {
          // If your API returns an array for single items, use res[0]
          // Otherwise, just use res
          this.data = Array.isArray(res) ? res[0] : res;
        },
        error: (err) => console.error(err)
      });
    }
  }

  getDownloadUrl(filename: string): string {
    const baseUrl = globalEnv.apiUrl.replace('/api', '');
    return `${baseUrl}/uploads/${filename}`;
  }

  goBack() {
    this.router.navigate(['/forms']);
  }
}
