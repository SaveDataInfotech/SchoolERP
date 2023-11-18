import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class StaffLoanService {
  constructor(private http: HttpClient) {
  }

 readonly apiUrl = 'http://localhost:8081/api/';
  
  addNewLoan(loanInsert: any): Observable<any> {
    debugger
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.apiUrl + 'StaffLoan/insert_staff_loan', loanInsert, httpOptions);
  }

  LoanDeduction(loanInsert: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.apiUrl + 'LoanDeduction/insert_loandeduction', loanInsert, httpOptions);
  }

  getLoanList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'StaffLoan/ActiveBatchGet');
  }

}