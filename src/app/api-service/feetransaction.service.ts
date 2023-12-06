import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FeesTransactionService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }
    feeTransactionList(fromdate, todate): Observable<any[]> {
        debugger;
        return this.http.get<any[]>(this.apiUrl + 'FeesTransaction/feetransactionList?fromdate=' + fromdate + '&todate=' + todate);
    }
}