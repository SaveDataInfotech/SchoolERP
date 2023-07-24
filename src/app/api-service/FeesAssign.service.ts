import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeesAssignService {
  readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  getFeesAssignList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesAssign/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesAssign/get_MaxId_FeesAssign');
  }


  addNewFeesAssign(feesAssignInsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'FeesAssign/insert_FeesAssign', feesAssignInsert, httpOptions);
  }


  deleteFeesAssign(assignid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'FeesAssign/delete_FeesAssign?assignid=' + assignid, httpOptions);
  }

}