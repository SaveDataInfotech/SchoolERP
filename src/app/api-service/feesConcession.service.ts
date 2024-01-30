import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeesConcessionService {
  readonly apiUrl = 'http://localhost:3399/api/';
  constructor(private http: HttpClient) {
  }

  studentFeesConcession(feesInsert: any): Observable<any> {
    
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
    
    return this.http.get<any[]>(this.apiUrl + 'StudentFeesConcession/todayFeesCollectionList?today=' + value);
  }

  feeConcessionAd(fromdate, todate): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeeConcessionReports/get_fees_concession_daterange?fromdate=' + fromdate + '&todate=' + todate);
  }

  feeConcessionAdTillDate(date): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeeConcessionReports/get_fees_concession_till_daterange?fromdate=' + date);
  }

  feeConcessionTotalAmount(fromdate, todate): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeeConcessionReports/get_fees_concession_totalamount_daterange?fromdate=' + fromdate + '&todate=' + todate);
  }

  feeConcessionTotalAmountTillDate(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeeConcessionReports/get_fees_concession_totalamount_till_daterange');
  }
}