import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpecialBusFeesAssignService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getSpecialBusFeesList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'SpecialBusFee/Get');
    }

    addNewSpecialBusFees(data: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'SpecialBusFee/insert_specialbusfee', data, httpOptions);
    }

    deleteSpecialBusFees(assignid: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'BusFeesAssign/delete_buss_fees_assign?busfeeid=' + assignid, httpOptions);
    }
}