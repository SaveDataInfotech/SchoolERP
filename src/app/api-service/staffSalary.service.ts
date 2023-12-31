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

    getstaffProfileListBySalary(sal_month: string, typeid: Number): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffSalary/GET?sal_month=' + sal_month + '&staff_typeid=' + typeid);
    }
}