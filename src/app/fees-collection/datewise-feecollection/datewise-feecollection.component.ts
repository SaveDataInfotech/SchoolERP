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
  totalCollectionDateList: any[] = [];
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

  getTotalAmount(value) {
    const foundObject1 = this.generalFeeList.find(obj => obj.date == value);
    const am1 = foundObject1 ? foundObject1.admission_amount : 0;

    const foundObject2 = this.generalFeeList.find(obj => obj.date == value);
    const am2 = foundObject2 ? foundObject2.term_amount : 0;

    const foundObject3 = this.generalFeeList.find(obj => obj.date == value);
    const am3 = foundObject3 ? foundObject3.other_amount : 0;

    const foundObject4 = this.busFeeList.find(obj => obj.date == value);
    const am4 = foundObject4 ? foundObject4.bus_amount : 0;

    const foundObject5 = this.arrearFeeList.find(obj => obj.date == value);
    const am5 = foundObject5 ? foundObject5.arrear_amount : 0;

    return Number(am1) + Number(am2) + Number(am3) + Number(am4) + Number(am5)
  }

  getAdmissionTotalAmount() {
    return this.generalFeeList.reduce((acc, val) => acc += val.admission_amount, 0)
  }
  getTuitionTotalAmount() {
    return this.generalFeeList.reduce((acc, val) => acc += val.term_amount, 0)
  }
  getOtherKGToTotalAmount() {
    return this.generalFeeList.reduce((acc, val) => acc += val.lo_class_other_amount, 0)
  }

  getOtherHSTotalAmount() {
    return this.generalFeeList.reduce((acc, val) => acc += val.hs_class_other_amount, 0)
  }

  getOtherTotalTotalAmount() {
    return this.generalFeeList.reduce((acc, val) => acc += val.other_amount, 0)
  }

  getBusTotalAmount() {
    return this.busFeeList.reduce((acc, val) => acc += val.bus_amount, 0)
  }

  getArrearTotalAmount() {
    return this.arrearFeeList.reduce((acc, val) => acc += val.arrear_amount, 0)
  }

  getOverAllTotal() {
    const am1 = this.generalFeeList.reduce((acc, val) => acc += val.admission_amount, 0);
    const am2 = this.generalFeeList.reduce((acc, val) => acc += val.term_amount, 0);
    const am3 = this.generalFeeList.reduce((acc, val) => acc += val.other_amount, 0);
    const am4 = this.busFeeList.reduce((acc, val) => acc += val.bus_amount, 0);
    const am5 = this.arrearFeeList.reduce((acc, val) => acc += val.arrear_amount, 0);

    return Number(am1) + Number(am2) + Number(am3) + Number(am4) + Number(am5)
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
      const fromdate = new Date(this.dayWisetotalCollectionForm.value.fromdate);
      const todate = new Date(this.dayWisetotalCollectionForm.value.todate);
      const fromDateS = this.dayWisetotalCollectionForm.value.fromdate;
      const toDateS = this.dayWisetotalCollectionForm.value.todate;

      const totalCollection = await this.dWFSvc.getTotalCollectionfees(fromDateS, toDateS).toPromise();
      this.totalCollectionList = totalCollection;

      var daysOfYear = [];
      for (var d = fromdate; d <= todate; d.setDate(d.getDate() + 1)) {
        daysOfYear.push(this.datepipe.transform(d, 'yyyy-MM-dd'));
      }
      this.totalCollectionDateList = daysOfYear;
    }
    else {
      this.dayWisetotalCollectionForm.markAllAsTouched();
    }
  }

  tutioncash(value) {
    const foundObject = this.totalCollectionList.find(obj => obj.date == value &&
      obj.type_name == 'TUTION FEES');
    return foundObject ? foundObject.cash : 0;
  }

  tutionupi(value) {
    const foundObject = this.totalCollectionList.find(obj => obj.date == value &&
      obj.type_name == 'TUTION FEES');
    return foundObject ? foundObject.cheque_upi : 0;
  }

  admissioncash(value) {
    const foundObject = this.totalCollectionList.find(obj => obj.date == value &&
      obj.type_name == 'ADMISSION FEES');
    return foundObject ? foundObject.cash : 0;
  }

  admissionupi(value) {
    const foundObject = this.totalCollectionList.find(obj => obj.date == value &&
      obj.type_name == 'ADMISSION FEES');
    return foundObject ? foundObject.cheque_upi : 0;
  }

  othercash(value) {
    const foundObject = this.totalCollectionList.find(obj => obj.date == value &&
      obj.type_name == 'OTHER FEES');
    return foundObject ? foundObject.cash : 0;
  }

  otherupi(value) {
    const foundObject = this.totalCollectionList.find(obj => obj.date == value &&
      obj.type_name == 'OTHER FEES');
    return foundObject ? foundObject.cheque_upi : 0;
  }

  buscash(value) {
    const foundObject = this.totalCollectionList.find(obj => obj.date == value &&
      obj.type_name == 'BUS');
    return foundObject ? foundObject.cash : 0;
  }

  busupi(value) {
    const foundObject = this.totalCollectionList.find(obj => obj.date == value &&
      obj.type_name == 'BUS');
    return foundObject ? foundObject.cheque_upi : 0;
  }

  arrearcash(value) {
    const foundObject = this.totalCollectionList.find(obj => obj.date == value &&
      obj.type_name == 'ARREAR');
    return foundObject ? foundObject.cash : 0;
  }

  arrearupi(value) {
    const foundObject = this.totalCollectionList.find(obj => obj.date == value &&
      obj.type_name == 'ARREAR');
    return foundObject ? foundObject.cheque_upi : 0;
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
