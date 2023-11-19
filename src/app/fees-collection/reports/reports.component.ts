import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { FeesTypeService } from 'src/app/api-service/FeesType.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { FeesCollectionReportsService } from 'src/app/api-service/feesCollectionReports.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  FeesList: any = [];
  activeBatchYear: any = [];
  outstandingreportmultiplestudentsList: any = [];
  newgetbatch: string;

  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];

  spaid: boolean;
  sbalance: boolean;
  sbus: boolean;
  colspanValue: number;
  FeesListOutStanding: any[] = [];
  checkedItems: any[] = [];
  constructor(private FtySvc: FeesTypeService,
    private batchSvc: BatechYearService,
    private fCSvc: FeesCollectionReportsService,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService) { }

  ngOnInit() {
    this.refreshFeesTypeList();
    this.GetActiveBatchYear();
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
  }

  async refreshFeesTypeList() {
    const feeList = await this.FtySvc.getfeesTypeList().toPromise();
    this.FeesListOutStanding = feeList;
  };

  refreshClassList() {
    this.ClassSvc.getClassList().subscribe(data => {
      this.ClassList = data;
    });
  }

  refreshGroupList() {
    this.GroupSvc.getGroupList().subscribe(data => {
      this.GroupList = data;
    });
  }

  refreshSectionList() {
    this.ScSvc.getSectionList().subscribe(data => {
      this.SectionList = data;
    });
  }

  filterGroupfun(classsid: any) {

    const classid = Number(classsid);
    this.reportsForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.reportsForm.get('groupid')?.setValue(0);
    this.reportsForm.get('sectionid')?.setValue(null);
    if (this.groupFilterlist.length == 0) {
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.reportsForm.get('sectionid')?.setValue(null);
    }
    else {
      this.reportsForm.get('sectionid')?.setValue(null);
      this.sectionFilterlist = [];
    }
  }

  filterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.reportsForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.reportsForm.get('sectionid')?.setValue(null);
  }


  GetActiveBatchYear() {
    this.batchSvc.GetActiveBatchYear().subscribe(data => {
      this.activeBatchYear = data;
      const getbatch = JSON.stringify(this.activeBatchYear[0].batch_year)
      this.newgetbatch = (getbatch.replace(/['"]+/g, ''));
      this.reportsForm.get('batch_year')?.setValue(this.newgetbatch);
    });
  }

  reportsForm = new FormGroup({
    type: new FormControl('multiple'),
    batch_year: new FormControl(''),
    admission_no: new FormControl(''),
    classid: new FormControl(null),
    groupid: new FormControl(0),
    sectionid: new FormControl(null)
  });


  search() {

    const batchYear = this.reportsForm.value.batch_year
    const classId = this.reportsForm.value.classid
    const groupID = this.reportsForm.value.groupid
    const sectionId = this.reportsForm.value.sectionid
    const adNo = this.reportsForm.value.admission_no
    if (this.reportsForm.value.type == 'multiple') {
      this.fCSvc.outstandingreportmultiplestudent(batchYear, classId, groupID, sectionId).subscribe(data => {

        this.outstandingreportmultiplestudentsList = data;
      });
    }
    else if (this.reportsForm.value.type == 'individual') {
      this.fCSvc.outstandingreportindividualstudent(batchYear, adNo).subscribe(data => {

        this.outstandingreportmultiplestudentsList = data;
      });
    }
  };

  getPaidAmount(value: any, i) {

    let newClass = [];
    let newAmount = [];
    let index: any;
    let getAmount: any;
    newClass = this.outstandingreportmultiplestudentsList[i].typeids.split(",").map(Number);
    newAmount = this.outstandingreportmultiplestudentsList[i].deduction_amount.split(",");

    if (newClass.length == newAmount.length) {
      index = newClass.indexOf(value);
      if (index >= 0) {
        getAmount = newAmount[index];
      }
      else {
        getAmount = 'NULL';
      }
    }
    return getAmount;
  }

  getBalanceAmount(value: any, i) {

    let newClass = [];
    let newAmount = [];
    let index: any;
    let getAmount: any;
    newClass = this.outstandingreportmultiplestudentsList[i].typeids.split(",").map(Number);
    newAmount = this.outstandingreportmultiplestudentsList[i].balance.split(",");

    if (newClass.length == newAmount.length) {
      index = newClass.indexOf(value);
      if (index >= 0) {
        getAmount = newAmount[index];
      }
      else {
        getAmount = 'NULL';
      }
    }
    return getAmount;
  }

  paid(event) {
    if (event.target.checked) {
      this.spaid = true
    }
    else {
      this.spaid = false
    }

    if (this.spaid && this.sbalance) {
      this.colspanValue = 2;
    }
    else {
      this.colspanValue = 1;
    }
  }

  balance(event) {
    if (event.target.checked) {
      this.sbalance = true
    }
    else {
      this.sbalance = false
    }

    if (this.spaid && this.sbalance) {
      this.colspanValue = 2;
    }
    else {
      this.colspanValue = 1;
    }
  }

  bus(event) {
    debugger
    if (event.target.checked) {
      this.sbus = true
    }
    else {
      this.sbus = false
    }
  }

  updateCheckedItems(item: any) {
    if (item.checked) {
      this.checkedItems.push(item);
    } else {
      const index = this.checkedItems.indexOf(item);
      if (index !== -1) {
        this.checkedItems.splice(index, 1);
      }
    }
  }


  exportTableToExcel(): void {
    const element = document.querySelector('.table'); // Selector for your table element
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = 'your_table_report.xlsx';

    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
  }


  /////////////////////////////////////////

  feetypetotalList: any[] = [];
  busFeetypetotalList: any[] = [];
  async searchReport(value) {
    const busFeetypetotal = await this.fCSvc.busDescriptionReport(value).toPromise();
    this.busFeetypetotalList = busFeetypetotal;

    const feetypetotal = await this.fCSvc.generalDescriptionReport(value).toPromise();
    this.feetypetotalList = feetypetotal;

    const feeList = await this.FtySvc.getfeesTypeList().toPromise();
    this.FeesList = feeList;
  }

  getfeetypCashAmount(value: any) {
    debugger;
    let newClass = [];
    let newAmount = [];
    let index: any;
    let getAmount: any;
    if (this.feetypetotalList.length != 0) {
      let newFeesList = this.feetypetotalList.filter((e) => { return e.payment_type == 'cash' });

      if (newFeesList.length != 0) {
        newClass = newFeesList[0].typeids.split(",").map(Number);
        newAmount = newFeesList[0].feetypetotal.split(",");

        if (newClass.length == newAmount.length) {
          index = newClass.indexOf(value);
          if (index >= 0) {
            getAmount = newAmount[index];
          }
          else {
            getAmount = 'NULL';
          }
        }
        return getAmount;
      }
      else { return 0 }

    }
    else { return 0; }
  }

  getfeetypUpiAmount(value: any) {
    let newClass = [];
    let newAmount = [];
    let index: any;
    let getAmount: any;
    if (this.feetypetotalList.length != 0) {
      let newFeesList = this.feetypetotalList.filter((e) => { return e.payment_type == 'cheque_upi' });
      if (newFeesList.length != 0) {
        newClass = newFeesList[0].typeids.split(",").map(Number);
        newAmount = newFeesList[0].feetypetotal.split(",");

        if (newClass.length == newAmount.length) {
          index = newClass.indexOf(value);
          if (index >= 0) {
            getAmount = newAmount[index];
          }
          else {
            getAmount = 'NULL';
          }
        }
        return getAmount;
      }
      else { return 0 }
    }
    else { return 0; }

  }


  getfeetypBusCashAmount() {
    debugger;
    let newFeesList = this.busFeetypetotalList.filter((e) => { return e.payment_type == 'cash' });
    if (newFeesList.length != 0) {
      return newFeesList[0].feetypetotal
    }
    else {
      return 0;
    }
  }

  getfeetypBusUpiAmount() {
    debugger;
    let newFeesList = this.busFeetypetotalList.filter((e) => { return e.payment_type == 'cheque_upi' });
    if (newFeesList.length != 0) {
      return newFeesList[0].feetypetotal
    }
    else {
      return 0;
    }
  }

  getfeetyCashAmountSum() {
    debugger
    let sum: any;
    let gensum: any;
    let busSum: any;

    let newClass = [];
    let newFeesList = this.feetypetotalList.filter((e) => { return e.payment_type == 'cash' });
    if (newFeesList.length != 0) {
      newClass = newFeesList[0].feetypetotal.split(",").map(Number);
      gensum = newClass.reduce((acc, val) => acc + parseInt(val), 0);
    }
    else {
      gensum = 0;
    }

    let newBusFeesList = this.busFeetypetotalList.filter((e) => { return e.payment_type == 'cash' });
    if (newBusFeesList.length != 0) {
      busSum = Number(newBusFeesList[0].feetypetotal)
    }
    else {
      busSum = 0;
    }
    return sum = gensum + busSum
  }

  getfeetyUpiAmountSum() {
    debugger
    let sum: any;
    let gensum: any;
    let busSum: any;

    let newClass = [];
    let newFeesList = this.feetypetotalList.filter((e) => { return e.payment_type == 'cheque_upi' })
    if (newFeesList.length != 0) {
      newClass = newFeesList[0].feetypetotal.split(",").map(Number);
      gensum = newClass.reduce((acc, val) => acc + parseInt(val), 0);
    }
    else {
      gensum = 0;
    }

    let newBusFeesList = this.busFeetypetotalList.filter((e) => { return e.payment_type == 'cheque_upi' });
    if (newBusFeesList.length != 0) {
      busSum = Number(newBusFeesList[0].feetypetotal)
    }
    else {
      busSum = 0;
    }
    sum = gensum + busSum

    return sum
  }

  exportDailyToExcel(): void {
    const element = document.getElementById('dail_collection_print'); // ID of the container holding your table
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = 'fees_collection_report.xlsx';

    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
  }
}
