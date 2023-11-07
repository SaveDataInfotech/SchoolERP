import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { studentPromoteService } from 'src/app/api-service/studentPromote.service';

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
  progroupFilterlist: any = [];
  prosectionFilterlist: any = [];
  progroupDisplay: boolean = true;
  constructor(private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private batchSvc: BatechYearService,
    private promoSvc: studentPromoteService,
    private notificationSvc: NotificationsService,
    private router: Router,
    private DialogSvc: DialogService) { }


  ngOnInit(): void {
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.refreshBatchYearList();
  }
  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
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
      debugger;
      this.SectionList = data;
    });
  }

  filterGroupfun(classsid: any) {
    const classid = Number(classsid);
    this.searchStudentForm.classid = classid;
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.searchStudentForm.groupid = 0;
    this.searchStudentForm.sectionid = 0;
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.searchStudentForm.sectionid = 0;
    }
    else {
      this.groupDisplay = true;
      this.searchStudentForm.sectionid = 0;

    }
  }

  filterSectionfun(groupID: any) {
    debugger;
    const groupid = Number(groupID);
    this.searchStudentForm.groupid = groupid;
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.searchStudentForm.sectionid = 0;
  }

  searchStudentForm = {
    classid: 0,
    groupid: 0,
    sectionid: 0,
    batch_year: ''
  };

  searchStudent() {
    const classid = this.searchStudentForm.classid;
    const groupid = this.searchStudentForm.groupid;
    const sectionid = this.searchStudentForm.sectionid;
    const Batch = this.searchStudentForm.batch_year;
    if (classid != 0 && sectionid != 0 && Batch != '' && Batch != null) {
      this.promoSvc.searchStudentbypromote(classid, groupid, sectionid, Batch).subscribe(data => {
        this.StudentList = data;
      });
    }
    else {
      this.notificationSvc.error('Fill in the mandatory fields');
    }
  }
  //////////////////
  profilterGroupfun(classsid: any) {
    const classid = Number(classsid);
    this.studentPromoteForm.classid = classid;
    this.progroupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.studentPromoteForm.groupid = 0;
    this.studentPromoteForm.sectionid = null;
    if (this.progroupFilterlist.length == 0) {
      this.progroupDisplay = false;
      this.prosectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.studentPromoteForm.sectionid = null;
    }
    else {
      this.progroupDisplay = true;
      this.studentPromoteForm.sectionid = null;
      this.prosectionFilterlist = [];
    }
  }

  profilterSectionfun(groupID: any) {
    debugger;
    const groupid = Number(groupID);
    this.studentPromoteForm.groupid = groupid;
    this.prosectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.studentPromoteForm.sectionid = null;
  }

  studentPromoteForm = {
    batch_year: null,
    classid: null,
    groupid: 0,
    sectionid: null,
    date: '',
    cuid: 1
  }

  save(data) {
    const filterlist = data.filter((e) => { return e.isselected == true });
    if (filterlist.length != 0) {
      this.DialogSvc.openConfirmDialog('Are you sure want to promote ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            debugger;
            const batch_year = this.studentPromoteForm.batch_year;
            const classid = this.studentPromoteForm.classid;
            const groupid = this.studentPromoteForm.groupid;
            const setionid = this.studentPromoteForm.sectionid;
            const date = this.studentPromoteForm.date;
            const cuid = this.studentPromoteForm.cuid;

            this.promoSvc.newStudent(filterlist, batch_year, classid, groupid, setionid, cuid, date).subscribe(res => {
              debugger;
              if (res.status == 'Saved successfully') {
                const classid = this.searchStudentForm.classid;
                const groupid = this.searchStudentForm.groupid;
                const sectionid = this.searchStudentForm.sectionid;
                const Batch = this.searchStudentForm.batch_year;
                if (classid != 0 && sectionid != 0 && Batch != '' && Batch != null) {
                  this.promoSvc.searchStudentbypromote(classid, groupid, sectionid, Batch).subscribe(data => {
                    this.StudentList = data;
                  });
                }
                this.notificationSvc.success('Saved Successfully');
                this.cancelClick();
              }
              else if (res.status == "No fees") {
                this.notificationSvc.error('fees details not there for these students');
                const classid = this.searchStudentForm.classid;
                const groupid = this.searchStudentForm.groupid;
                const sectionid = this.searchStudentForm.sectionid;
                const Batch = this.searchStudentForm.batch_year;
                if (classid != 0 && sectionid != 0 && Batch != '' && Batch != null) {
                  this.promoSvc.searchStudentbypromote(classid, groupid, sectionid, Batch).subscribe(data => {
                    this.StudentList = data;
                  });
                }
              }
              
              else {
                this.notificationSvc.error('Something Error');
              }
            });
          }
        });
    }
    else {
      this.notificationSvc.error("Please select atlest one student");
    }
  }

  cancelClick() {
    this.searchStudentForm.classid = 0;
    this.searchStudentForm.groupid = 0;
    this.searchStudentForm.sectionid = 0;
    this.searchStudentForm.batch_year = '';
    this.studentPromoteForm.batch_year = null;
    this.studentPromoteForm.classid = null;
    this.studentPromoteForm.groupid = 0;
    this.studentPromoteForm.sectionid = null;
    this.studentPromoteForm.date = '';
    this.StudentList = [];
  }

}
