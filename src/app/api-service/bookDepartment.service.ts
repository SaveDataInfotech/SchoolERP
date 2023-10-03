import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class bookDepartmentService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getDepartmentList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BookDepartment/Get');
    }

    getDepartmentMaxId(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'BookDepartment/get_MaxId_book_department');
    }

    addNewDepartment(departmentinsert: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'BookDepartment/insert_book_department', departmentinsert, httpOptions);
    }

    deleteDepartment(book_id: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'BookDepartment/delete_book_department?department_id=' + book_id, httpOptions);
    }
}