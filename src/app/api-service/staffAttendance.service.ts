import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class staffAttendanceService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    searchStudentByAttendance(staff_type, date): Observable<any[]> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get<any[]>(this.apiUrl + 'StaffAttendance/get_staff_attendance?staff_typeid=' + staff_type + '&date=' + date, httpOptions);
    }

    newAttendance(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffAttendance/insert_staff_attendance', value, httpOptions);
    }

}