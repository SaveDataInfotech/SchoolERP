import { Component, OnInit } from '@angular/core';
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

  constructor(
    private notificationSvc: NotificationsService,
    private SttySvc: staffTypeService,
    private DialogSvc: DialogService,
    private stAtSvc: staffAttendanceService,
    private LvtySvc: LeaveTypeService,) { }

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

  staffAttendanceForm: StaffAttendanceModel = {
    id: 0,
    date: this.today,
    staff_type: '',
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
    l_an: false
  }

  searchStaff() {
    let staff_type = (this.staffAttendanceForm.staff_type);
    let date = (this.staffAttendanceForm.date);
    this.stAtSvc.searchStudentByAttendance(staff_type, date).subscribe(data => {
      this.staffList = data;
      if (this.staffList.length != 0) {
        this.serachDisabled = true;
      }
    });
  }

  save(value) {
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

  cancelClick() {
    this.staffAttendanceForm.date = this.today;
    this.staffAttendanceForm.staff_type = '';
    this.staffAttendanceForm.staff_no = '';
    this.staffAttendanceForm.staff_name = '';
    this.staffAttendanceForm.fn = false;
    this.staffAttendanceForm.an = false;
    this.staffAttendanceForm.l_fn = false;
    this.staffAttendanceForm.l_an = false;
    this.staffAttendanceForm.leave = false;
    this.staffAttendanceForm.leave_type = '';
    this.staffAttendanceForm.date = this.today;
    this.staffList = null;
    this.serachDisabled = false;
  }

}
