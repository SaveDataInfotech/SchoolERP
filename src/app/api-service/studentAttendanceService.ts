import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class studentAttendanceService {
 readonly apiUrl = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) {
  }

  newAttendance(stafftypeinsert:any): Observable<any> {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentAttendance/insert_student_attendance',stafftypeinsert,httpOptions);
  }

  searchStudentByAttendance(classid:number,groupid:number,sectionid:number,date:any,batch:any): Observable<any[]> {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'StudentAttendance/get_student_attendance_byattendance?classid='+classid+'&groupid='+groupid+'&sectionid='+sectionid+'&date='+date+'&batch_year='+batch,httpOptions);
  }

  // searchStudentByClass(classid:number,groupid:number,sectionid:number): Observable<any[]> {
  //   
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.get<any[]>(this.apiUrl + 'StudentAttendance/get_student_attendance_byclass?classid='+classid+'&groupid='+groupid+'&sectionid='+sectionid,httpOptions);
  // }
}