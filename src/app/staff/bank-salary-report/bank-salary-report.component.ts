import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { staffSalaryReportService } from 'src/app/api-service/staffSalaryReports.service';

@Component({
  selector: 'app-bank-salary-report',
  templateUrl: './bank-salary-report.component.html',
  styleUrls: ['./bank-salary-report.component.scss']
})
export class BankSalaryReportComponent implements OnInit {
  bankNameList: any[] = [];
  StaffBanksalaryList: any[] = [];
  year: string;
  constructor(private sSSvc: staffSalaryReportService) { }

  ngOnInit(): void {
    this.getBankNameList();
  }

  staffsalaryBankreports = new FormGroup({
    bank_name: new FormControl(''),
    sal_month: new FormControl('')
  });

  getBankNameList() {
    this.sSSvc.getBankNameList().subscribe(data => {
      this.bankNameList = data;
    });
  };

  async searchReport() {
    const bank = this.staffsalaryBankreports.value.bank_name;
    const month = this.staffsalaryBankreports.value.sal_month;

    this.StaffBanksalaryList = await this.sSSvc.getstaffBanksalaryList(bank, month).toPromise();
    this.year = month.slice(0, 4);
  }

}
