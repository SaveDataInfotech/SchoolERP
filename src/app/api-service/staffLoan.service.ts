import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "./configuration.service";


@Injectable({
  providedIn: 'root'
})
export class StaffLoanService {
  readonly apiUrl = this.configService.gapiUrl;
  constructor(private http: HttpClient,
    private configService: ConfigService) {
  }

  addNewLoan(loanInsert: any): Observable<any> {
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