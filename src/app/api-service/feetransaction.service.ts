import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class FeesTransactionService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    feeTransactionList(fromdate, todate): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'FeesTransaction/feetransactionList?fromdate=' + fromdate + '&todate=' + todate);
    }
}