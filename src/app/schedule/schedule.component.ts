import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { calendarService } from '../api-service/calendar.service';
import { calendarDialogService } from '../api-service/calendarDialog.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  eventList: any[] = [];
  constructor(private cSvc: calendarService,
    private calDialogSvc: calendarDialogService
  ) { }


  ngOnInit(): void {
    setInterval(() => {
      this.getCalendarEvents(new Date().toISOString().slice(0, 10));
    }, 8000);

  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    height: '625px',
    weekends: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    datesSet: (info) => {
      const endDate = info.end;
      this.getCalendarEvents(new Date(endDate).toISOString().split('T')[0]);
    },
    events: [],
    dayCellContent: (arg) => {
      const today = new Date().toISOString().split('T')[0];
      const originalDate = new Date(arg.date);
      const nextDate = new Date(originalDate);
      nextDate.setDate(originalDate.getDate() + 1);
      const aDate = nextDate.toISOString().split('T')[0];
      if (aDate == today) {
        return { html: `<span style="color:white;background-color: #120f52; padding: 0px;border-radius: 3px;font-size: 20px;">${arg.dayNumberText}</span>` };
      }
      else {
        return { html: `<span>${arg.dayNumberText}</span>` };
      }
    }
  };

  async getCalendarEvents(value) {
    const data = await this.cSvc.getcalendarEvents(value).toPromise();
    this.eventList = await data;
    this.eventList.forEach((e) => {
      e['extendedProps'] = {
        description: e.description
      };
    });
    this.calendarOptions.events = this.eventList;
  }


  openDialog(data) {
    debugger;
    this.calDialogSvc.openConfirmDialog(data)
      .afterClosed().subscribe(res => {
        if (res == true) {
        }
      });
  }

  argc() {
    alert()
  }
}