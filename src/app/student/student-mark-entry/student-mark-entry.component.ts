import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { MarkEntryGradeTypeModel, Subject, studentListModel } from 'src/app/Model/MarkEntry.model';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { markEntryService } from 'src/app/api-service/markEntryGrade.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';

@Component({
  selector: 'app-student-mark-entry',
  templateUrl: './student-mark-entry.component.html',
  styleUrls: ['./student-mark-entry.component.scss']
})
export class StudentMarkEntryComponent implements OnInit {
  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  groupDisplay: boolean = true;

  studentList: any[] = [];
  subjectList: any[] = [];
  spiltList: Subject[] = [];
  subjectFilterList: any[] = [];


  constructor(
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private spinner: NgxSpinnerService,
    private notificationSvc: NotificationsService,
    private meSvc: markEntryService
  ) { this.createForm(); }

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
    this.rankTypeMarkForm.get('classid')?.setValue(classid);
    // this.rankTypeMarkForm.classid = classid;
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.rankTypeMarkForm.get('groupid')?.setValue(0);
    //this.rankTypeMarkForm.groupid = 0;
    //this.rankTypeMarkForm.sectionid = 0;
    this.rankTypeMarkForm.get('sectionid')?.setValue(0);
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.rankTypeMarkForm.get('sectionid')?.setValue(0);
      //this.rankTypeMarkForm.sectionid = 0;
    }
    else {
      this.groupDisplay = true;
      this.rankTypeMarkForm.get('sectionid')?.setValue(0);
      //this.rankTypeMarkForm.sectionid = 0;
    }
  }

  filterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.rankTypeMarkForm.get('groupid')?.setValue(groupid);
    //this.rankTypeMarkForm.groupid = groupid;
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.rankTypeMarkForm.get('sectionid')?.setValue(0);
    //this.rankTypeMarkForm.sectionid = 0;
  }
  rankTypeMarkForm: FormGroup;
  createForm() {
    this.rankTypeMarkForm = new FormGroup({
      entryid: new FormControl(0),
      classid: new FormControl(0),
      groupid: new FormControl(0),
      sectionid: new FormControl(0),
      date: new FormControl(),
      exam_name: new FormControl(''),
      classincharge: new FormControl(''),
      with_prac: new FormControl(0),
      with_out_prac: new FormControl(0),
      studentList: new FormArray([
        this.getStudentFields()
      ]),
    })
  }

  getStudentFields():FormGroup{
    return  new FormGroup({
      admission_no: new FormControl(),
      student_name: new FormControl(),
      total: new FormControl(),
      grade: new FormControl(''),
      status: new FormControl(''),
      average: new FormControl(''),
      s_rank: new FormControl(''),
      subjectList: new FormGroup({
        subjectArray:new FormArray([
          this. putNewSubject()
        ])
      }
      ),
    })
  }

  getControls() {
    return this.rankTypeMarkForm.get('studentList') as FormArray;
  }

  subjectsFormGroup(i){
    return this.getControls().at(i).get('subjectList') as FormArray;
  }

  subjectsArray(i){
    return this.subjectsFormGroup(i).get('subjectArray') as FormArray;
  }
  putNewSubject(){
    return  new FormGroup({
      name: new FormControl('element.name'),
      mark: new FormControl(0),
    })
  }

  addNewSubjetc(i){
this.subjectsArray(i).push(this.putNewSubject());
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

  // rankTypeMarkForm: MarkEntryGradeTypeModel = {
  //   entryid: 0,
  //   classid: 0,
  //   groupid: 0,
  //   sectionid: 0,
  //   date: '',
  //   exam_name: '',
  //   classincharge: '',
  //   studentList: [{

  //   }],
  //   cuid: 0
  // };

  // rankTypeMarkForm: MarkEntryGradeTypeModel ={
  //   entryid: 0,
  //   classid: 0,
  //   groupid: 0,
  //   sectionid: 0,
  //   date: '',
  //   exam_name: '',
  //   classincharge: '',
  //   studentList: [this.studentListForm],
  //   cuid: 0
  // }

  searchStudentByClass() {
    
    this.spinner.show();
    // let classid: number = (this.rankTypeMarkForm.classid);
    // let groupid: number = (this.rankTypeMarkForm.groupid);
    // let sectionid: number = (this.rankTypeMarkForm.sectionid);
    let classid: number = (this.rankTypeMarkForm.value.classid);
    let groupid: number = (this.rankTypeMarkForm.value.groupid);
    let sectionid: number = (this.rankTypeMarkForm.value.sectionid);

    this.meSvc.searchStudentByClass(classid, groupid, sectionid).subscribe(data => {
      this.spinner.hide();
      this.studentList = data;

      this.studentList.forEach(element => {
       
        this.getControls().push(
          new FormGroup({
            admission_no: new FormControl(element.admission_no),
            student_name: new FormControl(element.student_name),
            total: new FormControl(),
            grade: new FormControl(''),
            status: new FormControl(''),
            average: new FormControl(''),
            s_rank: new FormControl(''),
            subjectList: new FormGroup({
              subjectArray:new FormArray([
                this. putNewSubject()
              ])
            }
            ),
          })
        )
      });
    });

    this.meSvc.searchSubjectByClass(classid, groupid, sectionid).subscribe(data => {
      
      this.subjectList = data;
      this.spiltList = this.subjectList[0].subjectsname.split(",").map(function (item) {
        return { name: item, selected: false };
      });;
      console.log('spilt'+this.spiltList)
    });

  }




  onchange() {
    console.log(this.spiltList)
    this.subjectFilterList = this.spiltList.filter(x => x.selected == true)

    // this.subjectFilterList.forEach(element => {
    //   this.subjectsArray(1).push(
    //     new FormGroup({
    //       name: new FormControl(element.name),
    //       mark: new FormControl(0),
    //     })
    //   );
    // });
  }

  save() {
    console.log(this.rankTypeMarkForm)
  }

}