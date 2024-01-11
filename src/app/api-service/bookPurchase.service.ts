import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class bookPurchaseService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    getPurchaseList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BookPurchase/Get');
    }

    addNewPurchase(newBookinsert: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'BookPurchase/insert_book_purchase', newBookinsert, httpOptions);
    }
}