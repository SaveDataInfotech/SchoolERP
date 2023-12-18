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
    fromdate: new FormControl(''),
    todate: new FormControl('')
  });


  async feeConcessionAdReport() {
    if (this.feeConcessionAdForm.valid) {
      const fromDateS = this.feeConcessionAdForm.value.fromdate;
      const toDateS = this.feeConcessionAdForm.value.todate;

      const adWiseList = await this.feesConSvc.feeConcessionAd(fromDateS, toDateS).toPromise();
      this.feeConcessionAdList = adWiseList;
      console.log(this.feeConcessionAdList)

    }
    else {
      this.feeConcessionAdForm.markAllAsTouched();
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
    fromdate: new FormControl(''),
    todate: new FormControl('')
  });


  async feeConcessionTotalAmountReport() {
    if (this.feeConcessionTotalAmountForm.valid) {
      const fromDateS = this.feeConcessionTotalAmountForm.value.fromdate;
      const toDateS = this.feeConcessionTotalAmountForm.value.todate;

      const total_amountWiseList = await this.feesConSvc.feeConcessionTotalAmount(fromDateS, toDateS).toPromise();
      this.feeConcessionTotalAmountList = total_amountWiseList;
    }
    else {
      this.feeConcessionTotalAmountForm.markAllAsTouched();
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
