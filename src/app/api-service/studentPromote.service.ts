import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class studentPromoteService {
 readonly apiUrl = 'http://localhost:3399/api/';
  constructor(private http: HttpClient) {
  }

  newStudent(studentinsert:any,batch_year,classid,groupid,setionid,cuid,date:string): Observable<any> {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentPromote/student_promote?batch_year='+batch_year+'&classid='+classid+'&groupid='+groupid+'&sectionid='+setionid+'&cuid='+cuid+'&date='+date,studentinsert,httpOptions);
    
  }

  searchStudentbypromote(classid:number,groupid:number,sectionid:number,Batch): Observable<any[]> {  
      
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'StudentPromote/get_student_attendance_bypromote?classid='+classid+'&groupid='+groupid+'&sectionid='+sectionid+'&batch_year='+Batch,httpOptions);    
  }

}