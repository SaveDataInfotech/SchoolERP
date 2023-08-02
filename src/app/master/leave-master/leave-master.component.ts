import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { LeaveAssignService } from 'src/app/api-service/LeaveAssign.service';
import { LeaveTypeService } from 'src/app/api-service/LeaveType.service';
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

  constructor(private LvtySvc: LeaveTypeService, private SttySvc: staffTypeService,
    private LvAsSvc: LeaveAssignService, private DialogSvc: DialogService,
    private notificationSvc: NotificationsService) { }

  ngOnInit(): void {
    this.refreshstaffTypeList(),

      this.refreshLeaveTypeList(),
      this.getMaxId(),
      this.getAssignMaxId(),

      this.refreshLeaveAssignList(),
      this.cancelClick(),
      this.AssigncancelClick()
  }

  leavetypeForm = new FormGroup({
    typeid: new FormControl(0),
    type_name: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })


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
                if (res?.recordid) {
                  this.notificationSvc.success("Saved Success")
                  this.refreshLeaveTypeList();
                  this.getMaxId();
                  this.cancelClick();
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
                if (res?.recordid) {
                  this.notificationSvc.success("Updated Success")
                  this.refreshLeaveTypeList();
                  this.getMaxId();
                  this.cancelClick();
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

  leaveAssignForm = new FormGroup({
    assignid: new FormControl(0),
    staff_type: new FormControl('', [Validators.required]),
    staff_name: new FormControl('', [Validators.required]),
    no_of_leave: new FormControl([Validators.required, Validators.pattern('[0-9]')]),
    e_per_mon: new FormControl([Validators.required, Validators.pattern('[0-9]')]),
    cuid: new FormControl(1),
  })

  get staff_type() {
    return this.leaveAssignForm.get('staff_type');
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

  NewLeaveAssign() {
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
                  this.refreshstaffTypeList();
                  this.getAssignMaxId();
                  this.AssigncancelClick();
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
              this.refreshstaffTypeList();
              this.getAssignMaxId();
              this.AssigncancelClick();
            }
          });
        }
      });
  }

  AssignUpdateGetClick(assign: any) {
    this.leaveAssignForm.get('assignid')?.setValue(assign.assignid);
    this.leaveAssignForm.get('staff_type')?.setValue(assign.staff_type);
    this.leaveAssignForm.get('staff_name')?.setValue(assign.staff_name);
    this.leaveAssignForm.get('no_of_leave')?.setValue(assign.no_of_leave);
    this.leaveAssignForm.get('e_per_mon')?.setValue(assign.e_per_mon);
    this.leaveAssignForm.get('cuid')?.setValue(assign.cuid);
    this.AssignbuttonId = false;
  }

  AssigncancelClick() {
    this.leaveAssignForm.reset();
    this.leaveAssignForm.get('assignid')?.setValue(0);
    this.leaveAssignForm.get('staff_type')?.setValue('');
    this.leaveAssignForm.get('staff_name')?.setValue('');
    this.leaveAssignForm.get('no_of_leave')?.setValue(null);
    this.leaveAssignForm.get('e_per_mon')?.setValue(null);
    this.leaveAssignForm.get('cuid')?.setValue(1);
    this.AssignbuttonId = true;
  }
}