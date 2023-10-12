import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GeneralFeesService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getGeneralFeesList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'GeneralFees/get_student_general_list');
    }

    addNewGeneralFees(data: any): Observable<any> {
        
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'GeneralFees/insert_staff_assign', data, httpOptions);
    }

    deleteGeneralFees(assignid: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'GeneralFees/delete_general_fees?assignid=' + assignid, httpOptions);
    }
}