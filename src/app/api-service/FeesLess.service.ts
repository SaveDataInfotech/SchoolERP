import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FeesLessService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getfeesLessList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'FeesLess/Get');
    }

    getMaxId(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'FeesLess/get_MaxId_fees_less');
    }

    addNewFeesLess(feeslessinsert: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'FeesLess/insert_fees_less', feeslessinsert, httpOptions);
    }

    deletefeesLessType(fess_lessid: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'FeesLess/delete_fees_less?fess_lessid=' + fess_lessid, httpOptions);
    }
}