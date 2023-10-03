import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class bookCategoryService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getcategoryList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BookCategory/Get');
    }

    getCategoryMaxId(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BookCategory/get_MaxId_book_category');
    }

    addNewcategory(newBookinsert: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'BookCategory/insert_book_category', newBookinsert, httpOptions);
    }

    deletecategory(book_id: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'BookCategory/delete_book_category?category_id=' + book_id, httpOptions);
    }
}