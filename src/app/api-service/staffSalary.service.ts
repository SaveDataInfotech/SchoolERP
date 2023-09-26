import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class staffSalaryService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getstaffProfileListBySalary(sal_month:string): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffSalary/GET?sal_month='+sal_month);
    }

    // addNewstaff(staffProfileinsert: any): Observable<any> {
    //     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    //     return this.http.post<any>(this.apiUrl + 'StaffProfile/insert_staff_profile', staffProfileinsert, httpOptions);
    // }

    // getMaxId(): Observable<any[]> {
    //     return this.http.get<any[]>(this.apiUrl + 'StaffProfile/get_MaxId_staff_profile');
    // }

}