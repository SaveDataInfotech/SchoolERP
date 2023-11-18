import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FeesLessService {
   readonly apiUrl = 'http://localhost:8081/api/';
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

    deletefeesLessType(id: any): Observable<any> {
        debugger
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'FeesLess/delete_fees_less?fees_lessid=' + id, httpOptions);
    }
}