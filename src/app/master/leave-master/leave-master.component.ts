import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { LeaveAssignService } from 'src/app/api-service/LeaveAssign.service';
import { LeaveTypeService } from 'src/app/api-service/LeaveType.service';
import { staffProfileService } from 'src/app/api-service/staffProfile.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';

@Component({
  selector: 'app-leave-master',
  templateUrl: './leave-master.component.html',
  styleUrls: ['./leave-master.component.scss']
})
export class LeaveMasterComponent implements OnInit {
  StaffTypeList: any = [];

  LaveTyList: any = [];
  buttonId: boolean = true;
  MaxId: any = [];

  LaveAsList: any = [];
  AssignMaxId: any = [];
  AssignbuttonId: boolean = true;
  LaveAsByIDList: any = [];
  leaveAssignLeaveTypeFilterList: any = [];

  staffList: any[] = [];

  constructor(private LvtySvc: LeaveTypeService, private SttySvc: staffTypeService,
    private LvAsSvc: LeaveAssignService, private DialogSvc: DialogService,
    private notificationSvc: NotificationsService, private router: Router,
    private staffSvc: staffProfileService,) { this.createForm(); }

  ngOnInit(): void {
    this.refreshstaffTypeList(),

      this.refreshLeaveTypeList(),
      this.getMaxId(),
      this.getAssignMaxId(),

      this.refreshLeaveAssignList(),
      this.cancelClick(),
      this.AssigncancelClick();
    this.refreshLeaveAssignByIDList();
    this.refreshStaffList();
  }

