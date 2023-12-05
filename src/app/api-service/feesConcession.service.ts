import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeesConcessionService {
  readonly apiUrl = 'https://localhost:44314/api/';
  constructor(private http: HttpClient) {
  }

  studentFeesConcession(feesInsert: any): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'StudentFeesConcession/insert_student_fees_concession', feesInsert, httpOptions);
  }

  getgeneralConcessionbybillno(billNo, admissionNo): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentFeesConcession/getgeneralConcessionbybillno?bill_no=' + billNo + '&admissionNo=' + admissionNo);
  }

  getbusConcessionbybillno(billNo, admissionNo): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentFeesConcession/getbusConcessionbybillno?bill_no=' + billNo + '&admissionNo=' + admissionNo);
  }

  getArrearConcessionbybillno(billNo, admissionNo): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentFeesConcession/getarrearConcessionbybillno?bill_no=' + billNo + '&admissionNo=' + admissionNo);
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StudentFeesConcession/get_maxid_from_fees_concession');
  }

  RecentConcessionList(value): Observable<any[]> {
    debugger;
    return this.http.get<any[]>(this.apiUrl + 'StudentFeesConcession/todayFeesCollectionList?today=' + value);
  }
}