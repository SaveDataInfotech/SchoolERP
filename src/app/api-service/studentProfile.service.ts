import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ConfigService } from "./configuration.service";

@Injectable({
  providedIn: 'root'
})
export class studentProfileService {
  readonly apiUrl = this.configService.gapiUrl;
  constructor(private http: HttpClient,
    private configService: ConfigService) {
  }

  getMaxId(value): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentProfile/get_MaxId_student_profile?className=' + value);
  }

  getallSibilings(ad): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentProfile/get_all_sibilings?admission_no=' + ad);
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