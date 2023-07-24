import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class BatechYearService {
  constructor(private http: HttpClient) {
  }

  readonly apiUrl = 'https://localhost:44314/api/';

  getBatchYearList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'BatchYear/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'BatchYear/get_MaxId_batch_year');
  }

  GetActiveBatchYear(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'BatchYear/ActiveBatchGet');
  }

  addNewBatch(Batchinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.apiUrl + 'BatchYear/Insert_Batch_year', Batchinsert, httpOptions);
  }

  ActiveStatusBatch(batchid: any): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl + 'BatchYear/Update_batch_year_activeStataus?batchid=' + batchid, httpOptions);
  }

  deleteBatch(batchid: any): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'BatchYear/delete_batch_year?batchid=' + batchid, httpOptions);
  }
}