import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class studentGroupService {
 readonly apiUrl = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) {
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