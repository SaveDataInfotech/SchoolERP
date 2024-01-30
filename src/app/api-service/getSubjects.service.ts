import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class getSubjects {
 readonly apiUrl = 'http://localhost:3399/api/';
  constructor(private http: HttpClient) {
  }

  getsubjectList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'GetSubjects/Get');
  }

  newSubjectAssign(value: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'GetSubjects/insert_subassign', value, httpOptions);
  }

  getSubassign(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'GetSubjects/Get_subassign');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'GetSubjects/get_MaxId_subassign');
  }

  deleteAssign(id: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'GetSubjects/delete_subassign?assignid=' + id, httpOptions);
  }
}