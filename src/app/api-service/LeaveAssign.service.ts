import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveAssignService {
 readonly apiUrl = 'http://localhost:3399/api/';
  constructor(private http: HttpClient) {
  }

  getLeaveAssignList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'LeaveAssign/Get');
  }

  getLeaveAssignByIDList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'LeaveAssign/get_leave_assign_by_assignid');
  }

  getAssignMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'LeaveAssign/get_MaxId_staff_type');
  }


  addNewleaveAssign(leaveAssigninsert: any): Observable<any> {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'LeaveAssign/insert_leave_assign', leaveAssigninsert, httpOptions);
  }


  deleteLeaveAssign(assignid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'LeaveAssign/delete_leave_assign?assignid=' + assignid, httpOptions);
  }
}