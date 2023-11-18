import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class staffSalaryService {
   readonly apiUrl = 'http://localhost:8081/api/';
    constructor(private http: HttpClient) {
    }

    getstaffProfileListBySalary(sal_month:string): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffSalary/GET?sal_month='+sal_month);
    }
}