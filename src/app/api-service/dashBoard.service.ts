import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class dashBoardService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    totalStudents(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'DashBoard/Get');
    }

    todayDeductionAmount(date): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'DashBoard/get_dashboard_collected_amount?date=' + date);
    }

    todayBalanceAmount(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'DashBoard/get_dashboard_balance_amount');
    }
}