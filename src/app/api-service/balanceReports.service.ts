import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class FeesCollectionBalanceReportsService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
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