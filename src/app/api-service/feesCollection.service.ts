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

  getAdmissionFeesList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/get_student_admissionfees_list');
  }

  getBusFeesList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/get_student_busfees_list');
  }

  getCommonFeesList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/get_student_commonfees_list');
  }

//   getMaxId(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl + 'FeesType/get_MaxId_fees_type');
//   }

  studentFeesDeduction(feesInsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'FeesCollection/insert_student_admissionfees_deduction', feesInsert, httpOptions);
  }

//   deletefeesType(typeid: any): Observable<any> {
//     debugger;
//     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
//     return this.http.delete<any>(this.apiUrl + 'FeesType/Delete_fees_type?typeid=' + typeid, httpOptions);
//   }
}