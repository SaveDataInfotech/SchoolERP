import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class dashBoardService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
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