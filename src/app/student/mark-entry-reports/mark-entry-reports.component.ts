import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { markEntryService } from 'src/app/api-service/markEntryGrade.service';
import { markEntryReportService } from 'src/app/api-service/markEntryReport.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-mark-entry-reports',
  templateUrl: './mark-entry-reports.component.html',
  styleUrls: ['./mark-entry-reports.component.scss']
})
export class MarkEntryReportsComponent implements OnInit {
  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  activeBatchYear: any = [];
  newgetbatch: string;
  StudentExamNameList: any[] = [];
  consolidatedMarkRankList: any[] = [];
  subjectList: any[] = [];
  classIncharge: string;
  studentClass: string;
  examName: string;
  overAllSubMarkList: any[] = [];
  table1: boolean = false;
  table2: boolean = false;
  table3: boolean = false;
  multiMarkList: any[] = [];
  multiMarkStudentList: any[] = [];
  multisubjectList: any[] = [];
  oclassName: string;
  sectionName: string;
  constructor(
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private batchSvc: BatechYearService,
    private meSvc: markEntryService,
    private mERSvc: markEntryReportService
  ) { }

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
      this.consolidatedMarkRankForm.get('batch_year')?.setValue(this.newgetbatch);
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
    this.consolidatedMarkRankForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.consolidatedMarkRankForm.get('groupid')?.setValue(0);
    this.consolidatedMarkRankForm.get('sectionid')?.setValue(null);
    if (this.groupFilterlist.length == 0) {
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.consolidatedMarkRankForm.get('sectionid')?.setValue(null);
    }
    else {
      this.consolidatedMarkRankForm.get('sectionid')?.setValue(null);
      this.sectionFilterlist = [];
    }
  }

  filterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.consolidatedMarkRankForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.consolidatedMarkRankForm.get('sectionid')?.setValue(null);
  }

  consolidatedMarkRankForm = new FormGroup({
    classid: new FormControl(null),
    groupid: new FormControl(0),
    sectionid: new FormControl(null),
    batch_year: new FormControl(''),
    exam_name: new FormControl('')
  });

  searchExamnameByClass() {
    let classID: number = (this.consolidatedMarkRankForm.value.classid);
    let groupID: number = (this.consolidatedMarkRankForm.value.groupid);
    let sectionID: number = (this.consolidatedMarkRankForm.value.sectionid);
    let batchYear: string = (this.consolidatedMarkRankForm.value.batch_year);

    this.meSvc.refresExamname(classID, groupID, sectionID, batchYear).subscribe(data => {
      this.StudentExamNameList = data;
    });
  }

  searchReport() {
    this.table1 = true;
    this.table2 = false;
    this.table3 = false;
    if (this.consolidatedMarkRankForm.valid) {
      let classID: number = (this.consolidatedMarkRankForm.value.classid);
      let groupID: number = (this.consolidatedMarkRankForm.value.groupid);
      let sectionID: number = (this.consolidatedMarkRankForm.value.sectionid);
      let batchYear: string = (this.consolidatedMarkRankForm.value.batch_year);
      let examName: string = (this.consolidatedMarkRankForm.value.exam_name);

      this.mERSvc.getconsolidatedMarkRank(classID, groupID, sectionID, batchYear, examName).subscribe(async data => {
        this.classIncharge = data[0].classincharge;
        this.studentClass = data[0].class_name + '-' + data[0].section_name;
        this.examName = data[0].exam_name
        this.subjectList = await data[0].subject_name.split(",");
        this.consolidatedMarkRankList = data;
      });
    }
    else {
      this.consolidatedMarkRankForm.markAllAsTouched();
    }
  }

  searchOverAllSubReport() {
    this.table1 = false;
    this.table2 = true;
    this.table3 = false;
    if (this.consolidatedMarkRankForm.valid) {
      let classID: number = (this.consolidatedMarkRankForm.value.classid);
      let groupID: number = (this.consolidatedMarkRankForm.value.groupid);
      let sectionID: number = (this.consolidatedMarkRankForm.value.sectionid);
      let batchYear: string = (this.consolidatedMarkRankForm.value.batch_year);
      let examName: string = (this.consolidatedMarkRankForm.value.exam_name);

      this.mERSvc.getOverAllSubMarkRank(classID, groupID, sectionID, batchYear, examName).subscribe(async data => {
        this.oclassName = data[0].class_name;
        this.sectionName = data[0].section_name;
        this.overAllSubMarkList = data;
      });
    }
    else {
      this.consolidatedMarkRankForm.markAllAsTouched();
    }
  }



  multiMarkReport() {
    this.table1 = false;
    this.table2 = false;
    this.table3 = true;

    if (this.consolidatedMarkRankForm.valid) {
      let classID: number = (this.consolidatedMarkRankForm.value.classid);
      let groupID: number = (this.consolidatedMarkRankForm.value.groupid);
      let sectionID: number = (this.consolidatedMarkRankForm.value.sectionid);
      let batchYear: string = (this.consolidatedMarkRankForm.value.batch_year);

      this.mERSvc.getMultiMarkRank(classID, groupID, sectionID, batchYear).subscribe(async data => {
        this.multisubjectList = await data.item1[0].subject_name.split(",");
        this.multiMarkList = await data.item2
        this.multiMarkStudentList = await data.item3
      });
    }
    else {
      this.consolidatedMarkRankForm.markAllAsTouched();
    }
  }

  getSubWiseMark(sub, j) {

    let newSub = [];
    let marks = [];
    let index: any;
    let getMark: any;

    newSub = this.multiMarkList[j].subject_name.split(",");
    marks = this.multiMarkList[j].marks.split(",");

    if (newSub.length == marks.length) {
      index = newSub.indexOf(sub);
      if (index >= 0) {
        getMark = marks[index];
      }
      else {
        getMark = '';
      }
    }
    return getMark;
  }

  getMark(sub, i) {
    debugger;
    let newSub = [];
    let marks = [];
    let index: any;
    let getMark: any;
    newSub = this.consolidatedMarkRankList[i].subject_name.split(",");
    marks = this.consolidatedMarkRankList[i].marks.split(",");

    if (newSub.length == marks.length) {
      index = newSub.indexOf(sub);
      if (index >= 0) {
        getMark = marks[index];
      }
      else {
        getMark = '';
      }
    }
    return getMark;
  }

  getstatus(i) {
    let marks = [];
    marks = this.consolidatedMarkRankList[i].marks.split(",");
    let count;
    count = marks.filter((e) => { return e == 'AB' || e == 'Ab' || e == 'ab' || e == '' }).length
    if (count) {
      return '-'
    }
    else {
      return this.consolidatedMarkRankList[i].status
    }
  }

  getSubMarkAvg(sub) {

    let totalMark = 0;
    this.consolidatedMarkRankList.forEach((e) => {

      let newSub = [];
      let marks = [];
      let index: any;
      let getMark: any;
      newSub = e.subject_name.split(",");
      marks = e.marks.split(",");
      if (newSub.length == marks.length) {
        index = newSub.indexOf(sub);
        if (index >= 0) {
          getMark = marks[index];
        }
        else {
          getMark = '0';
        }
      }
      let mark = parseFloat(getMark);
      if (isNaN(mark)) {
        getMark = 0;
      }
      totalMark = totalMark + Number(getMark);
    });

    return totalMark / this.consolidatedMarkRankList.length;
  }

  exportConsolidatedExcel(): void {
    const element = document.getElementById('consolidatedmarkrank_print');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = 'ConsolidatedMark.xlsx';

    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
  }

  getPer(total, pass) {
    return Number(pass) / Number(total) * 100
  }

  cancelClick() {
    this.consolidatedMarkRankForm.reset();
    this.sectionFilterlist = [];
    this.groupFilterlist = [];
    this.consolidatedMarkRankList = [];
    this.consolidatedMarkRankForm.get('groupid')?.setValue(0);
    this.consolidatedMarkRankForm.get('batch_year')?.setValue(this.newgetbatch);
    this.consolidatedMarkRankForm.get('exam_name')?.setValue('');
  }
}