import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class hostelMasterService {
 readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  getHostelList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'HostelMaster/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'HostelMaster/get_MaxId_hostel_master');
  }

  addNewHostel(hostelinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'HostelMaster/insert_hostel_master', hostelinsert, httpOptions);
  }

  deleteHostel(hostelid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'HostelMaster/delete_hostel_master?hostelid=' + hostelid, httpOptions);
  }
}