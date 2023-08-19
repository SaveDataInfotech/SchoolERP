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

  searchstudentDetails(searchAdmissionNo: any): Observable<any[]> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'StudentProfile/get_Student_details_ByAd?admission_no=' + searchAdmissionNo, httpOptions);
  }


  studentDetails(studentinsert: any): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentProfile/insert_student_profile_details', studentinsert, httpOptions);
  }


  PersonalDetails(studentinsert: any, searchAdmissionNo: any): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentProfile/Update_student_profile_personal_details?admission_no=' + searchAdmissionNo, studentinsert, httpOptions);
  }


  studentOtherDetails(studentinsert: any, searchAdmissionNo: any): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentProfile/Update_student_profile_other_details?admission_no=' + searchAdmissionNo, studentinsert, httpOptions);
  }
}