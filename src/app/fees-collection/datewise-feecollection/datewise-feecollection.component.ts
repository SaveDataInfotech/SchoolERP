import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ViewChild, ElementRef } from '@angular/core';
import { dayWiseFeeCollectionService } from 'src/app/api-service/dayWiseFeeCollection.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-datewise-feecollection',
  templateUrl: './datewise-feecollection.component.html',
  styleUrls: ['./datewise-feecollection.component.scss']
})
export class DatewiseFeecollectionComponent implements OnInit {
  dateList: any[] = [];
  generalFeeList: any[] = [];
  busFeeList: any[] = [];
  arrearFeeList: any[] = [];
  totalCollectionList: any[] = [];
  @ViewChild('tableRef') tableRef: ElementRef;
  constructor(public datepipe: DatePipe,
    private dWFSvc: dayWiseFeeCollectionService) { }

  ngOnInit(): void {
  }

  scrollToTop() {
    if (this.tableRef && this.tableRef.nativeElement) {
      const tableElement = this.tableRef.nativeElement.querySelector('table');
      tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  dayWiseCollectionForm = new FormGroup({
    fromdate: new FormControl(''),
    todate: new FormControl('')
  });


  async searchReport() {
    if (this.dayWiseCollectionForm.valid) {
      const fromdate = new Date(this.dayWiseCollectionForm.value.fromdate);
      const todate = new Date(this.dayWiseCollectionForm.value.todate);
      const fromDateS = this.dayWiseCollectionForm.value.fromdate;
      const toDateS = this.dayWiseCollectionForm.value.todate;

      const generalFees = await this.dWFSvc.getgeneralfees(fromDateS, toDateS).toPromise();
      this.generalFeeList = generalFees;

      const busFees = await this.dWFSvc.getbusfees(fromDateS, toDateS).toPromise();
      this.busFeeList = busFees;

      const arrearFees = await this.dWFSvc.getArrearfees(fromDateS, toDateS).toPromise();
      this.arrearFeeList = arrearFees;

      var daysOfYear = [];
      for (var d = fromdate; d <= todate; d.setDate(d.getDate() + 1)) {
        daysOfYear.push(this.datepipe.transform(d, 'yyyy-MM-dd'));
      }
      this.dateList = daysOfYear;
    }
    else {
      this.dayWiseCollectionForm.markAllAsTouched();
    }
  }


  getAdmissionAmount(value: any) {
    // return this.generalFeeList.find(x=>x.date == value).admission_amount;
    const foundObject = this.generalFeeList.find(obj => obj.date == value);
    return foundObject ? foundObject.admission_amount : 0;
  }

  getTuitionAmount(value) {
    debugger;
    const foundObject = this.generalFeeList.find(obj => obj.date == value);
    return foundObject ? foundObject.term_amount : 0;
  }

  getOtherKGToAmount(value) {
    const foundObject = this.generalFeeList.find(obj => obj.date == value);
    return foundObject ? foundObject.lo_class_other_amount : 0;
  }

  getOtherHSAmount(value) {
    const foundObject = this.generalFeeList.find(obj => obj.date == value);
    return foundObject ? foundObject.hs_class_other_amount : 0;
  }

  getOtherTotalAmount(value) {
    const foundObject = this.generalFeeList.find(obj => obj.date == value);
    return foundObject ? foundObject.other_amount : 0;
  }

  getBusAmount(value) {
    const foundObject = this.busFeeList.find(obj => obj.date == value);
    return foundObject ? foundObject.bus_amount : 0;
  }
  getArrearAmount(value) {
    const foundObject = this.arrearFeeList.find(obj => obj.date == value);
    return foundObject ? foundObject.arrear_amount : 0;
  }

  exportDayWiseExcel(): void {
    const element = document.getElementById('day_wise_collection_print');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = 'dayWiseCollectionReport.xlsx';

    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
  }


  /////////////////////////////////////


  dayWisetotalCollectionForm = new FormGroup({
    fromdate: new FormControl(''),
    todate: new FormControl('')
  });


  async searchTotalReport() {
    if (this.dayWisetotalCollectionForm.valid) {
      const fromDateS = this.dayWisetotalCollectionForm.value.fromdate;
      const toDateS = this.dayWisetotalCollectionForm.value.todate;

      const totalCollection = await this.dWFSvc.getTotalCollectionfees(fromDateS, toDateS).toPromise();
      this.totalCollectionList = totalCollection;
    }
    else {
      this.dayWisetotalCollectionForm.markAllAsTouched();
    }
  }

  exportDayWiseTotalExcel(): void {
    const element = document.getElementById('day_wise_total_collection_print');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = 'dayWiseTotalCollectionReport.xlsx';

    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
  }
}
