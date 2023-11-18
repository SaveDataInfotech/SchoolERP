import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class loginService {
 readonly apiUrl = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) {
  }

  // loginGetClick(email: any, password: any): Observable<any[]> {
  //   debugger;
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.get<any[]>(this.apiUrl + 'Authentication/UserLogin?email='+email+'&password='+password, httpOptions);
  //   //Authentication/UserLogin?email=df&password=sdf
  // }

  loginGetClick(email: any, password: any): Observable<any[]> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>('http://localhost:8081/api/Authentication/UserLogin?email=' + email + '&password=' + password, httpOptions);
  }

  storeToken(tokenValue:string) {
    debugger;
    localStorage.setItem('token',tokenValue)
  }

  getToken(){
    debugger;
    localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !! localStorage.getItem('token')
  }
}