import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})
export class staffMenusService {
    readonly apiUrl = this.configService.gapiUrl;
    constructor(private http: HttpClient,
        private configService: ConfigService) {
    }

    getstaffmenuList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffMenus/get_staff_menus');
    }

    newStaffMenu(value: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.apiUrl + 'StaffMenus/insert_staff_menus', value, httpOptions);
    }

    deleteuser(userid: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.delete<any>(this.apiUrl + 'StaffMenus/delete_user_profile?stafftypemenuid=' + userid, httpOptions);
    }
}