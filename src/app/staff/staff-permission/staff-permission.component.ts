import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { LeaveAssignService } from 'src/app/api-service/LeaveAssign.service';
import { staffLeavePermissionService } from 'src/app/api-service/staffLeavePermission.service';
import { DatePipe } from '@angular/common';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { Router } from '@angular/router';
import { staffProfileService } from 'src/app/api-service/staffProfile.service';

@Component({
  selector: 'app-staff-permission',
  templateUrl: './staff-permission.component.html',
  styleUrls: ['./staff-permission.component.scss']
})
export class StaffPermissionComponent implements OnInit {
  StaffLeaveList: any[] = [];
  LaveAsList: any[] = [];
  totaldays: any;
  AllStaffLeavePermissionHistoryList: any[] = [];

  todayDate: Date = new Date();
  date1 = new Date();
  currentYear = this.date1.getUTCFullYear();
  currentMonth = this.date1.getUTCMonth() + 1;
  currentDate = this.date1.getUTCDate();
  today = String(this.todayDate);
  finalMonth: any;
  finalDay: any;
  minDate: any;
  maxdate: any;
  minMonth: any;

  // staffList: any[] = [];
  constructor(
    public datepipe: DatePipe,
    private slpSvc: staffLeavePermissionService,
    private LvAsSvc: LeaveAssignService,
    private notificationSvc: NotificationsService,
    private DialogSvc: DialogService,
    private router: Router,
    private staffSvc: staffProfileService,
  ) { this.createForm(); }

  ngOnInit(): void {
    this.getAllStaffLeavePermissionHistory();
    this.refreshLeaveAssignList();
    // this.refreshStaffList();
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
    this.staffLeavePermissionForm.get('date').setValue(this.today);
    this.staffHalfDayPermissionForm.get('date').setValue(this.today);

    this.minMonth = this.datepipe.transform(this.today, 'yyyy-MM');
    this.staffLeavePermissionForm.get('year').setValue(this.minMonth);
    this.staffHalfDayPermissionForm.get('year').setValue(this.minMonth);

    this.dateRangeChange();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }


  refreshLeaveAssignList() {
    this.LvAsSvc.getLeaveAssignList().subscribe(data => {
      this.LaveAsList = data;
    });
  }

  // refreshStaffList() {
  //   this.staffSvc.getstaffProfileList().subscribe(data => {
  //     this.staffList = data;
  //   });
  // }

  getAllStaffLeavePermissionHistory() {
    this.slpSvc.getAllStaffLeavePermissionHistory().subscribe(data => {
      this.AllStaffLeavePermissionHistoryList = data;
    });
  }

  staffLeavePermissionForm: FormGroup;
  createForm() {
    this.staffLeavePermissionForm = new FormGroup({
      year: new FormControl(''),
      staff_no: new FormControl(''),
      staff_name: new FormControl(''),
      date: new FormControl(this.today),
      typeid: new FormControl(null),
      fromdate: new FormControl(''),
      todate: new FormControl(''),
      leave_days: new FormControl([]),
      total_days: new FormControl(''),
      cuid: new FormControl(1)
    })
  }

  dateRangeChange() {
    debugger;
    const Month = this.staffLeavePermissionForm.value.year;
    const currentMonth = this.datepipe.transform(this.today, 'yyyy-MM');
    if (Month == currentMonth) {
      debugger;
      this.minDate = this.today;
      //  const maxdate=

      const lastDay = new Date(new Date(this.today).getFullYear(), new Date(this.today).getMonth() + 1, 0);
      this.maxdate = this.datepipe.transform(lastDay, 'yyyy-MM-dd');
      debugger;
    }
    else {
      debugger;
      this.minDate = Month + '-01';
      const lastDay = new Date(new Date(Month + '-01').getFullYear(), new Date(Month + '-01').getMonth() + 1, 0);
      this.maxdate = this.datepipe.transform(lastDay, 'yyyy-MM-dd');
      debugger;
    }
  }

