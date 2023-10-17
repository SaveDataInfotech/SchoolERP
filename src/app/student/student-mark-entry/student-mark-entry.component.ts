import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { MarkEntryGradeTypeModel, Subject, studentListModel } from 'src/app/Model/MarkEntry.model';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { markEntryService } from 'src/app/api-service/markEntryGrade.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { subjectService } from 'src/app/api-service/subject.service';

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
  sub: any;
  subjectDetailList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private spinner: NgxSpinnerService,
    private notificationSvc: NotificationsService,
    private meSvc: markEntryService,
    private subjectSvc: subjectService,
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
    this.refreshsubjectList();
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

  refreshsubjectList() {
    this.subjectSvc.getsubjectList().subscribe(data => {
      this.subjectDetailList = data;
    });
  }

  filterGroupfun(classsid: any) {
    const classid = Number(classsid);
    this.rankTypeMarkForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.rankTypeMarkForm.get('groupid')?.setValue(0);
    this.rankTypeMarkForm.get('sectionid')?.setValue(0);
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.rankTypeMarkForm.get('sectionid')?.setValue(0);
    }
    else {
      this.groupDisplay = true;
      this.rankTypeMarkForm.get('sectionid')?.setValue(0);
    }
  }

  filterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.rankTypeMarkForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.rankTypeMarkForm.get('sectionid')?.setValue(0);
  }

  searchStudentByClass() {
    this.spinner.show();
    let classid: number = (this.rankTypeMarkForm.value.classid);
    let groupid: number = (this.rankTypeMarkForm.value.groupid);
    let sectionid: number = (this.rankTypeMarkForm.value.sectionid);

    this.meSvc.searchStudentByClass(classid, groupid, sectionid).subscribe(data => {
      this.spinner.hide();
      this.studentList = data;
    });

    this.meSvc.searchSubjectByClass(classid, groupid, sectionid).subscribe(data => {
      this.subjectList = data;
      this.spiltList = this.subjectList[0].subjectsname.split(",").map(function (item) {
        return { name: item, selected: false };
      });;
    });

  }

  onchange() {
    debugger;
    const newarray = this.spiltList.filter((e) => { return e.selected == true });
    this.subjectFilterList = newarray;
    this.subjectFilterList.forEach((e) => {
      this.subjectDetailList.forEach((y) => {
        if (e.name == y.subject_name) {
          e['practical_status'] = y.practical_status
        }
      })
    })
    const control2 = <FormArray>this.rankTypeMarkForm.controls['students'];
    while (control2.length !== 0) {
      control2.removeAt(0)
    }

    this.studentList.forEach(e => {
      e['subjects'] = this.subjectFilterList;
      e['total'] = '0';
      e['status'] = '';
      e['avg'] = '';
      e['rank'] = '';
    });

    this.studentList.forEach(student => {
      this.addStudent(student);
    });
  }

  save() {
    if (this.rankTypeMarkForm.valid) {
      console.log(this.rankTypeMarkForm.value);
    } else {
      console.log(this.rankTypeMarkForm.value);
    }
  }

  rankTypeMarkForm: FormGroup;
  createForm() {
    this.rankTypeMarkForm = this.fb.group({
      entryid: new FormControl(0),
      classid: new FormControl(0),
      groupid: new FormControl(0),
      sectionid: new FormControl(0),
      date: new FormControl(),
      exam_name: new FormControl(''),
      classincharge: new FormControl(''),
      with_prac: new FormControl(''),
      with_out_prac: new FormControl(''),
      students: this.fb.array([])
    });
  }

  createStudentFormGroup(student?: any): FormGroup {
    student = student || { admission_no: '', subjects: [] };
    return this.fb.group({
      admission_no: [student.admission_no, Validators.required],
      total: [student.total, Validators.required],
      status: [student.status, Validators.required],
      avg: [student.avg, Validators.required],
      rank: [student.rank, Validators.required],
      subjects: this.fb.array(student.subjects.map(subject => this.createSubjectFormGroup(subject)))
    });
  }

  getControls() {
    return (this.rankTypeMarkForm.get('students') as FormArray).controls;
  }

  createSubjectFormGroup(subject?): FormGroup {
    debugger;
    const subjectn = subject.name;
    const select = subject.selected;
    const prac = subject.practical_status;
    return this.fb.group({
      name: [subjectn, Validators.required],
      selected: [select, Validators.required],
      practical_status: [prac, Validators.required],
      marks: ['', Validators.required],
      grade: ['', Validators.required],
      pass_status: ['', Validators.required]
    });
  }

  addStudent(student?: any) {
    const students = this.rankTypeMarkForm.get('students') as FormArray;
    students.push(this.createStudentFormGroup(student));
  }

  addSubject(studentFormGroup: FormGroup) {
    const subjects = studentFormGroup.get('subjects') as FormArray;
    subjects.push(this.createSubjectFormGroup());
  }

  total: number = 0;

  gradeConvert(i, j) {
    debugger;
    this.total = 0;
    const studentsArray = this.rankTypeMarkForm.get('students') as FormArray;
    if (i >= 0 && i < studentsArray.length) {
      const studentFormGroup = studentsArray.at(i) as FormGroup;
      const subjectsArray = studentFormGroup.get('subjects') as FormArray;

      if (j >= 0 && j < subjectsArray.length) {
        const subjectFormGroup = subjectsArray.at(j) as FormGroup;
        if (Number(subjectFormGroup.get('marks').value) <= 100) {
          if (Number(subjectFormGroup.get('marks').value) > 80) {
            subjectFormGroup.get('grade').setValue('A+');
          }
          else if (Number(subjectFormGroup.get('marks').value) > 50) {
            subjectFormGroup.get('grade').setValue('B+');
          }
          else {
            subjectFormGroup.get('grade').setValue('D');
          }
        }
        else {
          subjectFormGroup.get('marks').setValue('');
        }
      }

      const subjectFormGroup = subjectsArray.at(j) as FormGroup;
      if (subjectFormGroup.get('practical_status').value == 'Practical Subject') {
        if (Number(subjectFormGroup.get('marks').value) >= Number(this.rankTypeMarkForm.value.with_prac)) {
          subjectFormGroup.get('pass_status').setValue('Pass');
        }
        else {
          subjectFormGroup.get('pass_status').setValue('Fail');
          const courseControl = this.rankTypeMarkForm.get('students') as FormArray;
          courseControl.at(i).get('rank').setValue('');
        }
      }

      else {
        if (Number(subjectFormGroup.get('marks').value) >= Number(this.rankTypeMarkForm.value.with_out_prac)) {
          subjectFormGroup.get('pass_status').setValue('Pass');
        }
        else {
          subjectFormGroup.get('pass_status').setValue('Fail');
          const courseControl = this.rankTypeMarkForm.get('students') as FormArray;
          courseControl.at(i).get('rank').setValue('');
        }
      }
    }

    debugger;
    const courseControl = this.rankTypeMarkForm.get('students') as FormArray;
    const course = courseControl.at(i).get('subjects').value;
    course.forEach(element => {
      this.total = this.total + Number(element.marks)
    });
    courseControl.at(i).get('total').setValue(String(this.total));

    courseControl.at(i).get('avg').setValue(String((this.total) / course.length));

    const allPassed = course.every(element => element.pass_status === "Pass");
    if (allPassed) {
      courseControl.at(i).get('status').setValue('Pass');
    } else {
      courseControl.at(i).get('status').setValue('Fail');
    }

    const orderBYMark = studentsArray.controls.map(control => control.value);
    const passorderBYMark = orderBYMark.filter((r) => { return r.status == 'Pass' });
    const Student = studentsArray.controls.map(control => control.value);    
    passorderBYMark.sort((a, b) => parseInt(b.total) - parseInt(a.total));

    Student.forEach((stu, m) => {
      debugger;
      passorderBYMark.forEach((element, k) => {
        debugger;
        if (stu.admission_no == element.admission_no) {
          debugger
          courseControl.at(m).get('rank').setValue(Number(k + 1));
        }
      });
    });
  }
}