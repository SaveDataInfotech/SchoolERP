import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class staffAttendanceService {
   readonly apiUrl = 'http://localhost:8081/api/';
    constructor(private http: HttpClient) {
    }

    searchStudentByAttendance(staff_type, date): Observable<any[]> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get<any[]>(this.apiUrl + 'StaffAttendance/get_staff_attendance?staff_typeid=' + staff_type + '&date=' + date, httpOptions);
    }

    newAttendance(value: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffAttendance/insert_staff_attendance', value, httpOptions);
    }

}