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

  RecentFeesCollectionList(value, id, role): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/todayFeesCollectionList?today=' + value + '&id=' + id + '&role=' + role);
  }

  RecentFeesDetailList(value, id, role): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl + 'FeesTransaction/get_student_fee_transaction_detail?date=' + value + '&id=' + id + '&role=' + role);
  }

  getgeneralfeesbybillno(billNo, admissionNo): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/getgeneralfeesbybillno?bill_no=' + billNo + '&admissionNo=' + admissionNo);
  }

  getbusfeesbybillno(billNo, admissionNo): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/getbusfeesbybillno?bill_no=' + billNo + '&admissionNo=' + admissionNo);
  }

  getArrearfeesbybillno(billNo, admissionNo): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/getarrearfeesbybillno?bill_no=' + billNo + '&admissionNo=' + admissionNo);
  }

  getBusFeesList(value): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/get_student_busfees_list?admission_no=' + value);
  }

  studentFeesDeduction(feesInsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'FeesCollection/insert_student_admissionfees_deduction', feesInsert, httpOptions);
  }

  studentFeesEdit(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'FeesCollection/update_fees_collecction', data, httpOptions);
  }

  studentFeesDelete(data: any): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'FeesCollection/delete_fees_collecction', data, httpOptions);
  }

  getGeneralFeesList(value: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/get_student_generalfees_list?admission_no=' + value);
  }

  getArrearFeesList(value: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'ArrearFees/get_student_arrearfees_list?admission_no=' + value);
  }

  getMaxId(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesCollection/get_maxid_from_fees_deduction');
  }

  checkBillNo(value): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'FeesTransaction/checkbillno?bill_no=' + value);
  }

}