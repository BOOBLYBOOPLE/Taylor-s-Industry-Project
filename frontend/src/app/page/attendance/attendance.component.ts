import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasJS, CanvasJSChart } from '@canvasjs/angular-charts';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { employeeDataModel } from 'src/assets/shared/data.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  displayedColumns: string[] = ['position', 'name', 'department', 'status', 'actions'];
  dataSource = new MatTableDataSource<employeeDataModel>([]);
  public apiUrl = globalEnv.apiUrl;

  public present: any;
  public absent: any;
  public presentPercent: any;
  public absentPercent: any;

  @ViewChild(CanvasJSChart) chartComponent!: CanvasJSChart;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public chartOptions: any;

  ngOnInit(): void {
    this.web.webServiceRetrieve<employeeDataModel[]>(`${this.apiUrl}/employees`).subscribe({
     next: (data: any) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('Employees loaded:', data);
        },
        error: (err) => console.error('Error loading employees:', err)
    });
    this.updateGraph();
  }

  ngAfterViewInit(): void {
      if(this.chartComponent && this.chartComponent.chart){
        setTimeout(() => {
          this.chartComponent.chart.render();
        }, 100);
      }
  }

  updateStatus(element: any, newStatus: string) {
    const id = element._id;
    const updateData = { status: newStatus };

    this.web.webServiceUpdate(`${this.apiUrl}/attendance/${id}`, updateData).subscribe({
      next: () => {
        element.status = newStatus;
      },
      error: (error) => console.error('Error updating status:', error)
    });
  }

  public updateGraph(){
    this.chartOptions = {
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
        { y: this.present, name: "Present" },
        { y: this.absent, name: "Absent" },
        ]
      }]
    }
  }
}
