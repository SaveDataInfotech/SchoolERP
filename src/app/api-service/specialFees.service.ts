import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpecialFeesService {
   readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getSpecialFeesList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'SpecialFees/Get');
    }

    addNewSpecialFees(data: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'SpecialFees/insert_special_fees', data, httpOptions);
    }

    deleteSpecialFees(id: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'SpecialFees/delete_special_fees?s_assignid=' + id, httpOptions);
    }
}