import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class staffProfileService {
    readonly apiUrl = 'http://localhost:3399/api/';
    constructor(private http: HttpClient) {
    }

    getstaffProfileList(): Observable<any[]> {
        // alert('Not Work total staff get')
        return this.http.get<any[]>(this.apiUrl + 'StaffProfile/GET');
    }

    getStaffByStaffID(value): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffProfile/get_staff_pro_by_stafftypeid?staff_typeid=' + value)
    }

    addNewstaff(staffProfileinsert: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffProfile/insert_staff_profile', staffProfileinsert, httpOptions);
    }

    getMaxId(staffType): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffProfile/get_MaxId_staff_profile?staff_typeid=' + staffType);
    }

    searchStaffByStaffNo(staffNo): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffProfile/get_staff_byno?staff_no=' + staffNo);
    }
}