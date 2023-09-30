import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { LeaveAssignService } from 'src/app/api-service/LeaveAssign.service';
import { staffLeavePermissionService } from 'src/app/api-service/staffLeavePermission.service';
import { DatePipe } from '@angular/common';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-permission',
  templateUrl: './staff-permission.component.html',
  styleUrls: ['./staff-permission.component.scss']
})
export class StaffPermissionComponent implements OnInit {
  StaffLeaveList: any[] = [];
  LaveAsByIDList: any = [];
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
  minMonth: any;
  constructor(
    public datepipe: DatePipe,
    private slpSvc: staffLeavePermissionService,
    private LvAsSvc: LeaveAssignService,
    private notificationSvc: NotificationsService,
    private DialogSvc: DialogService,
    private router: Router
  ) { this.createForm(); }

  ngOnInit(): void {
    this.refreshLeaveAssignByIDList();
    this.getAllStaffLeavePermissionHistory();

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
    this.staffLeavePermissionForm.get('month').setValue(this.minMonth);
    this.staffHalfDayPermissionForm.get('month').setValue(this.minMonth);

    this.dateRangeChange();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  refreshLeaveAssignByIDList() {
    this.LvAsSvc.getLeaveAssignByIDList().subscribe(data => {
      this.LaveAsByIDList = data;
    });
  }

  getAllStaffLeavePermissionHistory() {
    this.slpSvc.getAllStaffLeavePermissionHistory().subscribe(data => {
      this.AllStaffLeavePermissionHistoryList = data;
    });
  }

  staffLeavePermissionForm: FormGroup;
  createForm() {
    this.staffLeavePermissionForm = new FormGroup({
      month: new FormControl(''),
      staff_no: new FormControl(''),
      staff_name: new FormControl(''),
      date: new FormControl(this.today),
      l_type: new FormControl(null),
      fromdate: new FormControl(''),
      todate: new FormControl(''),
      leave_days: new FormControl([]),
      total_days: new FormControl(''),
      cuid: new FormControl(1)
    })
  }

  dateRangeChange() {
    debugger;
    const Month = this.staffLeavePermissionForm.value.month;
    const currentMonth = this.datepipe.transform(this.today, 'yyyy-MM');
    if (Month == currentMonth) {
      this.minDate = this.today;
    }
    else {
      this.minDate = Month + '-01';
    }
  }

  dateChange() {
    debugger;
    const staffNo = this.staffLeavePermissionForm.value.staff_no;
    const month = this.staffLeavePermissionForm.value.month;
    const fromdate = new Date(this.staffLeavePermissionForm.value.fromdate);
    const todate = new Date(this.staffLeavePermissionForm.value.todate);
    var daysOfYear = [];
    for (var d = fromdate; d <= todate; d.setDate(d.getDate() + 1)) {
      debugger;
      const checkArray = this.AllStaffLeavePermissionHistoryList.filter((e) => {
        debugger;
        return e.staff_no == staffNo && e.month == month && e.leave_day == this.datepipe.transform(d, 'yyyy-MM-dd')
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
    this.staffLeavePermissionForm.get('leave_days')?.setValue(daysOfYear);
    this.totaldays = daysOfYear.length;

    const eligibleday = this.StaffLeaveList.filter((e) => { return e.l_type == this.staffLeavePermissionForm.value.l_type });
    if (Number(eligibleday[0].balance_eligible) < this.totaldays) {
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

  searchLeave() {
    debugger;
    const month = this.staffLeavePermissionForm.value.month;
    const staffNo = this.staffLeavePermissionForm.value.staff_no;

    this.slpSvc.getstaffLeaveList(month, staffNo).subscribe(data => {
      this.StaffLeaveList = data;
      if (this.StaffLeaveList.length != 0) {
        this.staffLeavePermissionForm.get('staff_name')?.setValue(this.StaffLeaveList[0].staff_name);
      }
      debugger;
      if (this.StaffLeaveList.length == 0) {
        debugger;
        const LaveAsByIDFillterList = this.LaveAsByIDList.filter((e) => { return e.staff_no == staffNo });
        const control1 = <FormArray>this.leaveAssignForm.controls['leaveList'];
        while (control1.length !== 0) {
          control1.removeAt(0);
        }
        LaveAsByIDFillterList.forEach(element => {
          const control = <FormArray>this.leaveAssignForm.controls['leaveList'];
          control.push(
            new FormGroup({
              month: new FormControl(month),
              staff_no: new FormControl(staffNo),
              l_type: new FormControl(element.l_type),
              eligible: new FormControl(element.elgible),
              balance_eligible: new FormControl(element.elgible),
              date: new FormControl(this.today),
              cuid: new FormControl(1),
            })
          )
        });
        var leavetypeinsert = (this.leaveAssignForm.value);
        this.slpSvc.addNewleaveType(leavetypeinsert).subscribe(res => {
          if (res.status == 'Saved successfully') {
            this.slpSvc.getstaffLeaveList(month, staffNo).subscribe(data => {
              this.StaffLeaveList = data;
              this.staffLeavePermissionForm.get('staff_name')?.setValue(this.StaffLeaveList[0].staff_name);
            });
          }
        });
      }
    });

  }

  save() {
    debugger;
    if (this.staffLeavePermissionForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            const formvalue = (this.staffLeavePermissionForm.value);
            this.slpSvc.addNewPermission(formvalue).subscribe(res => {
              debugger;
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
    this.staffLeavePermissionForm.get('month')?.setValue(this.minMonth);
    this.staffLeavePermissionForm.get('staff_no')?.setValue('');
    this.staffLeavePermissionForm.get('staff_name')?.setValue('');
    this.staffLeavePermissionForm.get('date')?.setValue(this.today);
    this.staffLeavePermissionForm.get('l_type')?.setValue(null);
    this.staffLeavePermissionForm.get('fromdate')?.setValue('');
    this.staffLeavePermissionForm.get('todate')?.setValue('');
    this.staffLeavePermissionForm.get('leave_days')?.setValue('');
    this.staffLeavePermissionForm.get('total_days')?.setValue('0');
    this.staffLeavePermissionForm.get('cuid')?.setValue(1);

    this.staffHalfDayPermissionForm.reset();
    this.staffHalfDayPermissionForm.get('month')?.setValue(this.minMonth);
    this.staffHalfDayPermissionForm.get('staff_no')?.setValue('');
    this.staffHalfDayPermissionForm.get('date')?.setValue(this.today);
    this.staffHalfDayPermissionForm.get('l_type')?.setValue(null);
    this.staffHalfDayPermissionForm.get('p_fn')?.setValue(false);
    this.staffHalfDayPermissionForm.get('p_an')?.setValue(false);
    this.staffHalfDayPermissionForm.get('h_leave_days')?.setValue('');
    this.staffHalfDayPermissionForm.get('cuid')?.setValue(1);
  }


  staffHalfDayPermissionForm = new FormGroup({
    staff_no: new FormControl(''),
    month: new FormControl(''),
    date: new FormControl(this.today),
    l_type: new FormControl(null),
    h_leave_days: new FormControl(''),
    p_fn: new FormControl(false),
    p_an: new FormControl(false),
    cuid: new FormControl(1)
  });

  pDayChange() {
    this.pFNChange();
    this.pANChange();
  }

  pFNChange() {
    debugger;
    let Htotal: number = 0;
    if (this.staffHalfDayPermissionForm.value.p_fn == true) { Htotal += 0.5; }
    if (this.staffHalfDayPermissionForm.value.p_an == true) { Htotal += 0.5; }
    const staffNo = this.staffLeavePermissionForm.value.staff_no;
    const Month = this.staffHalfDayPermissionForm.value.month;
    const leaveDays = this.staffHalfDayPermissionForm.value.h_leave_days;
    const FN = this.staffHalfDayPermissionForm.value.p_fn;
    const checkArray = this.AllStaffLeavePermissionHistoryList.filter((e) => {
      debugger;
      return (e.staff_no == staffNo && e.month == Month && e.leave_day == leaveDays) || (e.staff_no == staffNo && e.month == Month && e.leave_day == leaveDays && e.p_fn == FN)
    });

    if (checkArray.length != 0) {
      this.notificationSvc.warn('You Have Alredy Applied Leave On This Day');
      this.staffHalfDayPermissionForm.get('h_leave_days')?.setValue('');
    }
    else {
      const eligibleday = this.StaffLeaveList.filter((e) => { return e.l_type == this.staffHalfDayPermissionForm.value.l_type });
      if (Number(eligibleday[0].balance_eligible) < Htotal) {
        this.staffHalfDayPermissionForm.get('h_leave_days')?.setValue('');
        this.notificationSvc.error('Leave Day Range Must Less Than Or equal To Eligible Day');
      }
    }
  }

  pANChange() {
    debugger;
    let Htotal: number = 0;
    if (this.staffHalfDayPermissionForm.value.p_fn == true) { Htotal += 0.5; }
    if (this.staffHalfDayPermissionForm.value.p_an == true) { Htotal += 0.5; }
    const staffNo = this.staffLeavePermissionForm.value.staff_no;
    const Month = this.staffHalfDayPermissionForm.value.month;
    const leaveDays = this.staffHalfDayPermissionForm.value.h_leave_days;
    const AN = this.staffHalfDayPermissionForm.value.p_an;
    const checkArray = this.AllStaffLeavePermissionHistoryList.filter((e) => {
      debugger;
      return (e.staff_no == staffNo && e.month == Month && e.leave_day == leaveDays) || (e.staff_no == staffNo && e.month == Month && e.leave_day == leaveDays && e.p_an == AN)
    });

    if (checkArray.length != 0) {
      this.notificationSvc.warn('You Have Alredy Applied Leave On This Day');
      this.staffHalfDayPermissionForm.get('h_leave_days')?.setValue('');
    }
    else {
      const eligibleday = this.StaffLeaveList.filter((e) => { return e.l_type == this.staffHalfDayPermissionForm.value.l_type });
      if (Number(eligibleday[0].balance_eligible) < Htotal) {
        this.staffHalfDayPermissionForm.get('h_leave_days')?.setValue('');
        this.notificationSvc.error('Leave Day Range Must Less Than Or equal To Eligible Day');
      }
    }
  }

  pSave() {
    debugger;
    this.staffHalfDayPermissionForm.get('staff_no')?.setValue(this.staffLeavePermissionForm.value.staff_no);
    if (this.staffHalfDayPermissionForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            const formvalue = (this.staffHalfDayPermissionForm.value);
            console.log(formvalue);
            this.slpSvc.addNewHalfDay(formvalue).subscribe(res => {
              debugger;
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

  // cancelClickHalfDay() {
  //   this.getAllStaffLeavePermissionHistory();  
  //   this.StaffLeaveList = [];
  //   this.staffHalfDayPermissionForm.reset();
  //   this.staffHalfDayPermissionForm.get('month')?.setValue(this.minMonth);
  //   this.staffHalfDayPermissionForm.get('staff_no')?.setValue('');
  //   this.staffHalfDayPermissionForm.get('date')?.setValue(this.today);
  //   this.staffHalfDayPermissionForm.get('l_type')?.setValue(null);
  //   this.staffHalfDayPermissionForm.get('p_fn')?.setValue(false);
  //   this.staffHalfDayPermissionForm.get('p_an')?.setValue(false);
  //   this.staffHalfDayPermissionForm.get('leave_days')?.setValue([]);
  //   this.staffHalfDayPermissionForm.get('cuid')?.setValue(1);
  // }
}
