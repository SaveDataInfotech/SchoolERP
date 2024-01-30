import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class staffMenusService {
    readonly apiUrl = 'https://localhost:44314/api/';
    constructor(private http: HttpClient) {
    }

    getstaffmenuList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffMenus/get_staff_menus');
    }


    newStaffMenu(value: any): Observable<any> {
        debugger;
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffMenus/insert_staff_menus', value, httpOptions);
    }


    deleteuser(userid: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'StaffMenus/delete_user_profile?stafftypemenuid=' + userid, httpOptions);
    }
}