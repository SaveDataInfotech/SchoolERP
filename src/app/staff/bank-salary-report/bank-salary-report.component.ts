import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { staffSalaryReportService } from 'src/app/api-service/staffSalaryReports.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-bank-salary-report',
  templateUrl: './bank-salary-report.component.html',
  styleUrls: ['./bank-salary-report.component.scss']
})
export class BankSalaryReportComponent implements OnInit {
  bankNameList: any[] = [];
  StaffBanksalaryList: any[] = [];
  year: string;
  months: any[] = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthName: string;
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
    const monthNumber = month.split("-")[1];
    this.monthName = this.months[Number(monthNumber)]
    debugger;

    this.StaffBanksalaryList = await this.sSSvc.getstaffBanksalaryList(bank, month).toPromise();
    this.year = month.slice(0, 4);
  };

  exportDayWiseExcel(): void {
    const element = document.getElementById('Payoutsalary');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = 'Payoutsalary.xlsx';

    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
  }

}
