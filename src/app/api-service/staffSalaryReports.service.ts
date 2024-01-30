import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class staffSalaryReportService {
    readonly apiUrl = 'http://localhost:3399/api/';
    constructor(private http: HttpClient) {
    }

    getstaffsalaryList(id, month): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffSalaryReports/Get?staff_typeid=' + id + '&salary_month=' + month);
    }

    getstaffsalaryBankList(id, month): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffSalaryReports/get_payoutsalary_bank_amount?staff_typeid=' + id + '&salary_month=' + month);
    }

    getstaffsalaryStaffTypeList(id, month): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffSalaryReports/get_payoutsalary_stafftype_totalamount?staff_typeid=' + id + '&salary_month=' + month);
    }

    getBankNameList(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffBankSalary/get_group_by_bankname');
    }

    getstaffBanksalaryList(bank, month): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffBankSalary/get_staff_salary_bank?salary_month=' + month + '&bank_name=' + bank);
    }

    getstaffTypesalaryList(bank, month): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'StaffBankSalary/get_stafftype_salary_report?salary_month=' + month + '&staff_typeid=' + bank);
    }
}