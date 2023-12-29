import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { markEntryService } from 'src/app/api-service/markEntryGrade.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { subjectService } from 'src/app/api-service/subject.service';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
@Component({
  selector: 'app-update-mark-rank',
  templateUrl: './update-mark-rank.component.html',
  styleUrls: ['./update-mark-rank.component.scss']
})
export class UpdateMarkRankComponent implements OnInit {
  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  groupDisplay: boolean = true;

  StudentExamNameList: any[] = [];
  subjectDetailList: any[] = [];
  activeBatchYear: any = [];
  newgetbatch: string;
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
    private spinner: NgxSpinnerService
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
    const classid = Number(classsid);
    this.rankTypeMarkForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.rankTypeMarkForm.get('groupid')?.setValue(0);
    this.rankTypeMarkForm.get('sectionid')?.setValue(null);
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.rankTypeMarkForm.get('sectionid')?.setValue(null);
    }
    else {
      this.groupDisplay = true;
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

  searchExamnameByClass() {
   
    let classID: number = (this.rankTypeMarkForm.value.classid);
    let groupID: number = (this.rankTypeMarkForm.value.groupid);
    let sectionID: number = (this.rankTypeMarkForm.value.sectionid);
    let batchYear: string = (this.rankTypeMarkForm.value.batch_year);

    this.meSvc.refresExamname(classID, groupID, sectionID, batchYear).subscribe(data => {
      this.StudentExamNameList = data;
    });
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
      entryid: [student.entryid],
      admission_no: [student.admission_no],
      student_name: [student.student_name],
      total: [student.total],
      status: [student.status],
      average: [student.average],
      rank: [student.rank],
      subjects: this.fb.array(this.SubjectList.map(subject => this.createSubjectFormGroup(subject)))
    });
  }

  getControls() {
    return (this.rankTypeMarkForm.get('students') as FormArray).controls;
  }

  createSubjectFormGroup(subject?): FormGroup {
   
    return this.fb.group({
      subjectentryid: subject.subjectentryid,
      subjectid:subject.subjectid,
      subject_name: subject.subject_name,
      selected: subject.selected,
      practical_status: subject.practical_status,
      marks: subject.marks,
      pass_status: subject.pass_status
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
    //
    // if (Number(grd) > 100) {
    //   const studentsArray = this.rankTypeMarkForm.get('students') as FormArray;
    //   const studentFormGroup = studentsArray.at(i) as FormGroup;
    //   const subjectsArray = studentFormGroup.get('subjects') as FormArray;
    //   const subjectFormGroup = subjectsArray.at(j) as FormGroup;
    //   subjectFormGroup.get('marks').setValue('');
    // }

    // this.total = 0;
    // const studentsArray = this.rankTypeMarkForm.get('students') as FormArray;
    // if (i >= 0 && i < studentsArray.length) {
    //   const studentFormGroup = studentsArray.at(i) as FormGroup;
    //   const subjectsArray = studentFormGroup.get('subjects') as FormArray;
    //   const subjectFormGroup = subjectsArray.at(j) as FormGroup;
    //   if (subjectFormGroup.get('practical_status').value == 'Practical Subject') {
    //     if (Number(subjectFormGroup.get('marks').value) >= Number(this.rankTypeMarkForm.value.with_prac)) {
    //       subjectFormGroup.get('pass_status').setValue('Pass');
    //     }
    //     else {
    //       subjectFormGroup.get('pass_status').setValue('Fail');
    //       const courseControl = this.rankTypeMarkForm.get('students') as FormArray;
    //       courseControl.at(i).get('rank').setValue('');
    //     }
    //   }

    //   else {
    //     if (Number(subjectFormGroup.get('marks').value) >= Number(this.rankTypeMarkForm.value.with_out_prac)) {
    //       subjectFormGroup.get('pass_status').setValue('Pass');
    //     }
    //     else {
    //       subjectFormGroup.get('pass_status').setValue('Fail');
    //       const courseControl = this.rankTypeMarkForm.get('students') as FormArray;
    //       courseControl.at(i).get('rank').setValue('');
    //     }
    //   }
    // }

    //
    // const courseControl = this.rankTypeMarkForm.get('students') as FormArray;
    // const course = courseControl.at(i).get('subjects').value;
    // course.forEach(element => {
    //   this.total = this.total + Number(element.marks)
    // });
    // courseControl.at(i).get('total').setValue(String(this.total));

    // const avg = parseFloat((this.total / course.length).toFixed(1));
    // courseControl.at(i).get('average').setValue(String(avg));

    // const allPassed = course.every(element => element.pass_status === "Pass");
    // if (allPassed) {
    //   courseControl.at(i).get('status').setValue('Pass');
    // } else {
    //   courseControl.at(i).get('status').setValue('Fail');
    // }

    // const orderBYMark = studentsArray.controls.map(control => control.value);
    // const passorderBYMark = orderBYMark.filter((r) => { return r.status == 'Pass' });
    // const Student = studentsArray.controls.map(control => control.value);
    // passorderBYMark.sort((a, b) => parseInt(b.total) - parseInt(a.total));

    // Student.forEach((stu, m) => {
    //  
    //   passorderBYMark.forEach((element, k) => {
    //    
    //     if (stu.admission_no == element.admission_no) {
    //       debugger
    //       courseControl.at(m).get('rank').setValue(String(k + 1));
    //     }
    //   });
    // });

   
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
            this.meSvc.editRankTypeMark(insert).subscribe(res => {
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
    this.StudentList = [];
    this.rankTypeMarkForm.get('cuid')?.setValue(1),
      this.rankTypeMarkForm.get('exam_name')?.setValue(''),
      this.rankTypeMarkForm.get('batch_year')?.setValue(this.newgetbatch);
    const students = this.rankTypeMarkForm.get('students') as FormArray;
    while (students.length !== 0) {
      students.removeAt(0)
    }
  }


  ////////////////////////////////////////
  StudentList: any[] = [];
  SubjectList: any[] = [];
  SubjectListsss: any[] = [];
  // StudentList1: any[] = [];

  async clickpop() {
   

    let examName = String(this.rankTypeMarkForm.value.exam_name);
    let classID: number = (this.rankTypeMarkForm.value.classid);
    let groupID: number = (this.rankTypeMarkForm.value.groupid);
    let sectionID: number = (this.rankTypeMarkForm.value.sectionid);
    let batchYear: string = (this.rankTypeMarkForm.value.batch_year);

    const student = await this.meSvc.refresStudentList(classID, groupID, sectionID, batchYear, examName).toPromise();
    this.StudentList = student;

    const subject = await this.meSvc.refresSubjectList(classID, groupID, sectionID, batchYear, examName).toPromise();
    this.SubjectListsss = subject;

    if (this.SubjectListsss.length) {
      this.SubjectListsss.forEach((e) => {
        this.subjectDetailList.forEach((y) => {
          if (e.subject_name == y.subject_name) {
            e['practical_status'] = y.practical_status
          }
        })
      })
    }
    this.spinner.show();
    this.rankTypeMarkForm.patchValue(this.StudentList[0]);

    const students = this.rankTypeMarkForm.get('students') as FormArray;
    while (students.length !== 0) {
      students.removeAt(0)
    }

    if (students.length == 0) {
     
      this.populateStudentsFormArray(this.StudentList);
    }
    this.spinner.hide();
  }


  // Function to populate the students FormArray
  populateStudentsFormArray(data: any[]) {
   
    const studentsFormArray = this.rankTypeMarkForm.get('students') as FormArray;
    data.forEach(studentData => {
     
      this.SubjectList = this.SubjectListsss.filter((e) => {
        return e.admission_no == studentData.admission_no
          && e.entryid == studentData.entryid
      })
      studentsFormArray.push(this.createStudentFormGroup(studentData));
    });
  }


  @ViewChildren('grd') grdInputs!: QueryList<ElementRef>;

  moveCell(e: KeyboardEvent) {
    const activeEle = document.activeElement as HTMLElement;
    const activeEleIndex = this.grdInputs.toArray().findIndex(input => input.nativeElement === activeEle);

    if (activeEleIndex !== -1) {
      if (e.key === 'ArrowRight' && activeEleIndex < this.grdInputs.length - 1) {
        const nextElement = this.grdInputs.toArray()[activeEleIndex + 1].nativeElement as HTMLElement;
        nextElement.focus();
      }

      if (e.key === 'ArrowLeft' && activeEleIndex > 0) {
        const previousElement = this.grdInputs.toArray()[activeEleIndex - 1].nativeElement as HTMLElement;
        previousElement.focus();
      }
     
      const studentsArray = this.rankTypeMarkForm.get('students') as FormArray;
      const studentFormGroup = studentsArray.at(0) as FormGroup;
      const subjectsArray = studentFormGroup.get('subjects') as FormArray;
      const numRows = studentsArray.length;
      const numCols = subjectsArray.length;

      if (e.key === 'ArrowUp') {
        const newIndex = activeEleIndex - numCols;
        if (newIndex >= 0) {
          const upElement = this.grdInputs.toArray()[newIndex].nativeElement as HTMLElement;
          upElement.focus();
        }
      }

      if (e.key === 'ArrowDown') {
        const newIndex = activeEleIndex + numCols;
        if (newIndex < numRows * numCols && newIndex < this.grdInputs.length) {
          const downElement = this.grdInputs.toArray()[newIndex].nativeElement as HTMLElement;
          downElement.focus();
        }
      }
    }
  }
}
