import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { studentPromoteService } from 'src/app/api-service/studentPromote.service';
import { studentTcLeftService } from 'src/app/api-service/studentTcLeft.service';

@Component({
  selector: 'app-student-promote',
  templateUrl: './student-promote.component.html',
  styleUrls: ['./student-promote.component.scss']
})
export class StudentPromoteComponent implements OnInit {

  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  BatchList: any = [];
  groupDisplay: boolean = false;
  StudentList: any[] = [];
  constructor(private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private batchSvc: BatechYearService,    
    private promoSvc: studentPromoteService,
    private notificationSvc: NotificationsService,) { }


  ngOnInit(): void {
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.refreshBatchYearList();
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
    this.studentPromoteForm.classid = classid;
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.studentPromoteForm.groupid = 0;
    this.studentPromoteForm.sectionid = 0;
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.studentPromoteForm.sectionid = 0;
    }
    else {
      this.groupDisplay = true;
      this.studentPromoteForm.sectionid = 0;
    }
  }

  filterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.studentPromoteForm.groupid = groupid;
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.studentPromoteForm.sectionid = 0;
  }

  studentPromoteForm = {
    classid: 0,
    groupid: 0,
    sectionid: 0,
    date: '',
    cuid: 1
  };

  searchStudent() {
    const classid = this.studentPromoteForm.classid;
    const groupid = this.studentPromoteForm.groupid;
    const sectionid = this.studentPromoteForm.sectionid;

    this.promoSvc.searchStudentbypromote(classid, groupid, sectionid).subscribe(data => {
      this.StudentList = data;
    });
  }

  save(data) {
    debugger
    const filterlist = data.filter((e) => { return e.isselected == true });

    this.promoSvc.newStudent(filterlist).subscribe(res => {
      if (res.status == 'Insert Success') {
        debugger;
        this.notificationSvc.success('Saved Successfully');       
      }
      else {
        this.notificationSvc.error('Something Error');
      }
    });
  }

}
