import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as converter from 'number-to-words';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-preview-fees-dialog-component',
  templateUrl: './preview-fees-dialog-component.component.html',
  styleUrls: ['./preview-fees-dialog-component.component.scss']
})

export class PreviewFeesDialogComponentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PreviewFeesDialogComponentComponent>
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

  convertToIndianRupees(amount: number): string {
    const inWords = converter.words(amount, { case: 'title' }); // Convert number to words
    return `${inWords} Rupees Only`; // Append Rupees Only at the end
  }

  getPaymentType(value: string): any {
    
    if (value == 'cash') return 'Cash';
    else if (value == 'cheque_upi') return 'Cheque/Upi';
    else return '';
  }

  exportToExcel(): void {
    const studentDetails = this.studentDetails;
    const generalFee = this.generalFee;

    const dataForExcel: any[] = [
      {
        'Admission No': studentDetails.admission_no,
        'Bill No': studentDetails.bill_no,
        'Student Name': studentDetails.student_name,
        'Date': studentDetails.date,
        'Class': studentDetails.class_name,
        'Group': studentDetails.group_name,
        'Section': studentDetails.section_name,
        'Batch': studentDetails.batch_year,
        'Father Name': studentDetails.father_name,
        'Payment Mode': this.getPaymentType(studentDetails.payment_type),
        'Si.No': '', // Explicitly declared as string        
        'Description': '', // Explicitly declared as string
        'Amount': '', // Explicitly declared as string
        'Total': generalFee.reduce((total, item) => Number(total) + Number(item.deduction_amount || 0), 0),// Consider handling null or undefined values
        'Amount in Words': this.amountInWords.charAt(0).toUpperCase() + this.amountInWords.slice(1) + ' ' + 'Rupees only'
      }
    ];

    // Add each row for Si.No, Description, and Amount separately
    for (let i = 0; i < generalFee.length; i++) {
      const amountAsString = generalFee[i].deduction_amount !== null ? generalFee[i].deduction_amount.toString() : '';
      dataForExcel.push({
        'Admission No': '',
        'Bill No': '',
        'Student Name': '',
        'Date': '',
        'Class': '',
        'Group': '',
        'Section': '',
        'Batch': '',
        'Father Name': '',
        'Payment Mode': '',
        'Si.No': (i + 1).toString(), // Convert number to string explicitly       
        'Description': generalFee[i].type_name,
        'Amount': amountAsString,
        'Total': '',
        'Amount in Words': ''
      });
    }

    // Save data as Excel file
    this.saveAsExcelFile(dataForExcel, 'exported_data');
  }

  private saveAsExcelFile(data: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(dataBlob);
    a.download = fileName + '.xlsx';
    a.click();
    document.body.removeChild(a);
  }

  gettotalBalance() {
    return this.generalFee.reduce((acc, e) => acc + parseInt(e.balance), 0);
  }
}
