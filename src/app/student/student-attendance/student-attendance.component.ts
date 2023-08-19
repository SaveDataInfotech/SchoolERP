import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { studentAttendanceService } from 'src/app/api-service/studentAttendanceService';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit {

  studentList: any = [];
  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];


  groupDisplay: boolean = true;

  date1 = new Date();

  currentYear = this.date1.getUTCFullYear();

  currentMonth = this.date1.getUTCMonth() + 1;

  currentDate = this.date1.getUTCDate();

  today = "2023-12-12";

  finalMonth: any;
  finalDay: any;

  ngOnInit(): void {

    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.cancelClickAssign();

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

    this.studentAttendanceForm.get('date')?.setValue(this.today);

  }

  constructor(private sAdSvc: studentAttendanceService,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService) { }


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
    this.studentAttendanceForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.studentAttendanceForm.get('groupid')?.setValue(0);
    this.studentAttendanceForm.get('sectionid')?.setValue(0);
    if (this.groupFilterlist.length == 0) {
      this.groupDisplay = false;
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.studentAttendanceForm.get('sectionid')?.setValue(0);
    }
    else {
      this.groupDisplay = true;
      this.studentAttendanceForm.get('sectionid')?.setValue(0);
    }
  }

  filterSectionfun(groupID: any) {
    debugger;
    const groupid = Number(groupID);
    this.studentAttendanceForm.get('groupid')?.setValue(groupid);
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.studentAttendanceForm.get('sectionid')?.setValue(0);
  }


  studentAttendanceForm = new FormGroup({
    attendanceid: new FormControl(0),
    date: new FormControl(this.today),
    classid: new FormControl(0),
    groupid: new FormControl(0),
    sectionid: new FormControl(0),
    cuid: new FormControl(1),
    fn:new FormArray([
      new FormGroup({
        admission_no:new FormControl(''),
        fnisselected:new FormControl(false)
      })
    ]),
    an:new FormArray([
      new FormGroup({
        admission_no:new FormControl(''),
        anisselected:new FormControl(false)
      })
    ])
  })

  getControls() {
    //return (this.studentAttendanceForm.get('leaveselectStudent') as FormArray).controls;
  }

  arrayform = new FormGroup({
    student: new FormArray([
      new FormGroup({
        attendanceid: new FormControl(0),
        classid: new FormControl(0),
        groupid: new FormControl(0),
        sectionid: new FormControl(0),
        admission_no: new FormControl(''),
        profileid: new FormControl(0),
        student_name: new FormControl(''),
        date: new FormControl(this.studentAttendanceForm.value.date),
        cuid: new FormControl(1)
      })
    ])
  })

  searchStudentByClass() {
    let classid: number = (this.studentAttendanceForm.value.classid);
    let groupid: number = (this.studentAttendanceForm.value.groupid);
    let sectionid: number = (this.studentAttendanceForm.value.sectionid);
    let date: any = (this.studentAttendanceForm.value.date);
    this.sAdSvc.searchStudentByAttendance(classid, groupid, sectionid, date).subscribe(data => {
      debugger;
      this.studentList = data;
      console.log(this.studentList);
      if (this.studentList.length == 0) {
        this.sAdSvc.searchStudentByClass(classid, groupid, sectionid).subscribe(data => {
          debugger;
        const newstudentList = data;

          const control = <FormArray>this.arrayform.controls['student'];
          control.removeAt(0);
          newstudentList.forEach(element => {
            control.push(
              new FormGroup({
                attendanceid: new FormControl(element.attendanceid),
                classid: new FormControl(element.classid),
                groupid: new FormControl(element.groupid),
                sectionid: new FormControl(element.sectionid),
                admission_no: new FormControl(element.admission_no),
                profileid: new FormControl(element.profileid),
                student_name: new FormControl(element.student_name),
                date: new FormControl(this.studentAttendanceForm.value.date),
                cuid: new FormControl(1)
              })
            )
          });

          let Form = JSON.stringify(this.arrayform.value);
          this.sAdSvc.newAttendance(Form).subscribe(res => {
            console.log(res, 'resss')
            if (res?.recordid) {
              this.arrayform.reset();
              this.notificationSvc.success("Saved Success")
              this.sAdSvc.searchStudentByAttendance(classid, groupid, sectionid, date).subscribe(data => {
                debugger;
                this.studentList = data;
                console.log(this.studentList);
              });
            }
          });
        });
      }
    });

  }


  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.studentAttendanceForm.value.fn != null && this.studentAttendanceForm.value.fn.every(t => t.fnisselected);
  }

  someComplete(): boolean {
    if (this.studentAttendanceForm.value.fn == null) {
      return false;
    }
    return this.studentAttendanceForm.value.fn.filter(t => t.fnisselected).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.studentAttendanceForm.value.fn == null) {
      return;
    }
    this.studentAttendanceForm.value.fn.forEach(t => (t.fnisselected = completed));
  }




  profileidarray: any[] = [];
  admission_no: any[] = [];
  student_name: any[] = [];
  fnarray: any[] = [];
  an: any[] = [];

  selectedStudent(event: any, student: any) {
    // debugger;
    // if (event.target.checked) {

    //   const control = <FormArray>this.studentAttendanceForm.controls['leaveselectStudent'];

    //   control.push(
    //     new FormGroup({
    //       profileid: new FormControl(student.profileid),
    //       admission_no: new FormControl(student.admission_no),
    //       student_name: new FormControl(student.student_name),
    //       fn: new FormControl(true),          
    //     })
    //   )
    // }

    // else {
    //   // this.profileidarray = this.profileidarray.filter((val) => val !== student.profileid);
    //   // this.admission_no = this.admission_no.filter((val) => val.toString() !== student.admission_no.toString());
    //   // this.student_name = this.student_name.filter((val) => val.toString() !== student.student_name.toString());
    //   // this.fnarray = this.fnarray.filter((val) => val !== student.fn);
    //   //this.an = this.an.filter((val) => val !== student.an);
    // }

  };

  markAttendance() {
    // debugger;
    //   if (this.studentAttendanceForm.value.attendanceid == 0) {
    //     this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
    //       .afterClosed().subscribe(res => {
    //         if (res == true) {
    //           var leaveAssigninsert = (this.studentAttendanceForm.value);
    //           this.sAdSvc.newAttendance(leaveAssigninsert).subscribe(res => {
    //             console.log(res, 'resss')
    //             if (res?.recordid) {
    //               this.notificationSvc.success("Saved Success")

    //             }
    //           });
    //         }
    //       });
    //   }
    //   else {
    //     alert()
    //   }
  }


  cancelClickAssign() {
    this.studentAttendanceForm.reset();
    // this.studentAttendanceForm.get('attendanceid')?.setValue(0);
    // this.studentAttendanceForm.get('date')?.setValue(this.today);
    // this.studentAttendanceForm.get('classid')?.setValue(0);
    // this.studentAttendanceForm.get('groupid')?.setValue(0);
    // this.studentAttendanceForm.get('sectionid')?.setValue(0);
    // this.studentAttendanceForm.get(['profileid'])?.setValue(0);
    // this.studentAttendanceForm.get(['admission_no'])?.setValue('');
    // this.studentAttendanceForm.get(['student_name'])?.setValue('');
    // this.studentAttendanceForm.get(['fn'])?.setValue(false);
    // this.studentAttendanceForm.get(['an'])?.setValue(false);
    // this.studentAttendanceForm.get('cuid')?.setValue(1);
  }
}
