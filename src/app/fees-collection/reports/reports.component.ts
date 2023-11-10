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
  constructor(private FtySvc: FeesTypeService,
    private batchSvc: BatechYearService,
    private fCSvc: FeesCollectionReportsService,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private spinner: NgxSpinnerService,
    private notificationSvc: NotificationsService,) { }

  ngOnInit() {
    this.refreshFeesTypeList();
    this.GetActiveBatchYear();
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
  }

  refreshFeesTypeList() {
    this.FtySvc.getfeesTypeList().subscribe(data => {
      this.FeesList = data;
    });
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
    debugger;
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
    debugger;
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
    debugger;
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
}
