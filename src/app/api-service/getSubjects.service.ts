import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class getSubjects {
  readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  getsubjectList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'GetSubjects/Get');
  }

  newSubjectAssign(feesAssignInsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'GetSubjects/insert_subassign', feesAssignInsert, httpOptions);
  }

  getSubassign(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'GetSubjects/Get_subassign');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'GetSubjects/get_MaxId_subassign');
  }

  deleteAssign(typeid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'GetSubjects/delete_subassign?assignid=' + typeid, httpOptions);
  }
}