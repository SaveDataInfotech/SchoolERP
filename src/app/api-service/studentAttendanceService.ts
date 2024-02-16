import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class studentAttendanceService {
  readonly apiUrl = this.configService.gapiUrl;
  constructor(private http: HttpClient,
    private configService: ConfigService) {
  }

  newAttendance(stafftypeinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentAttendance/insert_student_attendance', stafftypeinsert, httpOptions);
  }

  searchStudentByAttendance(classid: number, groupid: number, sectionid: number, date: any, batch: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'StudentAttendance/get_student_attendance_byattendance?classid=' + classid + '&groupid=' + groupid + '&sectionid=' + sectionid + '&date=' + date + '&batch_year=' + batch, httpOptions);
  }
}