  async dateChange() {

    const staffNo = this.staffLeavePermissionForm.value.staff_no;
    const year = this.staffLeavePermissionForm.value.year;
    const fromdate = new Date(this.staffLeavePermissionForm.value.fromdate);
    const todate = new Date(this.staffLeavePermissionForm.value.todate);
    var daysOfYear = [];
    for (var d = fromdate; d <= todate; d.setDate(d.getDate() + 1)) {
      const student = await this.slpSvc.checkAttendanceStaff(staffNo, this.datepipe.transform(d, 'yyyy-MM-dd')).toPromise();
      if (!student.length) {
        const checkArray = this.AllStaffLeavePermissionHistoryList.filter((e) => {
          return e.staff_no == staffNo && e.year == year && e.leave_day == this.datepipe.transform(d, 'yyyy-MM-dd')
        });

        if (checkArray.length == 0) {
          daysOfYear.push(this.datepipe.transform(d, 'yyyy-MM-dd'));
        }
        else {
          this.notificationSvc.warn('You Have Alredy Applied Leave On This Day');
          this.staffLeavePermissionForm.get('fromdate')?.setValue('');
          this.staffLeavePermissionForm.get('todate')?.setValue('');
        }
      }
      else {
        this.notificationSvc.warn('Alredy Put Attendance On This Day');
        this.staffLeavePermissionForm.get('fromdate')?.setValue('');
        this.staffLeavePermissionForm.get('todate')?.setValue('');
      }
    }
    this.staffLeavePermissionForm.get('leave_days')?.setValue(daysOfYear);
    this.totaldays = daysOfYear.length;

    const eligibleday = this.StaffLeaveList.filter((e) => { return e.typeid == this.staffLeavePermissionForm.value.typeid });
    if (Number(eligibleday[0].eligible_days) < this.totaldays || Number(eligibleday[0].monthedays) < this.totaldays) {
      this.staffLeavePermissionForm.get('todate')?.setValue('');
      this.staffLeavePermissionForm.get('total_days')?.setValue('');
      this.notificationSvc.error('Leave Day Range Must Less Than Or equal To Eligible Day');
    }
    else {
      this.staffLeavePermissionForm.get('total_days')?.setValue(String(this.totaldays));
    }
  }

  leaveAssignForm = new FormGroup({
    leaveList: new FormArray([

    ]),
  })
  getControls() {
    return (this.leaveAssignForm.get('leaveList') as FormArray).controls;
  }

  async searchLeave() {
    debugger;
    const year = String((new Date(this.staffLeavePermissionForm.value.year)).getFullYear());
    const Month = this.staffLeavePermissionForm.value.year
    const staffNo = this.staffLeavePermissionForm.value.staff_no;

    const newStaff = await this.staffSvc.searchStaffByStaffNo(staffNo).toPromise();
    debugger;
    if (newStaff.length != 0) {
      this.slpSvc.getstaffLeaveList(year, staffNo, Month).subscribe(data => {
        this.StaffLeaveList = data;
        if (this.StaffLeaveList.length != 0) {
          this.staffLeavePermissionForm.get('staff_name')?.setValue(this.StaffLeaveList[0].staff_name);
        }

        if (this.StaffLeaveList.length == 0) {
          const LaveAsByIDFillterList = this.LaveAsList.filter((e) => { return e.category_id == newStaff[0].category_id });
          if (LaveAsByIDFillterList.length != 0) {
            const control1 = <FormArray>this.leaveAssignForm.controls['leaveList'];
            while (control1.length !== 0) {
              control1.removeAt(0);
            }
            if (control1.length == 0) {
              LaveAsByIDFillterList.forEach(element => {
                const control = <FormArray>this.leaveAssignForm.controls['leaveList'];
                control.push(
                  new FormGroup({
                    year: new FormControl(year),
                    staff_no: new FormControl(staffNo),
                    assignid: new FormControl(element.assignid),
                    category_id: new FormControl(element.category_id),
                    typeid: new FormControl(element.typeid),
                    day_off: new FormControl('0'),
                    date: new FormControl(this.today),
                    cuid: new FormControl(1),
                  })
                )
              });
            }
            var leavetypeinsert = (this.leaveAssignForm.value);
            this.slpSvc.addNewleaveType(leavetypeinsert).subscribe(res => {
              if (res.status == 'Saved successfully' || res.status == 'Alredy') {
                this.slpSvc.getstaffLeaveList(year, staffNo, Month).subscribe(data => {
                  this.StaffLeaveList = data;
                  this.staffLeavePermissionForm.get('staff_name')?.setValue(this.StaffLeaveList[0].staff_name);
                });
              }
              else {
                this.notificationSvc.error('Something Error or Invalid Staff No')
              }
            });
          }
          else {
            this.notificationSvc.error('No leave is assign to this staff or Invalid Staff No')
          }
        }
      });
    }
    else {
      this.notificationSvc.error("Invalid Staff No");
    }
  }

