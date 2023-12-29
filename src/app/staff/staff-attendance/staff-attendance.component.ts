import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { StaffAttendanceModel } from 'src/app/Model/StaffAttendance.model';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { LeaveTypeService } from 'src/app/api-service/LeaveType.service';
import { staffAttendanceService } from 'src/app/api-service/staffAttendance.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';

@Component({
  selector: 'app-staff-attendance',
  templateUrl: './staff-attendance.component.html',
  styleUrls: ['./staff-attendance.component.scss']
})
export class StaffAttendanceComponent implements OnInit {
  StaffTypeList: any[] = [];
  staffList: StaffAttendanceModel[] = [];
  LaveTyList: any[] = [];
  serachDisabled: boolean = false;
  allComplete: boolean = false;
  anAllComplete: boolean = false;
  constructor(
    private notificationSvc: NotificationsService,
    private SttySvc: staffTypeService,
    private DialogSvc: DialogService,
    private stAtSvc: staffAttendanceService,
    private LvtySvc: LeaveTypeService,
    private router: Router) { }

  date1 = new Date();

  currentYear = this.date1.getUTCFullYear();

  currentMonth = this.date1.getUTCMonth() + 1;

  currentDate = this.date1.getUTCDate();
  todayDate: Date = new Date();
  today = String(this.todayDate);

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
    this.staffAttendanceForm.date = this.today;

    this.refreshstaffTypeList();
    this.refreshLeaveTypeList();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }
  refreshstaffTypeList() {
    this.SttySvc.getstaffTypeList().subscribe(data => {
      this.StaffTypeList = data;
    });
  }
  refreshLeaveTypeList() {
    this.LvtySvc.getLeaveTypeList().subscribe(data => {
      this.LaveTyList = data;
    });
  }

  fnsomeComplete(): boolean {
    if (this.staffList == null) {
      return false;
    }
    return this.staffList.filter(t => t.fn).length > 0 && !this.allComplete;
  }

  fnsetAll(completed: boolean) {
    this.allComplete = completed;
    if (this.staffList == null) {
      return;
    }
    this.staffList.forEach((t) => {
      if (t.leave != true && t.l_fn != true) {
        t.fn = completed
      }
    });
  }

  ansomeComplete(): boolean {
    if (this.staffList == null) {
      return false;
    }
    return this.staffList.filter(t => t.an).length > 0 && !this.anAllComplete;
  }

  ansetAll(completed: boolean) {
    this.anAllComplete = completed;
    if (this.staffList == null) {
      return;
    }
    this.staffList.forEach((t) => {
      if (t.leave != true && t.l_an != true) {
        (t.an = completed)
      }
    });
  }

  staffAttendanceForm: StaffAttendanceModel = {
    id: 0,
    date: this.today,
    staff_typeid: 0,
    staff_no: '',
    staff_name: '',
    fn: false,
    an: false,
    leave: false,
    leave_type: '',
    fni: false,
    ani: false,
    cuid: 0,
    l_fn: false,
    l_an: false,
    typeid: 0
  }

  searchStaff() {
    
    let staffTypeid = (this.staffAttendanceForm.staff_typeid);
    if (staffTypeid != 0 && this.staffAttendanceForm.date != '') {
      let date = (this.staffAttendanceForm.date);
      this.stAtSvc.searchStudentByAttendance(staffTypeid, date).subscribe(data => {
        this.staffList = data;
        
        if (this.staffList.length != 0) {
          this.serachDisabled = true;
        }
      });
    }
    else {
      this.notificationSvc.error('Fill in the mandatory fields');
    }
  }

  save(value) {
    this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.stAtSvc.newAttendance(value).subscribe(res => {
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

  cancelClick() {
    this.staffAttendanceForm.date = this.today;
    this.staffAttendanceForm.staff_typeid = 0;
    this.staffAttendanceForm.staff_no = '';
    this.staffAttendanceForm.staff_name = '';
    this.staffAttendanceForm.fn = false;
    this.staffAttendanceForm.an = false;
    this.staffAttendanceForm.l_fn = false;
    this.staffAttendanceForm.l_an = false;
    this.staffAttendanceForm.leave = false;
    this.staffAttendanceForm.leave_type = '';
    this.staffAttendanceForm.date = this.today;
    this.staffList = [];
    this.serachDisabled = false;
  }

}
