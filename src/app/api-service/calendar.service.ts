import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class calendarService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    getcalendarEvents(date): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'Calendar/get_calendar_events?date=' + date)
    }

    newEvent(value): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'Calendar/insert_calendar', value, httpOptions)
    }

    getEventsbyMaster(date, userID): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'Calendar/get_calendar_bymaster?date=' + date + '&userid=' + userID)
    }

    getNestedCalendarHomeWork(id): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'Calendar/get_nestedcalendarhomework_byeventid?eventid=' + id)
    }

    getNestedCalendarTimeTable(id): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'Calendar/get_nestedcalendartimetable_byeventid?eventid=' + id)
    }

    deleteEvent(id: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'Calendar/delete_calendar?eventid=' + id, httpOptions);
    }
}