import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class userProfileService {
  readonly apiUrl = 'http://localhost:3399/api/';
  constructor(private http: HttpClient) {
  }

  getUsersList(id): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'UserProfile/Get?userid=' + id);
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'UserProfile/get_MaxId_user_profile');
  }

  newUserProfile(userInsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'UserProfile/insert_staff_type', userInsert, httpOptions);
  }


  deleteuser(userid: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<any>(this.apiUrl + 'UserProfile/delete_user_profile?userid=' + userid, httpOptions);
  }

  getUserList(id): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'UserProfile/get_user_profile_byid?userid=' + id);
  }

  getStaffLoginList(staffno): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'UserProfile/get_staff_profile_byid?staffno=' + staffno);
  }

}