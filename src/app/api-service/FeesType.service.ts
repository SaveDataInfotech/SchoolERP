import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeesTypeService {
 readonly apiUrl = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) {
  }

  getfeesTypeList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesType/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesType/get_MaxId_fees_type');
  }

  addNewFeesType(feestypeinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'FeesType/insert_fees_type', feestypeinsert, httpOptions);
  }

  deletefeesType(typeid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'FeesType/Delete_fees_type?typeid=' + typeid, httpOptions);
  }
}