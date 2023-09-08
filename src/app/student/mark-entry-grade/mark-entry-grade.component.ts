import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { MarkEntryGradeTypeModel, Subject, studentListModel, subjectListModel } from 'src/app/Model/MarkEntry.model';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { markEntryService } from 'src/app/api-service/markEntryGrade.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';

@Component({
  selector: 'app-mark-entry-grade',
  templateUrl: './mark-entry-grade.component.html',
  styleUrls: ['./mark-entry-grade.component.scss']
})
export class MarkEntryGradeComponent implements OnInit {
  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  groupDisplay: boolean = true;

  studentList: studentListModel[] = [];
  subjectList: any[] = [];
  spiltList: Subject[] = [];
  subjectFilterList: subjectListModel[] = [];


  constructor(
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private spinner: NgxSpinnerService,
    private notificationSvc: NotificationsService,
    private meSvc: markEntryService
  ) { }

  ngOnInit(): void {
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();

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
    this.rankTypeMarkForm.classid = classid;
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.rankTypeMarkForm.groupid = 0;
    this.rankTypeMarkForm.sectionid = 0;
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.rankTypeMarkForm.sectionid = 0;
    }
    else {
      this.groupDisplay = true;
      this.rankTypeMarkForm.sectionid = 0;
    }
  }

  filterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.rankTypeMarkForm.groupid = groupid;
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.rankTypeMarkForm.sectionid = 0;
  }

  studentListForm: studentListModel = {
    admission_no: '',
    student_name: '',
    total: 0,
    grade: '',
    status: '',
    average: 0,
    s_rank: 0,
    subjectList: [],
  }

  rankTypeMarkForm: MarkEntryGradeTypeModel = {
    entryid: 0,
    classid: 0,
    groupid: 0,
    sectionid: 0,
    date: '',
    exam_name: '',
    classincharge: '',
    studentList: [this.studentListForm],
    cuid: 0
  }

  searchStudentByClass() {
    debugger;
    this.spinner.show();
    let classid: number = (this.rankTypeMarkForm.classid);
    let groupid: number = (this.rankTypeMarkForm.groupid);
    let sectionid: number = (this.rankTypeMarkForm.sectionid);

    this.meSvc.searchStudentByClass(classid, groupid, sectionid).subscribe(data => {
      this.spinner.hide();
      this.studentList = data;
    });

    this.meSvc.searchSubjectByClass(classid, groupid, sectionid).subscribe(data => {
      debugger;
      this.subjectList = data;
      console.log('subject'+this.subjectList)
      this.spiltList = this.subjectList[0].subjectsname.split(",").map(function(item){
        return { name: item,mark:0,grade:'',s_status:'',selected: false };
      });
      console.log('spilt'+this.spiltList[0])
    });

  }

  onchange() {
    this.subjectFilterList = this.spiltList.filter(x => x.selected == true);
    console.log('filter'+this.subjectFilterList)
  }

  save() {
    console.log(this.rankTypeMarkForm)
  }

}
