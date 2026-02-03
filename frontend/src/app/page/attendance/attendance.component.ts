import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasJS, CanvasJSChart } from '@canvasjs/angular-charts';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { Router } from '@angular/router';

CanvasJS.addColorSet("customColorSet",["#ffcb06", "#ce1249", "#3a943c", "#7f3e83", "#812900", "#2078b6", "#df7f2e", "#e3e3e3"]);

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent implements AfterViewInit, OnInit {
  constructor(
    private web: webService,
    private router: Router
  ){}
  displayedColumns: string[] = ['position', 'name', 'department', 'leaveType', 'dateStart', 'dateEnd', 'status'];
  dataSource: any;
  public apiUrl = globalEnv.apiUrl;
  public present: any;
  public absent: any;
  @ViewChild(CanvasJSChart) chartComponent!: CanvasJSChart;

  chartOptions = {
    animationEnabled: true,
    theme: "dark2",
    colorSet: "customColorSet",
    title:{
      text: "Attendance Rate"
    },
    data: [{
      type: "doughnut",
      indexLabel: "{name}: {y}",
      innerRadius: "90%",
      yValueFormatString: "#,##0.00'%'",
      dataPoints: [
      { y: 90, name: "Present" },
      { y: 10, name: "Absent" },
      ]
    }]
  }

  ngAfterViewInit(): void {
      if(this.chartComponent && this.chartComponent.chart){
        setTimeout(() => {
          this.chartComponent.chart.render();
        }, 100);
      }
  }

  ngOnInit(): void {
    this.web.webServiceRetrieve(`${this.apiUrl}/leaves`).subscribe({
      next: (data: any) => {
        this.dataSource = data.map((item: any, index: number) => ({
          ...item,
          position: index + 1
        }));
      }
    });
  }
}
