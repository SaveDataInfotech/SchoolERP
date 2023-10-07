import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class bookPurchaseService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getPurchaseList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BookPurchase/Get');
    }

    addNewPurchase(newBookinsert: any): Observable<any> {        
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'BookPurchase/insert_book_purchase', newBookinsert, httpOptions);
    }
}