  leavetypeForm = new FormGroup({
    typeid: new FormControl(0),
    type_name: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  refreshLeaveTypeList() {
    this.LvtySvc.getLeaveTypeList().subscribe(data => {
      this.LaveTyList = data;
    });
  }

  NewLeaveType() {
    if (this.leavetypeForm.valid) {
      if (this.leavetypeForm.value.typeid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var leavetypeinsert = (this.leavetypeForm.value);
              this.LvtySvc.addNewleaveType(leavetypeinsert).subscribe(res => {
                console.log(res, 'resss')
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshLeaveTypeList();
                  this.getMaxId();
                  this.cancelClick();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists")
                }
                else {
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
      else if (this.leavetypeForm.value.typeid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var leavetypeinsert = (this.leavetypeForm.value);
              this.LvtySvc.addNewleaveType(leavetypeinsert).subscribe(res => {
                console.log(res, 'resss')
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshLeaveTypeList();
                  this.getMaxId();
                  this.cancelClick();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists")
                }
                else {
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
    }
    else {
      this.leavetypeForm.markAllAsTouched();
    }
  }

  getMaxId() {
    this.LvtySvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  deleteClick(typeid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.LvtySvc.deleteLeaveType(typeid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshLeaveTypeList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  udateGetClick(Leave: any) {
    this.leavetypeForm.get('typeid')?.setValue(Leave.typeid);
    this.leavetypeForm.get('type_name')?.setValue(Leave.type_name);
    this.leavetypeForm.get('fullName')?.setValue(Leave.fullName);
    this.leavetypeForm.get('cuid')?.setValue(Leave.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.leavetypeForm.reset();
    this.leavetypeForm.get('typeid')?.setValue(0);
    this.leavetypeForm.get('type_name')?.setValue('');
    this.leavetypeForm.get('fullName')?.setValue('');
    this.leavetypeForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }


  //Leave Assign
  leaveAssignForm: FormGroup;
  createForm() {
    this.leaveAssignForm = new FormGroup({
      assignid: new FormControl(0),
      staff_type: new FormControl('', [Validators.required]),
      staff_no: new FormControl(''),
      staff_name: new FormControl('', [Validators.required]),
      no_of_leave: new FormControl([Validators.required, Validators.pattern('[0-9]')]),
      e_per_mon: new FormControl([Validators.required, Validators.pattern('[0-9]')]),
      leave: new FormArray([

      ]),
      cuid: new FormControl(1),
    })
  }

  get staff_type() {
    return this.leaveAssignForm.get('staff_type');
  }

  getControls() {
    return (this.leaveAssignForm.get('leave') as FormArray).controls;
  }

  addleave() {
    debugger;
    const control = <FormArray>this.leaveAssignForm.controls['leave'];
    control.push(
      new FormGroup({
        l_type: new FormControl(''),
        elgible: new FormControl('')
      })
    )
  }

  removeLeave(index: any) {
    const control = <FormArray>this.leaveAssignForm.controls['leave'];
    control.removeAt(index);
  }

  //get staff type Method
  refreshstaffTypeList() {
    this.SttySvc.getstaffTypeList().subscribe(data => {
      this.StaffTypeList = data;
    });
  }

  refreshLeaveAssignList() {
    this.LvAsSvc.getLeaveAssignList().subscribe(data => {
      this.LaveAsList = data;
    });
  }

  refreshLeaveAssignByIDList() {
    this.LvAsSvc.getLeaveAssignByIDList().subscribe(data => {
      this.LaveAsByIDList = data;
    });
  }

  refreshStaffList() {
    this.staffSvc.getstaffProfileList().subscribe(data => {
      const staffArray = data;
      this.staffList = staffArray.filter((e) => { return e.activestatus == 1 });
    });
  }

  staffNameChange(value) {
    debugger
    const newarray = this.staffList.filter((e) => { return e.staff_no == value })
    this.leaveAssignForm.get('staff_name')?.setValue(newarray[0].staff_name)
  }


  NewLeaveAssign() {
    debugger;
    if (this.leaveAssignForm.valid) {
      if (this.leaveAssignForm.value.assignid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var leaveAssigninsert = (this.leaveAssignForm.value);
              this.LvAsSvc.addNewleaveAssign(leaveAssigninsert).subscribe(res => {
                console.log(res, 'resss')
                if (res?.recordid) {
                  this.notificationSvc.success("Saved Success")
                  this.refreshLeaveAssignList();
                  this.refreshLeaveAssignByIDList();
                  this.refreshstaffTypeList();
                  this.getAssignMaxId();
                  this.AssigncancelClick();
                  this.refreshStaffList();
                }
              });
            }
          });
      }
      else if (this.leaveAssignForm.value.assignid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var leaveAssigninsert = (this.leaveAssignForm.value);
              this.LvAsSvc.addNewleaveAssign(leaveAssigninsert).subscribe(res => {
                console.log(res, 'resss')
                if (res?.recordid) {
                  this.notificationSvc.success("Updated Success")
                  this.refreshLeaveAssignList();
                  this.refreshLeaveAssignByIDList();
                  this.refreshstaffTypeList();
                  this.getAssignMaxId();
                  this.AssigncancelClick();
                }
              });
            }
          });
      }

    }
    else {
      this.leaveAssignForm.markAllAsTouched();
    }
  }

  getAssignMaxId() {
    this.LvAsSvc.getAssignMaxId().subscribe(data => {
      this.AssignMaxId = data;
    });
  }

  AssigndeleteClick(assignid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.LvAsSvc.deleteLeaveAssign(assignid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshLeaveAssignList();
              this.refreshLeaveAssignByIDList();
              this.refreshstaffTypeList();
              this.getAssignMaxId();
              this.AssigncancelClick();
              this.refreshStaffList();
            }
          });
        }
      });
  }

  AssignUpdateGetClick(assign: any) {
    const control = <FormArray>this.leaveAssignForm.controls['leave'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
    this.leaveAssignForm.patchValue(assign)
    this.AssignbuttonId = false;
    this.leaveAssignLeaveTypeFilterList = this.LaveAsByIDList.filter((e: any) => { return e.assignid == assign.assignid });
    console.log(1 + this.leaveAssignLeaveTypeFilterList)
    this.leaveAssignLeaveTypeFilterList.forEach(element => {
      const control = <FormArray>this.leaveAssignForm.controls['leave'];
      control.push(
        new FormGroup({
          l_type: new FormControl(element.l_type),
          elgible: new FormControl(element.elgible)
        })
      )
    });
  }

  eligibleFun(i) {
    let total: number = 0;
    const EPerMonth = this.leaveAssignForm.value.e_per_mon
    const busControl3 = this.leaveAssignForm.get('leave') as FormArray;
    const eligibleDays = busControl3.at(i).get('elgible').value;
    const elDays = this.leaveAssignForm.get('leave') as FormArray;
    elDays.controls.forEach((e) => {
      debugger;
      const num = Number(e.value.elgible);
      total = total + num;
    })
    if (Number(EPerMonth) < Number(eligibleDays) || Number(EPerMonth) < total) {
      this.notificationSvc.error('Invalid Eligible Days');
      busControl3.at(i).get('elgible').setValue('');
    }
  }

  AssigncancelClick() {
    this.leaveAssignForm.reset();
    this.refreshStaffList();
    this.leaveAssignForm.get('assignid')?.setValue(0);
    this.leaveAssignForm.get('staff_type')?.setValue('');
    this.leaveAssignForm.get('staff_name')?.setValue('');
    this.leaveAssignForm.get('staff_no')?.setValue('');
    this.leaveAssignForm.get('no_of_leave')?.setValue(null);
    this.leaveAssignForm.get('e_per_mon')?.setValue(null);
    this.leaveAssignForm.get('cuid')?.setValue(1);
    this.AssignbuttonId = true;

    const control = <FormArray>this.leaveAssignForm.controls['leave'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
  }
}