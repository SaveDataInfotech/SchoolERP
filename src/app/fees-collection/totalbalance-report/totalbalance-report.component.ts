import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FeesCollectionBalanceReportsService } from 'src/app/api-service/balanceReports.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-totalbalance-report',
  templateUrl: './totalbalance-report.component.html',
  styleUrls: ['./totalbalance-report.component.scss']
})
export class TotalbalanceReportComponent implements OnInit {
  myDate = new Date();
  today: any;

  balanceList: any[] = [];
  constructor(private datePipe: DatePipe,
    private bRSvc: FeesCollectionBalanceReportsService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.today = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.getBalance();
  }

  async getBalance() {
    this.spinner.show();
    const generalBalance = await this.bRSvc.generalBalanceReport().toPromise();
    this.balanceList.push(...generalBalance);

    const busBalance = await this.bRSvc.busBalanceReport().toPromise();
    this.balanceList.push(...busBalance);

    const arrearBalance = await this.bRSvc.arrearBalanceReport().toPromise();
    this.balanceList.push(...arrearBalance);

    this.spinner.hide();
  }

  exportExcel(): void {
    const element = document.getElementById('dail_collection_print');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = 'balancereport.xlsx';

    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
  }
}
