import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class subjectAssignService{
    readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  addNewsubjectAssign(subjectinsert: any): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'SubjectAssign/insert_subject_assign', subjectinsert, httpOptions);
  }

}