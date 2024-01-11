import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { studentAttendanceService } from 'src/app/api-service/studentAttendanceService';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { StudentAttendance } from '../../Model/studentAttendance.model';
import { Router } from '@angular/router';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit {
  newgetbatch: String;
  activeBatchYear: any = [];
  studentList: StudentAttendance[] = [];
  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  groupFilterlist: any = [];
  sectionFilterlist: any = [];
  serachDisabled: boolean = false;
  allComplete: boolean = false;
  anAllComplete: boolean = false;
  ani: boolean = false;
  fni: boolean = false;

  today: string = String(new Date());

  ngOnInit(): void {
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.GetActiveBatchYear();

    this.today = new Date().toISOString().slice(0, 10)
    this.studentAttendanceForm.date = this.today;
  }

  constructor(private sAdSvc: studentAttendanceService,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private router: Router,
    private batchSvc: BatechYearService,) { }


  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }
  //////////////////////// FN CHECKBOX FUNCTION
  fnupdateAllComplete() {
    this.allComplete = this.studentList != null && this.studentList.every(t => t.fn);
  }
  fnsomeComplete(): boolean {
    if (this.studentList == null) {
      return false;
    }
    return this.studentList.filter(t => t.fn).length > 0 && !this.allComplete;
  }
  fnsetAll(completed: boolean) {
    this.allComplete = completed;
    if (this.studentList == null) {
      return;
    }
    this.studentList.forEach(t => (t.fn = completed));
  }
  ///////////////////////// AN CHECKBOX FUNCTION
  anupdateAllComplete() {
    this.anAllComplete = this.studentList != null && this.studentList.every(t => t.an);
  }
  ansomeComplete(): boolean {
    if (this.studentList == null) {
      return false;
    }
    return this.studentList.filter(t => t.an).length > 0 && !this.anAllComplete;
  }
  ansetAll(completed: boolean) {
    this.anAllComplete = completed;
    if (this.studentList == null) {
      return;
    }
    this.studentList.forEach(t => (t.an = completed));
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
    this.studentAttendanceForm.classid = classid;
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.studentAttendanceForm.groupid = 0;
    this.studentAttendanceForm.sectionid = 0;
    if (this.groupFilterlist.length == 0) {
      this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.classid == classid });
      this.studentAttendanceForm.sectionid = 0;
    }
    else {
      this.studentAttendanceForm.sectionid = 0;
      this.sectionFilterlist = [];
    }
  }

  filterSectionfun(groupID: any) {
    const groupid = Number(groupID);
    this.studentAttendanceForm.groupid = groupid;
    this.sectionFilterlist = this.SectionList.filter((e: any) => { return e.groupid == groupid });
    this.studentAttendanceForm.sectionid = 0;
  }

  GetActiveBatchYear() {
    this.batchSvc.GetActiveBatchYear().subscribe(data => {
      this.activeBatchYear = data;
      const getbatch = JSON.stringify(this.activeBatchYear[0].batch_year)
      this.newgetbatch = String(getbatch.replace(/['"]+/g, ''));
      this.studentAttendanceForm.batch_year = this.newgetbatch;
    });
  }


  studentAttendanceForm: StudentAttendance = {
    attendanceid: 0,
    batch_year: '',
    classid: 0,
    groupid: 0,
    sectionid: 0,
    admission_no: '',
    profileid: 0,
    student_name: '',
    fn: false,
    an: false,
    fni: false,
    ani: false,
    date: this.today
  };

  searchStudentByClass() {
    let classid: number = (this.studentAttendanceForm.classid);
    let groupid: number = (this.studentAttendanceForm.groupid);
    let sectionid: number = (this.studentAttendanceForm.sectionid);
    let date: any = (this.studentAttendanceForm.date);
    let batchYear: any = (this.studentAttendanceForm.batch_year);
    if (date != '' && classid != 0 && sectionid != 0) {
      this.sAdSvc.searchStudentByAttendance(classid, groupid, sectionid, date, batchYear).subscribe(data => {

        this.studentList = data;
        if (this.studentList.length != 0) {
          if (this.studentList[0].ani == true) {
            this.ani = true;
          }
          if (this.studentList[0].fni == true) {
            this.fni = true;
          }
          if (this.studentList.length != 0) {
            this.serachDisabled = true;
          }
          this.fnupdateAllComplete();
          this.anupdateAllComplete();
        }
        else {
          this.notificationSvc.error('There are no students in this class');
        }

      });
    }
    else {
      this.notificationSvc.error('Fill in the mandatory fields');
    }
  }

  checkChange(option: any) {
    if (option) {
      this.studentAttendanceForm.fn = true;
    } else {
      this.studentAttendanceForm.fn = false;
    }
  };

  save(data: any[]) {
    const date = this.studentAttendanceForm.date;
    const classg = this.studentAttendanceForm.classid;
    const section = this.studentAttendanceForm.sectionid;
    if (date != '' && classg != 0 && section != 0) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            this.sAdSvc.newAttendance(data).subscribe(res => {
              if (res.status == 'Insert Success') {
                this.notificationSvc.success('Saved Successfully');
                this.cancelClick();
              }
              else {
                this.notificationSvc.error('Something Error');
              }
            });
          }
        });
    }
    else {
      this.notificationSvc.error('Fill in the mandatory fields');
    }
  }

  cancelClick() {
    this.studentAttendanceForm.batch_year = this.newgetbatch;
    this.studentAttendanceForm.classid = 0;
    this.studentAttendanceForm.groupid = 0;
    this.studentAttendanceForm.sectionid = 0;
    this.studentAttendanceForm.admission_no = '';
    this.studentAttendanceForm.profileid = 0;
    this.studentAttendanceForm.fn = false;
    this.studentAttendanceForm.an = false;
    this.studentAttendanceForm.date = this.today;
    this.studentList = [];
    this.serachDisabled = false;
    this.fni = false;
    this.ani = false;
    this.fnupdateAllComplete();
    this.anupdateAllComplete();
  }
}
