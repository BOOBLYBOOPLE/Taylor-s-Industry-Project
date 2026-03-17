import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/assets/services/data.service';

@Component({
  selector: 'app-email-layout',
  templateUrl: './email-layout.component.html',
  styleUrls: ['./email-layout.component.css']
})
export class EmailLayoutComponent{

  constructor(
    private data: DataService,
  ){}

  sendFilter(filter: string){
    this.data.sendData(filter);
    this.data.triggerFunction();
  }

}
