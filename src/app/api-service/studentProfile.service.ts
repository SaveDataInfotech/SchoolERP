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

  getMaxId(value): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentProfile/get_MaxId_student_profile?className=' + value);
  }

  getallSibilings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentProfile/get_all_sibilings');
  }

  searchstudentDetails(value: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'StudentProfile/get_Student_details_ByAd?ad=' + value, httpOptions);
  }

  searchnameByclassid(value: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.get<any[]>(this.apiUrl + 'StudentProfile/get_Student_details_classid?classid=' + value, httpOptions);
  }

  studentDetails(value: any): Observable<any> {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentProfile/insert_student_profile_details', value, httpOptions);
  }
}