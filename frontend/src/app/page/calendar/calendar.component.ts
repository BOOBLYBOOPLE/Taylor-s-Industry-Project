import { Component, ElementRef, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
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

  ngOnInit() {
    scheduler.config.xml_date = "%Y-%m-%d %H:%i";

    scheduler.init(
      this.schedulerContainer.nativeElement,
      new Date(2026, 1, 24), // Feb 24, 2026
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
    // Clean up to prevent memory leaks
    if (scheduler.destructor) {
        scheduler.destructor();
    }
  }
}
