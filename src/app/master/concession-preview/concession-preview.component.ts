import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-concession-preview',
  templateUrl: './concession-preview.component.html',
  styleUrls: ['./concession-preview.component.scss']
})
export class ConcessionPreviewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConcessionPreviewComponent>
  ) { }

  generalFee: any[] = [];
  busFee: any[] = [];
  arrearFee: any[] = [];
  studentDetails: any;
  amountInWords: any;
  async ngOnInit(): Promise<void> {
    this.generalFee = this.data.general;
    this.busFee = this.data.bus;
    this.arrearFee = this.data.arrear;
    this.studentDetails = this.data.studentDetails;

    await Promise.all(this.busFee.map(async (e) => {
      debugger;
      this.generalFee.push(e);
    }));

    await Promise.all(this.arrearFee.map(async (e) => {
      this.generalFee.push(e);
    }));

    const { toWords } = require('number-to-words');
    this.amountInWords = toWords(Number(this.studentDetails.total_amount));
  }

  closedialog() {
    this.dialogRef.close(false);
  }


  exportToExcel(): void {
    const table = document.getElementById('myTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Fee Concession.xlsx');
  }

}
