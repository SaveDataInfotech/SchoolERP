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

    getSpecialGroupBusFeesList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'SpecialBusFee/get_group_by_specialbusfee');
    }

    addNewSpecialBusFees(data: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'SpecialBusFee/insert_specialbusfee', data, httpOptions);
    }

    deleteSpecialBusFees(type, km, year, less_type): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'SpecialBusFee/delete_specialbusfee?typeid=' + type + '&kmrange=' + km + '&batch_year=' + year + '&fees_lessid=' + less_type, httpOptions);
    }
}