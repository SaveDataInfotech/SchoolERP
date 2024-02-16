import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class staffLeavePermissionService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    getstaffLeaveList(year: any, no: string, Month: string): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffLeavePermission/get_staff_leaves?staff_no=' + no + '&year=' + year + '&month=' + Month);
    }

    getAllStaffLeavePermissionHistory(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffLeavePermission/get_all_staff_leave_permission_history');
    }

    addNewleaveType(leavetypeinsert: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffLeavePermission/insert_leave_assign_by_staff_permission', leavetypeinsert, httpOptions);
    }

    addNewPermission(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffLeavePermission/insert_staff_leave_permission_history', value, httpOptions);
    }

    addNewHalfDay(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffLeavePermission/insert_staff_leave_halfday_permission_history', value, httpOptions);
    }

    checkAttendanceStaff(staffNo, date): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffLeavePermission/checkattendancestaff?staff_no=' + staffNo + '&date=' + date);
    }


    takenNewPermission(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffLeavePermission/taken_staff_leave_permission_history', value, httpOptions);
    }

    takenNewHalfDay(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffLeavePermission/taken_staff_leave_halfday_permission_history', value, httpOptions);
    }
}