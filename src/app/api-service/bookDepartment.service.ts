import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class bookDepartmentService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
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