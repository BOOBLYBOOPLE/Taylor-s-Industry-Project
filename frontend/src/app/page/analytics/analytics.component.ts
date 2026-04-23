import { Component, OnInit } from '@angular/core';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
public savedGraphs: any[] = [];
  public apiUrl = globalEnv.apiUrl;

  constructor(private web: webService) {}

  ngOnInit(): void {
    this.loadGraphs();
  }

loadGraphs() {
  this.web.webServiceRetrieve<any[]>(`${this.apiUrl}/finance-analytics/graphs`).subscribe(res => {
    this.savedGraphs = res.map(g => {
      // Standardize date points as you were doing
      if (g.data) {
        g.data.forEach((series: any) => {
          series.dataPoints.forEach((dp: any) => {
            if (dp.x && typeof dp.x === 'string') {
              if (dp.x.includes('-') || !isNaN(Date.parse(dp.x))) {
                dp.x = new Date(dp.x);
              }
            }
          });
        });
      }

      return {
        id: g._id, // IMPORTANT: Save the ID so we know what to delete
        animationEnabled: g.animationEnabled,
        exportEnabled: g.exportEnabled,
        title: { text: g.titleText },
        axisY: { prefix: g.axisYPrefix },
        legend: { fontSize: g.fontSize },
        data: g.data
      };
    });
  });
}

  deleteGraph(id: string) {
    if (confirm('Are you sure you want to delete this graph?')) {
      this.web.webServiceDelete(`${this.apiUrl}/finance-analytics/graphs/${id}`, {}).subscribe(() => {
        this.savedGraphs = this.savedGraphs.filter(graph => graph.id !== id);
      });
    }
  }
}
