import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import * as converter from 'number-to-words';

@Component({
  selector: 'app-preview-fees-dialog-component',
  templateUrl: './preview-fees-dialog-component.component.html',
  styleUrls: ['./preview-fees-dialog-component.component.scss']
})

export class PreviewFeesDialogComponentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PreviewFeesDialogComponentComponent>
  ) { }
  generalFee: any = this.data.generalFee;
  busFee: any = this.data.busFee;
  studentDetails: any;
  amountInWords: any;
  ngOnInit(): void {
    debugger;
    this.generalFee = this.data.general;
    this.busFee = this.data.bus;

    this.studentDetails = this.data.studentDetails;

    this.busFee.forEach(e => {
      this.generalFee.push(e)
    });
    const { toWords } = require('number-to-words');
    this.amountInWords = toWords(Number(this.studentDetails.total_amount));

  }
  closedialog() {
    this.dialogRef.close(false);
  }

  convertToIndianRupees(amount: number): string {
    const inWords = converter.words(amount, { case: 'title' }); // Convert number to words
    return `${inWords} Rupees Only`; // Append Rupees Only at the end
  }

  getPaymentType(value: string): any {
    debugger;
    if (value == 'cash') return 'Cash';
    else if (value == 'cheque_upi') return 'Cheque/Upi';
    else return '';
  }
}
