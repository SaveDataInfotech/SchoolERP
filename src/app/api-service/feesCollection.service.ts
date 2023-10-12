import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeescollectionService {
  readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  getStudentList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/GetStudents');
  }

  getBusFeesList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/get_student_busfees_list');
  }

  studentFeesDeduction(feesInsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'FeesCollection/insert_student_admissionfees_deduction', feesInsert, httpOptions);
  }

  getGeneralFeesList(value:any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/get_student_generalfees_list?admission_no='+value);
  }
  

}