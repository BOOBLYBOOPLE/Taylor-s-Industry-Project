import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytics-graph',
  templateUrl: './analytics-graph.component.html',
  styleUrls: ['./analytics-graph.component.css']
})
export class AnalyticsGraphComponent implements OnInit {

  public graphForm!: FormGroup;
  public graphTitle: any;
  public varName: any;
  public xAxisTypeValues: any = ['date', 'text', 'number'];
  public xAxisType: any;
  public graphTypes: any = ['splineArea', 'column', 'bar',
        'area', 'line', 'pie', 'doughnut', 'scatter'];
  public prefixTypes: any = ['$', '%'];
  public graphDataPoints: any[] = [];
  public apiUrl = globalEnv.apiUrl;
  public fieldName: any;

  public currentX: string = '';
  public currentY: number | null =null;

  constructor(private web: webService, private router: Router){}

  public chartOptions: any;

  ngOnInit(): void {
    this.graphForm = new FormGroup({
      title: new FormControl('', Validators.required),
      graphType: new FormControl('splineArea'),
      axisYPrefix: new FormControl('$'),
      fontSize: new FormControl(13),
      name: new FormControl('')
    });
    this.xAxisType = 'text';

    this.chartOptions = {
        animationEnabled: true,
        title: this.graphTitle,
        axisY: {prefix: "$"},
        data: [{ name: '', type: "splineArea", dataPoints: []}]
    };

    this.graphForm.valueChanges.subscribe(val => {
      this.updatePreview();
    });
  }

  addDataPoint() {
    if (this.currentX && this.currentY !== null) {
      const yValue = Number(this.currentY);

      if (isNaN(yValue)) {
        alert("Please enter a valid number for the Y-axis");
        return;
      }

      let xValue: any;
      let labelValue: string | null = null;

      if (this.xAxisType === 'date') {
        xValue = new Date(this.currentX).toISOString;
      } else if (this.xAxisType === 'number') {
        xValue = Number(this.currentX);
      } else {
        labelValue = this.currentX;
      }

      const newDataPoint = labelValue
        ? { label: labelValue, y: yValue }
        : { x: xValue, y: yValue };

      this.graphDataPoints.push(newDataPoint);

      this.updatePreview();

      this.currentX = '';
      this.currentY = null;
    }
  }

  goBack(){
    this.router.navigate(['finance']);
  }

  updatePreview() {
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: this.graphForm.value.title || "Graph Preview"
      },
      axisY: {
        prefix: this.graphForm.value.axisYPrefix
      },
      data: [{
        name: this.graphForm.value.name || 'Data Series',
        type: this.graphForm.value.graphType,
        dataPoints: [...this.graphDataPoints]
      }]
    };
  }

  removeDataPoint(index: number) {
    this.graphDataPoints.splice(index, 1);
    this.updatePreview();
  }

  submitGraph(){
    const formValues = this.graphForm.value;

    const graphConfig = {
      animationEnabled: true,
      exportEnabled: true,
      titleText: formValues.title,
      axisYPrefix: formValues.axisYPrefix,
      fontSize: formValues.fontSize,
      data: [{
        type: formValues.graphType,
        name: formValues.name,
        showInLegend: true,
        dataPoints: this.graphDataPoints
      }]
    };

    this.web.webServiceCreate(`${this.apiUrl}/finance-analytics/graphs`, graphConfig).subscribe(() => alert('Graph Saved'));
    this.goBack();
  }

}
