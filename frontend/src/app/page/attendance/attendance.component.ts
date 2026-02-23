import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CanvasJS, CanvasJSChart } from '@canvasjs/angular-charts';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { forkJoin } from 'rxjs';

CanvasJS.addColorSet("customColorSet",["#3a943c", "#ce1249", "#ffcb06", "#7f3e83"]);

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements AfterViewInit ,OnInit {

  constructor(private web: webService) {}

  displayedColumns: string[] = ['position', 'name', 'department', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  public apiUrl = globalEnv.apiUrl;

  public present: number = 0;
  public absent: number = 0;
  public ratePresent: any;
  public rateAbsent: any;
  public chartOptions: any;

  @ViewChild(CanvasJSChart) chartComponent!: CanvasJSChart;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    this.calculateTotals();
  }

  loadDashboardData() {
    forkJoin({
      employees: this.web.webServiceRetrieve<any[]>(`${this.apiUrl}/employees`),
      attendance: this.web.webServiceRetrieve<any>(`${this.apiUrl}/attendance`)
    }).subscribe({
      next: ({ employees, attendance }) => {
        const today = new Date().setHours(0,0,0,0);
        const todaysAttendance = attendance.attendanceList.filter((record: any) => {
          const recordDate = new Date(record.date).setHours(0,0,0,0);
          return recordDate === today;
        });

        const mergedData = employees.map(emp => {
          const record = todaysAttendance.find((att: any) =>
            (att.employeeId._id === emp._id) || (att.employeeId === emp._id)
          );

          return {
            ...emp,
            status: record ? record.status : 'Absent'
          };
        });

        this.dataSource.data = mergedData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.calculateTotals();
      },
      error: (err) => console.error('Error loading dashboard:', err)
    });
  }

  calculateTotals() {
    this.present = this.dataSource.data.filter((e: any) => e.status === 'Present').length;
    this.absent = this.dataSource.data.filter((e: any) => e.status === 'Absent').length;

    this.ratePresent = this.present / this.dataSource.data.length * 100;
    this.rateAbsent = this.absent / this.dataSource.data.length * 100;
    this.updateGraph();
  }

  updateStatus(element: any, newStatus: string) {
    const id = element._id;
    const updateData = { status: newStatus };

    const previousStatus = element.status;
    element.status = newStatus;
    this.calculateTotals();

    this.web.webServiceUpdate(`${this.apiUrl}/attendance/${id}`, updateData).subscribe({
      next: (res) => {
        this.calculateTotals();
        console.log('Status updated successfully');
      },
      error: (error) => {
        console.error('Error updating status:', error);
        element.status = previousStatus;
        this.calculateTotals();
      }
    });
  }

  public updateGraph(){
    this.chartOptions = {
      animationEnabled: true,
      theme: "dark2",
      title:{
        text: "Today's Attendance",
        fontSize: 20
      },
      subtitles: [{
        text: `${this.present + this.absent} Total`,
        verticalAlign: "center",
        dockInsidePlotArea: true,
        fontSize: 15
      }],
      data: [{
        type: "doughnut",
        indexLabel: "{name}: {y}",
        innerRadius: "80%",
        yValueFormatString: "#",
        dataPoints: [
          { y: this.ratePresent, name: "Present" },
          { y: this.rateAbsent, name: "Absent" },
        ]
      }]
    }

    if(this.chartComponent && this.chartComponent.chart){
      setTimeout(() => {
        this.chartComponent.chart.render();
      }, 100);
    }
  }
}
