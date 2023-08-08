import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class studentProfileService {
  readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }



  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StaffType/get_MaxId_staff_type');
  }


  addNewStudent(studentinsert: any): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentProfile/insert_student_profile', studentinsert, httpOptions);
  }


}