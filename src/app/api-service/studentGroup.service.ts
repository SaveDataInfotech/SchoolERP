import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class studentGroupService {
  readonly apiUrl = this.configService.gapiUrl;
  constructor(private http: HttpClient,
    private configService: ConfigService) {
  }

  getGroupList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentGroup/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentGroup/get_MaxId_student_group');
  }

  addNewGroup(Groupinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentGroup/insert_student_group', Groupinsert, httpOptions);
  }

  deleteGroup(groupid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'StudentGroup/delete_student_group?groupid=' + groupid, httpOptions);
  }

}