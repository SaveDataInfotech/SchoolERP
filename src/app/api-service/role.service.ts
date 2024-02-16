import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  readonly apiUrl = this.configService.gapiUrl;
  constructor(private http: HttpClient,
    private configService: ConfigService) {
  }

  getRoleList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'RoleMaster/Get');
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'RoleMaster/get_MaxId_role_master');
  }


  addNewRole(roleinsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'RoleMaster/insert_role_master', roleinsert, httpOptions);
  }


  deleteRole(roleid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'RoleMaster/delete_role_master?roleid=' + roleid, httpOptions);
  }

}