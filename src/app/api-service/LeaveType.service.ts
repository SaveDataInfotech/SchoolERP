import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
 readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  getLeaveTypeList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'LeaveType/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'LeaveType/get_MaxId_leave_type');
  }

  addNewleaveType(leavetypeinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'LeaveType/insert_leave_type', leavetypeinsert, httpOptions);
  }

  deleteLeaveType(typeid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'LeaveType/delete_leave_type?typeid=' + typeid, httpOptions);
  }

}