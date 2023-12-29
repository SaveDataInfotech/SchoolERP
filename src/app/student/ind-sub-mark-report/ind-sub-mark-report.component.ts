import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { markEntryReportService } from 'src/app/api-service/markEntryReport.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';

@Component({
  selector: 'app-ind-sub-mark-report',
  templateUrl: './ind-sub-mark-report.component.html',
  styleUrls: ['./ind-sub-mark-report.component.scss']
})
export class IndSubMarkReportComponent implements OnInit {
  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  activeBatchYear: any = [];
  newgetbatch: string;
  StudentList: any[] = [];
  className: string;
  sectionName: string;
  constructor(private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private batchSvc: BatechYearService,
    private mERSvc: markEntryReportService) { }

  ngOnInit(): void {
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.GetActiveBatchYear();
  }

  GetActiveBatchYear() {
    this.batchSvc.GetActiveBatchYear().subscribe(data => {
      this.activeBatchYear = data;
      const getbatch = JSON.stringify(this.activeBatchYear[0].batch_year)
      this.newgetbatch = (getbatch.replace(/['"]+/g, ''));
      this.individualSubjectForm.get('batch_year')?.setValue(this.newgetbatch);
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
    const classid = Number(classsid);
    this.individualSubjectForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.individualSubjectForm.get('groupid')?.setValue(0);
    this.individualSubjectForm.get('sectionid')?.setValue(null);
    if (this.groupFilterlist.length == 0) {
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.individualSubjectForm.get('sectionid')?.setValue(null);
    }
    else {
      this.individualSubjectForm.get('sectionid')?.setValue(null);
      this.sectionFilterlist = [];
    }
  }

  filterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.individualSubjectForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.individualSubjectForm.get('sectionid')?.setValue(null);
  }


  individualSubjectForm = new FormGroup({
    classid: new FormControl(null),
    groupid: new FormControl(0),
    sectionid: new FormControl(null),
    batch_year: new FormControl('')
  });


  searchStudent() {
    const classId = this.individualSubjectForm.value.classid
    const SectionID = this.individualSubjectForm.value.groupid
    const groupId = this.individualSubjectForm.value.sectionid
    const batchYear = this.individualSubjectForm.value.batch_year
    if (this.individualSubjectForm.valid) {
      this.mERSvc.getIndividualSubjectMarkRank(classId, SectionID, groupId, batchYear).subscribe(async data => {
        this.className = data[0].class_name;
        this.sectionName = data[0].section_name
        this.StudentList = data;
      });
    }
    else {
      this.individualSubjectForm.markAllAsTouched();
    }
  }

  cancelClick() {
    this.individualSubjectForm.reset();
    this.individualSubjectForm.get('groupid')?.setValue(0);
    this.individualSubjectForm.get('batch_year')?.setValue(this.newgetbatch);
    this.StudentList = [];
    this.className = '';
    this.sectionName = '';
  }
}
