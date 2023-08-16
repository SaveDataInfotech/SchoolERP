import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeesTypeAssignService {
  readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  getfeesTypeAssignList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesTypeAssign/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesTypeAssign/get_MaxId_fees_type_assign');
  }

addNewFeesTypeAssign(feesAssignInsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'FeesTypeAssign/insert_fees_type_assign', feesAssignInsert, httpOptions);
  }

  deletefeesAssignType(typeid: any): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'FeesTypeAssign/delete_fees_type_assign?type_assignid=' + typeid, httpOptions);
  }
 }