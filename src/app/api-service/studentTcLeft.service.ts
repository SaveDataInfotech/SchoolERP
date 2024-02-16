import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class studentTcLeftService {
  readonly apiUrl = this.configService.gapiUrl;
  constructor(private http: HttpClient,
    private configService: ConfigService) {
  }

  allStudents(classid, groupId, sectionId, Batch): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentTcLeft/get_student_generalfees_list?classid=' + classid + '&sectionid=' + sectionId + '&groupid=' + groupId + '&batch_year=' + Batch);
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