import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DialogBoxComponent }from '../../components/popup-window/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement{
  name: string;
  position: number;
  department: string;
  title: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', department: 'Department of Miscellaneous Stuff', title: 'COO'},
  {position: 2, name: 'Helium', department: 'Email Forwarding Division', title: 'CEO'},
  {position: 3, name: 'Lithium', department: 'Strategic Coffee Operations', title: 'CFO'},
  {position: 4, name: 'Beryllium', department: 'Innovation & Buzzword Management', title: 'SENIOR'},
  {position: 5, name: 'Boron', department: 'Temporary Solutions Department', title: 'JUNIOR'},
  {position: 6, name: 'Carbon', department: 'Spreadsheet Optimization Unit', title: 'INTERN'},
  {position: 7, name: 'Nitrogen', department: 'Meeting Scheduling Office', title: 'STAFF'},
  {position: 8, name: 'Oxygen', department: 'Department of Red Tape', title: 'SOMETHING'},
  {position: 9, name: 'Fluorine', department: 'Moral Support Team', title: 'BLUBLBUBLU'},
  {position: 10, name: 'Neon', department: 'IT (Ignore Tickets) Support', title: 'SHOUTOUTTOMARTINLUTHERKINGYO'}
];

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TestPageComponent {
  panelOpenState = false;
  displayedColumns: string[] = ['position', 'name', 'department', 'title', 'actions'];
  dataSource = ELEMENT_DATA;

  items = Array.from({length: 30}).map((_, i) => `Item#${i}`)

	chartOptions = {
	  animationEnabled: true,
	  theme: "dark2",
	  exportEnabled: true,
	  title: {
		  text: "Developer Work Week"
	  },
	  subtitles: [{
		  text: "Median hours/week"
	  }],
	  data: [{
		  type: "pie", //change type to column, line, area, doughnut, etc
		  indexLabel: "{name}: {y}%",
		  dataPoints: [
		  	{ name: "Overhead", y: 9.1 },
		  	{ name: "Problem Solving", y: 3.7 },
		  	{ name: "Debugging", y: 36.4 },
		  	{ name: "Writing Code", y: 30.7 },
		  	{ name: "Firefighting", y: 20.1 }
		  ]
	  }]
	}
  public quillConfig = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // basic formatting
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // header dropdown
    [{ 'color': [] }, { 'background': [] }], // color options
    ['link', 'image', 'video'], // embeds
    ['clean'] // remove formatting button
  ]
};

  constructor(public dialog: MatDialog){}

  openDialog(): void{
    const dialogRef = this.dialog.open(DialogBoxComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('lol', result);
    })
  }
}
