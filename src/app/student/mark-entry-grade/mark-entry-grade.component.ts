import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { markEntryService } from 'src/app/api-service/markEntryGrade.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { subjectService } from 'src/app/api-service/subject.service';


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
  //groupDisplay: boolean = true;

  studentList: any[] = [];
  subjectList: any[] = [];
  spiltList: any = [];
  subjectFilterList: any[] = [];
  //sub: any;
  subjectDetailList: any[] = [];
  activeBatchYear: any = [];
  newgetbatch: string;

  StudentList: any[] = [];
  examNameList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private meSvc: markEntryService,
    private subjectSvc: subjectService,
    private router: Router,
    private batchSvc: BatechYearService,
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
    this.GetActiveBatchYear();
    //this.refreshStudentList();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  //// Number Only Event
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  passMarkValidationW(mark) {
    debugger;
    if (Number(mark) > 100) {
      this.rankTypeMarkForm.get('with_prac')?.setValue('');
    }
  }

  passMarkValidation(mark) {
    debugger;
    if (Number(mark) > 100) {
      this.rankTypeMarkForm.get('with_out_prac')?.setValue('');
    }
  }


  GetActiveBatchYear() {
    this.batchSvc.GetActiveBatchYear().subscribe(data => {
      this.activeBatchYear = data;
      const getbatch = JSON.stringify(this.activeBatchYear[0].batch_year)
      this.newgetbatch = (getbatch.replace(/['"]+/g, ''));
      this.rankTypeMarkForm.get('batch_year')?.setValue(this.newgetbatch);
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

  refreshsubjectList() {
    this.subjectSvc.getsubjectList().subscribe(data => {
      this.subjectDetailList = data;
    });
  }

  filterGroupfun(classsid: any) {
    debugger;
    const classid = Number(classsid);
    this.rankTypeMarkForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.rankTypeMarkForm.get('groupid')?.setValue(0);
    this.rankTypeMarkForm.get('sectionid')?.setValue(null);
    if (this.groupFilterlist.length == 0) {
      //this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.rankTypeMarkForm.get('sectionid')?.setValue(null);
    }
    else {
      // this.groupDisplay = true;
      this.rankTypeMarkForm.get('sectionid')?.setValue(null);
      this.sectionFilterlist = [];
    }
  }

  filterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.rankTypeMarkForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.rankTypeMarkForm.get('sectionid')?.setValue(null);
  }

  searchStudentByClass() {
    debugger;
    let classid: number = (this.rankTypeMarkForm.value.classid);
    let groupid: number = (this.rankTypeMarkForm.value.groupid);
    let sectionid: number = (this.rankTypeMarkForm.value.sectionid);

    this.meSvc.searchSubjectByClass(classid, groupid, sectionid).subscribe(data => {
      debugger;
      this.subjectList = data;
      if (this.subjectList.length != 0) {
        this.spiltList = this.subjectList[0].subjectsname.split(",").map(function (item) {
          return { subject_name: item, selected: false };
        });
      }
      else {
        this.notificationSvc.error('No subject has been assigned to this class');
      }
    });
  }

  async onchange() {
    debugger;
    const examName = this.rankTypeMarkForm.value.exam_name;
    const examClass = this.rankTypeMarkForm.value.classid;
    const examGroup = this.rankTypeMarkForm.value.groupid;
    const examSection = this.rankTypeMarkForm.value.sectionid;
    const examBatchYear = this.rankTypeMarkForm.value.batch_year;
    if (this.rankTypeMarkForm.valid) {
      const student = await this.meSvc.searchStudentByClass(examClass, examGroup, examSection, examBatchYear).toPromise();
      this.studentList = student;

      const examNameList = await this.meSvc.refresExamnameGradeList(examClass, examGroup, examSection, examBatchYear, examName).toPromise();
      this.examNameList = examNameList;

      debugger;
      if (this.examNameList.length == 0) {
        const newarray = this.spiltList.filter((e) => { return e.selected == true });
        this.subjectFilterList = newarray;
        if (this.subjectFilterList.length != 0) {
          this.subjectFilterList.forEach((e) => {
            this.subjectDetailList.forEach((y) => {
              if (e.subject_name == y.subject_name) {
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
            e['average'] = '';
            e['rank'] = '';
          });

          this.studentList.forEach(student => {
            this.addStudent(student);
          });
        }
        else {
          this.notificationSvc.error('Select at least one subject');
        }

      }
      else {
        this.notificationSvc.error('Exam name Alredy used,use different name');
      }
    }
    else {
      this.rankTypeMarkForm.markAllAsTouched();
      this.notificationSvc.error('Enter mandatory fields');
    }
  }

  rankTypeMarkForm: FormGroup;
  createForm() {
    this.rankTypeMarkForm = this.fb.group({
      entryid: new FormControl(0),
      classid: new FormControl(null),
      groupid: new FormControl(0),
      sectionid: new FormControl(null),
      batch_year: new FormControl(''),
      date: new FormControl(''),
      exam_name: new FormControl(''),
      classincharge: new FormControl(''),
      with_prac: new FormControl(''),
      with_out_prac: new FormControl(''),
      students: this.fb.array([]),
      cuid: new FormControl(1)
    });
  }

  createStudentFormGroup(student?: any): FormGroup {
    student = student || { admission_no: '', subjects: [] };
    return this.fb.group({
      admission_no: [student.admission_no],
      student_name: [student.student_name],
      total: [student.total],
      status: [student.status],
      average: [student.average],
      rank: [student.rank],
      subjects: this.fb.array(student.subjects.map(subject => this.createSubjectFormGroup(subject)))
    });
  }

  getControls() {
    return (this.rankTypeMarkForm.get('students') as FormArray).controls;
  }

  createSubjectFormGroup(subject?): FormGroup {
    debugger;
    const subjectn = subject.subject_name;
    const select = subject.selected;
    const prac = subject.practical_status;
    return this.fb.group({
      subject_name: [subjectn],
      selected: [select],
      practical_status: [prac],
      marks: [''],
      grade: [''],
      pass_status: ['']
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

  gradeConvert(i, j, grd) {
    debugger;
    let gradeValue = parseFloat(grd); // Convert the input to a number
    // Check if the input is not a number (i.e., a letter)
    if (isNaN(gradeValue)) {
      gradeValue = 0; // Treat it as 0
    }

    if (gradeValue > 100) {
      const studentsArray = this.rankTypeMarkForm.get('students') as FormArray;
      const studentFormGroup = studentsArray.at(i) as FormGroup;
      const subjectsArray = studentFormGroup.get('subjects') as FormArray;
      const subjectFormGroup = subjectsArray.at(j) as FormGroup;
      subjectFormGroup.get('marks').setValue('');
    }

    this.total = 0;
    const studentsArray = this.rankTypeMarkForm.get('students') as FormArray;
    if (i >= 0 && i < studentsArray.length) {
      const studentFormGroup = studentsArray.at(i) as FormGroup;
      const subjectsArray = studentFormGroup.get('subjects') as FormArray;
      const subjectFormGroup = subjectsArray.at(j) as FormGroup;

      // Use the adjusted gradeValue instead of grd
      if (subjectFormGroup.get('practical_status').value === 'Practical Subject') {
        if (gradeValue >= Number(this.rankTypeMarkForm.value.with_prac)) {
          subjectFormGroup.get('pass_status').setValue('Pass');
        } else {
          subjectFormGroup.get('pass_status').setValue('Fail');
          const courseControl = this.rankTypeMarkForm.get('students') as FormArray;
          courseControl.at(i).get('rank').setValue('');
        }
      } else {
        if (gradeValue >= Number(this.rankTypeMarkForm.value.with_out_prac)) {
          subjectFormGroup.get('pass_status').setValue('Pass');
        } else {
          subjectFormGroup.get('pass_status').setValue('Fail');
          const courseControl = this.rankTypeMarkForm.get('students') as FormArray;
          courseControl.at(i).get('rank').setValue('');
        }
      }

      if (Number(subjectFormGroup.get('marks').value) <= 100 && Number(subjectFormGroup.get('marks').value) > 90) {
        subjectFormGroup.get('grade').setValue('A1');
      }
      else if (Number(subjectFormGroup.get('marks').value) <= 90 && Number(subjectFormGroup.get('marks').value) > 80) {
        subjectFormGroup.get('grade').setValue('A2');
      }
      else if (Number(subjectFormGroup.get('marks').value) <= 80 && Number(subjectFormGroup.get('marks').value) > 70) {
        subjectFormGroup.get('grade').setValue('B1');
      }
      else if (Number(subjectFormGroup.get('marks').value) <= 70 && Number(subjectFormGroup.get('marks').value) > 60) {
        subjectFormGroup.get('grade').setValue('B2');
      }
      else if (Number(subjectFormGroup.get('marks').value) <= 60 && Number(subjectFormGroup.get('marks').value) > 50) {
        subjectFormGroup.get('grade').setValue('C1');
      }
      else if (Number(subjectFormGroup.get('marks').value) <= 50 && Number(subjectFormGroup.get('marks').value) > 40) {
        subjectFormGroup.get('grade').setValue('C2');
      }
      else if (Number(subjectFormGroup.get('marks').value) <= 40 && Number(subjectFormGroup.get('marks').value) > 0) {
        subjectFormGroup.get('grade').setValue('D');
      }
      else {
        subjectFormGroup.get('grade').setValue('');
      }
    }
    const courseControl = this.rankTypeMarkForm.get('students') as FormArray;
    const course = courseControl.at(i).get('subjects').value;
    course.forEach(element => {
      const mValue = parseFloat(element.marks);
      if (!isNaN(mValue)) {
        this.total = this.total + Number(element.marks)
      }
    });
    courseControl.at(i).get('total').setValue(String(this.total));
    const avg = parseFloat((this.total / course.length).toFixed(1));
    courseControl.at(i).get('average').setValue(String(avg));
    const allPassed = course.every(element => element.pass_status === "Pass");
    if (allPassed) {
      courseControl.at(i).get('status').setValue('Pass');
    } else {
      courseControl.at(i).get('status').setValue('Fail');
    }
    debugger;
    const orderBYMark = studentsArray.controls.map(control => control.value);
    const passorderBYMark = orderBYMark.filter((r) => { return r.status == 'Pass' });
    const Student = studentsArray.controls.map(control => control.value);
    passorderBYMark.sort((a, b) => parseInt(b.total) - parseInt(a.total));

    // Student.forEach((stu, m) => {
    //   passorderBYMark.forEach((element, k) => {
    //     if (stu.admission_no == element.admission_no) {
    //       courseControl.at(m).get('rank').setValue(String(k + 1));
    //     }
    //   });
    // });


    const admissionNoRank = {};
    let currentRank = 1;
    let previousMark = null;

    passorderBYMark.forEach((entry, index) => {
      const currentMark = parseFloat(entry.average);
      if (currentMark !== previousMark) {
        admissionNoRank[entry.admission_no] = index + 1;
        currentRank = index + 1;
      } else {
        admissionNoRank[entry.admission_no] = currentRank;
      }
      previousMark = currentMark;
    });

    // Generate rank for each student
    const studentRanks = Student.map((entry) => {
      const admissionNo = entry.admission_no;
      const rank = admissionNoRank[admissionNo] || "";
      return { admission_no: admissionNo, rank: rank };
    });

    Student.forEach((stu, m) => {
      studentRanks.forEach((element) => {
        if (stu.admission_no == element.admission_no) {
          courseControl.at(m).get('rank').setValue(String(element.rank));
        }
      });
    });
  }

  save() {
    console.log(this.rankTypeMarkForm.value);
    if (this.rankTypeMarkForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            var insert = (this.rankTypeMarkForm.value);
            this.meSvc.newGradekTypeMark(insert).subscribe(res => {
              if (res.status == 'Saved successfully') {
                this.notificationSvc.success("Saved Success");
                this.cancelForm();
              }
              else {
                this.notificationSvc.error("Something error");
              }
            });
          }
        });
    }
    else {
      this.rankTypeMarkForm.markAllAsTouched();
      this.notificationSvc.error("Fill the mandatory fileds")
    }
  }

  cancelForm() {
    this.rankTypeMarkForm.reset();
    this.rankTypeMarkForm.get('entryid')?.setValue(0),
      this.rankTypeMarkForm.get('cuid')?.setValue(1),
      this.StudentList = [];
    this.rankTypeMarkForm.get('batch_year')?.setValue(this.newgetbatch);
    this.subjectFilterList = [];
    this.spiltList = [];

    const students = this.rankTypeMarkForm.get('students') as FormArray;
    while (students.length !== 0) {
      students.removeAt(0)
    }
  }
}