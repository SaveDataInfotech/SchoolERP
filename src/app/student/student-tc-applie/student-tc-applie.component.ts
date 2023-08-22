import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { studentTcLeftService } from 'src/app/api-service/studentTcLeft.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-tc-applie',
  templateUrl: './student-tc-applie.component.html',
  styleUrls: ['./student-tc-applie.component.scss']
})
export class StudentTcApplieComponent implements OnInit {

  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  BatchList: any = [];
  studentList: any = [];
  groupDisplay: boolean = true;
  studentNameFilterlist: any = [];
  studentListByAd: any = [];
  filterstudentList: any = [];
  serachDisabledone:boolean = false;

  constructor(private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private spinner: NgxSpinnerService,
    private notificationSvc: NotificationsService,
    private batchSvc: BatechYearService,
    private tcSvc: studentTcLeftService,
    private router: Router) { this.createForm(); }

  date1 = new Date();

  currentYear = this.date1.getUTCFullYear();

  currentMonth = this.date1.getUTCMonth() + 1;

  currentDate = this.date1.getUTCDate();

  today = "2023-12-12";

  finalMonth: any;
  finalDay: any;

  ngOnInit(): void {

    if (this.currentMonth < 10) {
      this.finalMonth = "0" + this.currentMonth;
    }
    else {
      this.finalMonth = this.currentMonth;
    }

    if (this.currentDate < 10) {
      this.finalDay = "0" + this.currentDate;
    }
    else {
      this.finalDay = this.currentDate;
    }

    this.today = this.currentYear + "-" + this.finalMonth + "-" + this.finalDay;



    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.refreshBatchYearList();

    this.CancelClickInTc();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard');
  }

  refreshBatchYearList() {
    this.batchSvc.getBatchYearList().subscribe(data => {
      this.BatchList = data;
    });
  }

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
    this.studentTcApplyForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.studentTcApplyForm.get('groupid')?.setValue(0);
    this.studentTcApplyForm.get('sectionid')?.setValue(0);
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.studentTcApplyForm.get('sectionid')?.setValue(0);
    }
    else {
      this.groupDisplay = true;
      this.studentTcApplyForm.get('sectionid')?.setValue(0);
    }
  }

  filterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.studentTcApplyForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.studentTcApplyForm.get('sectionid')?.setValue(0);
  }


  /////////////

  studentTcApplyForm: FormGroup;

  createForm() {
    this.studentTcApplyForm = new FormGroup({
      tcleftid: new FormControl(0),
      classid: new FormControl(0),
      groupid: new FormControl(0),
      sectionid: new FormControl(0),
      batch_year: new FormControl(0),
      leftdetails: new FormArray([
        new FormGroup({
          admission_no: new FormControl(''),
          student_name: new FormControl(''),
          s_left: new FormControl('No'),
          leftdate: new FormControl(''),
          longabsent: new FormControl('No'),
          longabsentdate: new FormControl(''),
          tc: new FormControl('No'),
          tcno: new FormControl(''),
          tcdate: new FormControl(''),
          remarks: new FormControl('')
        })
      ]),
      cuid: new FormControl(1),
    })
  }

  searchStudentByClass() {
    debugger;
    this.spinner.show();
    let classid: number = (this.studentTcApplyForm.value.classid);
    let groupid: number = (this.studentTcApplyForm.value.groupid);
    let sectionid: number = (this.studentTcApplyForm.value.sectionid);
    let batch_year: any = (this.studentTcApplyForm.value.batch_year);

    this.tcSvc.searchStudentByClass(classid, groupid, sectionid, batch_year).subscribe(data => {
      debugger;
      this.spinner.hide();
      this.studentList = data;

    });
    //this.spinner.hide();
  }

  getControls() {
    return (this.studentTcApplyForm.get('leftdetails') as FormArray).controls;
  }

  addleave() {
    debugger;
    const control = <FormArray>this.studentTcApplyForm.controls['leftdetails'];
    control.push(
      new FormGroup({
        admission_no: new FormControl(''),
        student_name: new FormControl(''),
        s_left: new FormControl(''),
        leftdate: new FormControl(''),
        longabsent: new FormControl(''),
        longabsentdate: new FormControl(''),
        tc: new FormControl(''),
        tcno: new FormControl(''),
        tcdate: new FormControl(''),
        remarks: new FormControl('')
      })
    )
  }

  removeLeave(index: any) {
    const control = <FormArray>this.studentTcApplyForm.controls['leftdetails'];
    control.removeAt(index);
  }

  newTcApplyAll() {
    debugger;
    let studentdetails = this.studentTcApplyForm.value
    this.tcSvc.TcApplyAll(studentdetails).subscribe(res => {
      if (res.status == 'Saved successfully') {
        this.notificationSvc.success("Saved Success")
        this.CancelClickInAll();
      }
      else {
        alert()
        this.CancelClickInAll();
      }
    })
  }

  profileCard(id: any) {
    this.filterstudentList = this.studentList.filter((e: any) => { return e.admission_no == id });
  }

  CancelClickInAll() {
    this.studentTcApplyForm.reset();
    this.filterstudentList = null;
  }

  ////////////////

  oneStudentTcLeftForm = new FormGroup({
    tcleftid: new FormControl(0),
    admission_no: new FormControl(''),
    type: new FormControl(''),
    tcno: new FormControl(''),
    date: new FormControl(''),
    remarks: new FormControl(''),
    cuid: new FormControl(1),
  })

  searchStudentByAdNo() {
    this.spinner.show();
    let admission_no = (this.oneStudentTcLeftForm.value.admission_no);
    this.tcSvc.searchStudentByAdNo(admission_no).subscribe(data => {
      this.studentListByAd = data;
      this.spinner.hide();
      if (this.studentListByAd.length == 0) {
        this.notificationSvc.error("Invalid Admission Number");        
      }
      else{       
        this.serachDisabledone = true;
      }
    });
  }

  newTcApply() {
    let studentdetails = this.oneStudentTcLeftForm.value
    this.tcSvc.TcApply(studentdetails).subscribe(res => {
      if (res.status == 'Saved successfully') {
        this.notificationSvc.success("Saved Success")
        this.CancelClickInTc();
      }
      else {
        alert()
      }
    })
  }

  CancelClickInTc() {
    this.oneStudentTcLeftForm.reset();
    this.studentListByAd = null;
    this.serachDisabledone = false;
    this.oneStudentTcLeftForm.get('tcleftid')?.setValue(0);
    this.oneStudentTcLeftForm.get('admission_no')?.setValue('');
    this.oneStudentTcLeftForm.get('type')?.setValue('');
    this.oneStudentTcLeftForm.get('tcno')?.setValue('');
    this.oneStudentTcLeftForm.get('date')?.setValue(this.today);
    this.oneStudentTcLeftForm.get('remarks')?.setValue('');
    this.oneStudentTcLeftForm.get('cuid')?.setValue(1);

    //this.studentTcApplyForm.get('leftdetails').setValue('');
  }
}