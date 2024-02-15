import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class parentStudentMenuService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getmenuList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'ParentStudentMenus/get_parent_student_menus');
    }

    newMenu(value: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'ParentStudentMenus/insert_parent_student_menus', value, httpOptions);
    }

    deleteuser(menuid: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'ParentStudentMenus/delete_parent_student_menus?menuid=' + menuid, httpOptions);
    }

}