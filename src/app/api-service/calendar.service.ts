import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class calendarService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getcalendarEvents(date): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'Calendar/get_calendar_events?date=' + date)
    }
}