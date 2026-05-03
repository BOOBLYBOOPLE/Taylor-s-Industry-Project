import { Component, ElementRef, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { webService } from 'src/assets/services/webServices';
import 'dhtmlx-scheduler';

declare let scheduler: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild("scheduler_here", { static: true }) schedulerContainer!: ElementRef;

  public apiUrl = globalEnv.apiUrl;

  constructor(
    private web: webService
  ){}

  ngOnInit() {
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init(this.schedulerContainer.nativeElement, new Date(), "week");

    this.web.webServiceRetrieve(`${this.apiUrl}/calendar`).subscribe((data: any) => {
      const events = data.map((e: any) => ({
        ...e,
        id: e._id
      }));
      scheduler.parse(events, "json");
    });

    this.setupDataProcessor();
  }

  setupDataProcessor(){
    scheduler.attachEvent("onEventAdded", (id: any, ev: any) => {
      this.web.webServiceCreate(`${this.apiUrl}/calendar`, {
        text: ev.text,
        start_date: ev.start_date,
        end_date: ev.end_date
      }).subscribe(res => {
        // Update the local scheduler ID with the real MongoDB _id
        scheduler.changeEventId(id, res._id);
      });
      return true;
    });

    scheduler.attachEvent("onBeforeEventDelete", (id: any) => {
    if (id.toString().length > 5) {
      this.web.webServiceDelete(`${this.apiUrl}/calendar/${id}`, {}).subscribe();
    }
      return true;
    });

    scheduler.attachEvent("onEventChanged", (id: any, ev: any) => {
    this.web.webServiceUpdate(`${this.apiUrl}/calendar/${id}`, {
      text: ev.text,
      start_date: ev.start_date,
      end_date: ev.end_date
    }).subscribe();
      return true;
    });
  }

  ngOnDestroy() {
    if (scheduler.destructor) {
        scheduler.destructor();
    }
  }
}
