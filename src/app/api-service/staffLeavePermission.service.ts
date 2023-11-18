import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class staffLeavePermissionService {
   readonly apiUrl = 'http://localhost:8081/api/';
    constructor(private http: HttpClient) {
    }

    getstaffLeaveList(year: any, no: string): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffLeavePermission/get_staff_leaves?staff_no=' + no + '&year=' + year);
    }

    getAllStaffLeavePermissionHistory(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffLeavePermission/get_all_staff_leave_permission_history');
    }

    addNewleaveType(leavetypeinsert: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffLeavePermission/insert_leave_assign_by_staff_permission', leavetypeinsert, httpOptions);
    }

    addNewPermission(value: any): Observable<any> {

        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffLeavePermission/insert_staff_leave_permission_history', value, httpOptions);
    }

    addNewHalfDay(value: any): Observable<any> {
debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffLeavePermission/insert_staff_leave_halfday_permission_history', value, httpOptions);
    }

}