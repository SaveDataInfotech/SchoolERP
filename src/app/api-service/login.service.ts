import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class loginService {
  readonly apiUrl = this.configService.gapiUrl;
  constructor(private http: HttpClient,
    private configService: ConfigService) {
  }

  loginGetClick(email: any, password: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'Authentication/UserLogin?email=' + email + '&password=' + password, httpOptions);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }


  ////---------------------

  loginstaffGetClick(staffNo: any, dob: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'Authentication/StaffLogin?staff_no=' + staffNo + '&dob=' + dob, httpOptions);
  }


  loginParentGetClick(admission_no: any, f_ph: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'Authentication/ParentLogin?admission_no=' + admission_no + '&f_ph=' + f_ph, httpOptions);
  }
}