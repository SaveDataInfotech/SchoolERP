import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class bookMasterService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getBookList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BookMaster/Get');
    }

    getMaxId(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BookMaster/get_MaxId_book_master');
    }

    addNewBook(newBookinsert: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'BookMaster/insert_book_master', newBookinsert, httpOptions);
    }

    deleteBook(book_id: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'BookMaster/delete_book_master?id=' + book_id, httpOptions);
    }
}