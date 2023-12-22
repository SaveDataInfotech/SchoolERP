import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FeesConcessionService } from 'src/app/api-service/feesConcession.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-fee-concession-reports',
  templateUrl: './fee-concession-reports.component.html',
  styleUrls: ['./fee-concession-reports.component.scss']
})
export class FeeConcessionReportsComponent implements OnInit {
  feeConcessionAdList: any[] = [];
  feeConcessionTotalAmountList: any[] = [];
  constructor(private feesConSvc: FeesConcessionService,) { }

  ngOnInit(): void {
  }

  feeConcessionAdForm = new FormGroup({
    report_type: new FormControl('morethan'),
    fromdate: new FormControl(''),
    todate: new FormControl(''),
    till_date: new FormControl('')
  });


  async feeConcessionAdReport() {
    debugger
    if (this.feeConcessionAdForm.value.report_type == 'morethan') {
      const fromDateS = this.feeConcessionAdForm.value.fromdate;
      const toDateS = this.feeConcessionAdForm.value.todate;

      const adWiseList = await this.feesConSvc.feeConcessionAd(fromDateS, toDateS).toPromise();
      this.feeConcessionAdList = adWiseList;
    }
    else if (this.feeConcessionAdForm.value.report_type == 'tilldate') {
      const tillDate = this.feeConcessionAdForm.value.till_date;

      const adWiseList = await this.feesConSvc.feeConcessionAdTillDate(tillDate).toPromise();
      this.feeConcessionAdList = adWiseList;
    }
  }

  exportDayWiseTotalExcel(): void {
    const element = document.getElementById('dayAD_wise_concession_print');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = 'studentFeeConcessionReport.xlsx';

    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
  }

  ///////////////////////////////////////////////////////////////////////



  feeConcessionTotalAmountForm = new FormGroup({
    report_type: new FormControl('morethan'),
    fromdate: new FormControl(''),
    todate: new FormControl(''),
    till_date: new FormControl('')
  });


  async feeConcessionTotalAmountReport() {
    if (this.feeConcessionTotalAmountForm.value.report_type == 'morethan') {
      const fromDateS = this.feeConcessionTotalAmountForm.value.fromdate;
      const toDateS = this.feeConcessionTotalAmountForm.value.todate;

      const total_amountWiseList = await this.feesConSvc.feeConcessionTotalAmount(fromDateS, toDateS).toPromise();
      this.feeConcessionTotalAmountList = total_amountWiseList;
    }
    else if (this.feeConcessionTotalAmountForm.value.report_type == 'tilldate') {
      const tillDate = this.feeConcessionTotalAmountForm.value.till_date;

      const total_amountWiseList = await this.feesConSvc.feeConcessionTotalAmountTillDate(tillDate).toPromise();
      this.feeConcessionTotalAmountList = total_amountWiseList;
    }
  }

  exporTotalAmountExcel(): void {
    const element = document.getElementById('totalamount_concession_print');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = 'FeeConcessionDayWiseTotalReport.xlsx';

    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
  }
}
