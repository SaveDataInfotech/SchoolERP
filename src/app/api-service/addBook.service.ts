import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class addBookService {
   readonly apiUrl = 'http://localhost:8081/api/';
    constructor(private http: HttpClient) {
    }

    getBookList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'AddBook/Get');
    }

    addNewBook(newBookinsert: any): Observable<any> {        
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'AddBook/insert_add_book', newBookinsert, httpOptions);
    }
}