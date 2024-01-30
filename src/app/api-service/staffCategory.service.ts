import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class staffCategoryService {
   readonly apiUrl = 'http://localhost:3399/api/';
    constructor(private http: HttpClient) {
    }

    getCategoryList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffCategory/Get');
    }

    getMaxId(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffCategory/get_MaxId_staff_category');
    }

    addNewCategory(value: any): Observable<any> {
        
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffCategory/insert_staff_category', value, httpOptions);
    }

    deletestaffCategory(id: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'StaffCategory/delete_staff_category?category_id=' + id, httpOptions);
    }
}