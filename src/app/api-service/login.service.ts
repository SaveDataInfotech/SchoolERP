import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class loginService {
 readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  // loginGetClick(email: any, password: any): Observable<any[]> {
  //   
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.get<any[]>(this.apiUrl + 'Authentication/UserLogin?email='+email+'&password='+password, httpOptions);
  //   //Authentication/UserLogin?email=df&password=sdf
  // }

  loginGetClick(email: any, password: any): Observable<any[]> {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>('https://localhost:44314/api/Authentication/UserLogin?email=' + email + '&password=' + password, httpOptions);
  }

  storeToken(tokenValue:string) {
    
    localStorage.setItem('token',tokenValue)
  }

  getToken(){
    
    localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !! localStorage.getItem('token')
  }
}