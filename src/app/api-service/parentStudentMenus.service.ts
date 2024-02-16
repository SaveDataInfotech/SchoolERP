import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class parentStudentMenuService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    getmenuList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'ParentStudentMenus/get_parent_student_menus');
    }

    newMenu(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'ParentStudentMenus/insert_parent_student_menus', value, httpOptions);
    }

    deleteuser(menuid: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'ParentStudentMenus/delete_parent_student_menus?menuid=' + menuid, httpOptions);
    }

}