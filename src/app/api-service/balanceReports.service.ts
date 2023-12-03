import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FeesCollectionBalanceReportsService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    generalBalanceReport(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BalanceReports/GetGeneral');
    }

    busBalanceReport(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BalanceReports/GetBus');
    }

    arrearBalanceReport(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BalanceReports/GetArrear');
    }
}