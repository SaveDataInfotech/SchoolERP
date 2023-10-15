import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BusFeesAssignService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getBusFeesList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BusFeesAssign/get_buss_fees_assign');
    }

    getGroupBusFeesList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BusFeesAssign/get_group_by_buss_fees_assign');
    }

    addNewBusFees(data: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'BusFeesAssign/insert_buss_fees_assign', data, httpOptions);
    }

    deleteBusFees(type, km, year): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'BusFeesAssign/delete_buss_fees_assign?typeid=' + type + '&kmrange=' + km + '&batch_year=' + year, httpOptions);
    }
}