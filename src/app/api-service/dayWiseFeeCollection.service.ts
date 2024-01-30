import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class dayWiseFeeCollectionService {
    readonly apiUrl = 'http://localhost:3399/api/';
    constructor(private http: HttpClient) {
    }

    getgeneralfees(fromdate, todate): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'DayWiseFeeCollection/get_date_wise_general_amount?fromdate=' + fromdate + '&todate=' + todate);
    }
    getbusfees(fromdate, todate): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'DayWiseFeeCollection/get_date_wise_bus_amount?fromdate=' + fromdate + '&todate=' + todate);
    }

    getArrearfees(fromdate, todate): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'DayWiseFeeCollection/get_date_wise_arrear_amount?fromdate=' + fromdate + '&todate=' + todate);
    }

    getTotalCollectionfees(fromdate, todate): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'DayWiseFeeCollection/get_datewise_total_of_collection?fromdate=' + fromdate + '&todate=' + todate);
    }
}