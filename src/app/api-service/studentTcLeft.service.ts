import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class studentTcLeftService {
 readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  allStudents(classid,groupId,sectionId,Batch): Observable<any[]> {
      
    return this.http.get<any[]>(this.apiUrl + 'StudentTcLeft/get_student_generalfees_list?classid='+classid+'&sectionid='+sectionId+'&groupid='+groupId+'&batch_year='+Batch);    
  }

  TcApply(studentdetails: any): Observable<any> {    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentTcLeft/insert_student_tc_left', studentdetails, httpOptions);
  }

  TcApplyAll(studentdetails: any): Observable<any> {    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentTcLeft/insert_student_tc_leftbyall', studentdetails, httpOptions);
  }

}