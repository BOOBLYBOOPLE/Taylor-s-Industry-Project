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

    scheduler.init(
      this.schedulerContainer.nativeElement,
      new Date(),
      "week"
    );

    scheduler.parse([
      {
        id: 1,
        text: "Fixing the Scheduler! 🚀",
        start_date: "2026-02-24 09:00",
        end_date: "2026-02-24 12:00"
      }
    ], "json");
  }

  ngOnDestroy() {
    if (scheduler.destructor) {
        scheduler.destructor();
    }
  }
}
