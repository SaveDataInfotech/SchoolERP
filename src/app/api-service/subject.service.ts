import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class subjectService {
 readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  getsubjectList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Subject/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Subject/get_MaxId_subject');
  }

  addNewsubject(subjectinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'Subject/insert_subject', subjectinsert, httpOptions);
  }

  deletesubject(subjectid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'Subject/delete_subject?subjectid=' + subjectid, httpOptions);
  }
}