  save() {
    if (this.staffLeavePermissionForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            const formvalue = (this.staffLeavePermissionForm.value);

            this.slpSvc.addNewPermission(formvalue).subscribe(res => {

              if (res.status == 'Insert Success') {
                this.notificationSvc.success('Saved Successfully');
                this.cancelClick();
              }
            });
          }
        });
    }
    else {
      this.staffLeavePermissionForm.markAllAsTouched();
    }
  }

  cancelClick() {
    this.getAllStaffLeavePermissionHistory();
    this.StaffLeaveList = [];
    this.staffLeavePermissionForm.reset();
    this.staffLeavePermissionForm.get('year')?.setValue(this.minMonth);
    this.staffLeavePermissionForm.get('staff_no')?.setValue('');
    this.staffLeavePermissionForm.get('staff_name')?.setValue('');
    this.staffLeavePermissionForm.get('date')?.setValue(this.today);
    this.staffLeavePermissionForm.get('typeid')?.setValue(null);
    this.staffLeavePermissionForm.get('fromdate')?.setValue('');
    this.staffLeavePermissionForm.get('todate')?.setValue('');
    this.staffLeavePermissionForm.get('leave_days')?.setValue('');
    this.staffLeavePermissionForm.get('total_days')?.setValue('0');
    this.staffLeavePermissionForm.get('cuid')?.setValue(1);

    this.staffHalfDayPermissionForm.reset();
    this.staffHalfDayPermissionForm.get('year')?.setValue(this.minMonth);
    this.staffHalfDayPermissionForm.get('staff_no')?.setValue('');
    this.staffHalfDayPermissionForm.get('date')?.setValue(this.today);
    this.staffHalfDayPermissionForm.get('typeid')?.setValue(null);
    this.staffHalfDayPermissionForm.get('p_fn')?.setValue(false);
    this.staffHalfDayPermissionForm.get('p_an')?.setValue(false);
    this.staffHalfDayPermissionForm.get('h_leave_days')?.setValue('');
    this.staffHalfDayPermissionForm.get('cuid')?.setValue(1);
  }


  staffHalfDayPermissionForm = new FormGroup({
    staff_no: new FormControl(''),
    year: new FormControl(''),
    date: new FormControl(this.today),
    typeid: new FormControl(null),
    h_leave_days: new FormControl(''),
    p_fn: new FormControl(false),
    p_an: new FormControl(false),
    cuid: new FormControl(1)
  });

  pDayChange() {
    this.pFNChange();
    this.pANChange();
  }

  async pFNChange() {
    debugger
    let Htotal: number = 0;
    if (this.staffHalfDayPermissionForm.value.p_fn == true) { Htotal += 0.5; }
    if (this.staffHalfDayPermissionForm.value.p_an == true) { Htotal += 0.5; }
    const staffNo = this.staffLeavePermissionForm.value.staff_no;
    const Month = this.staffHalfDayPermissionForm.value.year;
    const leaveDays = this.staffHalfDayPermissionForm.value.h_leave_days;
    const FN = this.staffHalfDayPermissionForm.value.p_fn;
    const checkArray = this.AllStaffLeavePermissionHistoryList.filter((e) => {
      return (e.staff_no == staffNo && e.year == Month && e.leave_day == leaveDays) || (e.staff_no == staffNo && e.year == Month && e.leave_day == leaveDays && e.p_fn == FN)
    });

    const student = await this.slpSvc.checkAttendanceStaff(staffNo, this.datepipe.transform(leaveDays, 'yyyy-MM-dd')).toPromise();
    const newAttendance = student.filter((e) => { return e.fn == true || e.fni == true });
    debugger;
    if (this.staffHalfDayPermissionForm.value.p_fn) {
      if (!newAttendance.length) {
        if (checkArray.length != 0) {
          this.notificationSvc.warn('You Have Alredy Applied Leave On This Day');
          this.staffHalfDayPermissionForm.get('h_leave_days')?.setValue('');
        }
        else {
          const eligibleday = this.StaffLeaveList.filter((e) => { return e.typeid == this.staffHalfDayPermissionForm.value.typeid });
          if (Number(eligibleday[0].eligible_days) < Htotal || Number(eligibleday[0].monthedays) < Htotal) {
            this.staffHalfDayPermissionForm.get('h_leave_days')?.setValue('');
            this.notificationSvc.error('Leave Day Range Must Less Than Or equal To Eligible Day');
          }
        }
      }
      else {
        this.notificationSvc.warn('Alredy Put Attendance On This Day');
        this.staffHalfDayPermissionForm.get('h_leave_days')?.setValue('');
      }
    }
  }

  async pANChange() {
    let Htotal: number = 0;
    if (this.staffHalfDayPermissionForm.value.p_fn == true) { Htotal += 0.5; }
    if (this.staffHalfDayPermissionForm.value.p_an == true) { Htotal += 0.5; }
    const staffNo = this.staffLeavePermissionForm.value.staff_no;
    const Month = this.staffHalfDayPermissionForm.value.year;
    const leaveDays = this.staffHalfDayPermissionForm.value.h_leave_days;
    const AN = this.staffHalfDayPermissionForm.value.p_an;
    const checkArray = this.AllStaffLeavePermissionHistoryList.filter((e) => {
      return (e.staff_no == staffNo && e.year == Month && e.leave_day == leaveDays) || (e.staff_no == staffNo && e.year == Month && e.leave_day == leaveDays && e.p_an == AN)
    });

    const student = await this.slpSvc.checkAttendanceStaff(staffNo, this.datepipe.transform(leaveDays, 'yyyy-MM-dd')).toPromise();
    const newAttendance = student.filter((e) => { return e.an == true || e.ani == true });

    if (this.staffHalfDayPermissionForm.value.p_an) {
      if (!newAttendance.length) {
        if (checkArray.length != 0) {
          this.notificationSvc.warn('You Have Alredy Applied Leave On This Day');
          this.staffHalfDayPermissionForm.get('h_leave_days')?.setValue('');
        }
        else {
          const eligibleday = this.StaffLeaveList.filter((e) => { return e.typeid == this.staffHalfDayPermissionForm.value.typeid });
          if (Number(eligibleday[0].eligible_days) < Htotal || Number(eligibleday[0].monthedays) < Htotal) {
            this.staffHalfDayPermissionForm.get('h_leave_days')?.setValue('');
            this.notificationSvc.error('Leave Day Range Must Less Than Or equal To Eligible Day');
          }
        }
      }
      else {
        this.notificationSvc.warn('Alredy Put Attendance On This Day');
        this.staffHalfDayPermissionForm.get('h_leave_days')?.setValue('');
      }
    }
  }

  pSave() {
    this.staffHalfDayPermissionForm.get('staff_no')?.setValue(this.staffLeavePermissionForm.value.staff_no);
    if (this.staffHalfDayPermissionForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            const formvalue = (this.staffHalfDayPermissionForm.value);
            console.log(formvalue);
            this.slpSvc.addNewHalfDay(formvalue).subscribe(res => {

              if (res.status == 'Insert Success') {
                this.notificationSvc.success('Saved Successfully');
                this.cancelClick();
              }
            });
          }
        });
    }
    else {
      this.staffHalfDayPermissionForm.markAllAsTouched();
    }
  }
}