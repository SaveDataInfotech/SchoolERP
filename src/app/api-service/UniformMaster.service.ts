import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniformMasterService {
  readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  getuniformList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'UniformMaster/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'UniformMaster/get_MaxId_uniform_master');
  }

  addNewuniform(uniforminsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'UniformMaster/insert_uniform_master', uniforminsert, httpOptions);
  }

  deleteuniform(uniformid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'UniformMaster/delete_uniform_master?uniformid=' + uniformid, httpOptions);
  }

}