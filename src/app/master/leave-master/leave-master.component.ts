import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { LeaveAssignService } from 'src/app/api-service/LeaveAssign.service';
import { LeaveTypeService } from 'src/app/api-service/LeaveType.service';
import { staffCategoryService } from 'src/app/api-service/staffCategory.service';

@Component({
  selector: 'app-leave-master',
  templateUrl: './leave-master.component.html',
  styleUrls: ['./leave-master.component.scss']
})
export class LeaveMasterComponent implements OnInit {
  LaveTyList: any = [];
  buttonId: boolean = true;
  MaxId: any = [];

  LaveAsList: any = [];
  AssignMaxId: any = [];
  AssignbuttonId: boolean = true;
  categoryList: any[] = [];

  constructor(private LvtySvc: LeaveTypeService,
    private LvAsSvc: LeaveAssignService, private DialogSvc: DialogService,
    private notificationSvc: NotificationsService, private router: Router,
    private scSvc: staffCategoryService,
  ) { this.createForm(); }

  ngOnInit(): void {
    this.refreshLeaveTypeList(),
      this.getMaxId(),
      this.getAssignMaxId(),

      this.refreshLeaveAssignList(),
      this.cancelClick(),
      this.AssigncancelClick();
    this.refreshstaffCategoryList();
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
      this.LaveTyList.forEach(e => {
        e['assignid'] = 0;
        e['eligible_days'] = '0';
        e['m_days'] = '0';
      });
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
    this.leavetypeForm.patchValue(Leave);

    this.leavetypeForm.get('cuid')?.setValue(Leave.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.leavetypeForm.reset();
    this.AssigncancelClick();
    this.leavetypeForm.get('typeid')?.setValue(0);
    this.leavetypeForm.get('type_name')?.setValue('');
    this.leavetypeForm.get('fullName')?.setValue('');
    this.leavetypeForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }


  //Leave Assign

  refreshstaffCategoryList() {
    this.scSvc.getCategoryList().subscribe(data => {
      this.categoryList = data;
    });
  }
  refreshLeaveAssignList() {
    this.LvAsSvc.getLeaveAssignList().subscribe(data => {
      this.LaveAsList = data;
    });
  }

  leaveAssignForm: FormGroup;
  createForm() {
    this.leaveAssignForm = new FormGroup({
      assignid: new FormControl(0),
      category_id: new FormControl(null, [Validators.required]),
      leave: new FormArray([

      ]),
      cuid: new FormControl(1),
    })
  }

  getControls() {
    return (this.leaveAssignForm.get('leave') as FormArray).controls;
  }

  NewLeaveAssign() {
    
    if (this.leaveAssignForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(res => {
          if (res == true) {
            
            var leaveAssigninsert = (this.leaveAssignForm.value.leave);
            this.LvAsSvc.addNewleaveAssign(leaveAssigninsert).subscribe(res => {
              if (res.status == 'Saved successfully') {
                this.notificationSvc.success("Saved Success");
                this.AssigncancelClick();
              }
              else if (res.status == 'Already exists') {
                this.notificationSvc.warn("Already exists");
                this.AssigncancelClick();
              }
              else {
                this.notificationSvc.error("Something error");
              }
            });
          }
        });
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
              this.notificationSvc.error("Deleted Success");
              this.AssigncancelClick();
            }
          });
        }
      });
  }

  leaveList() {
    const control = <FormArray>this.leaveAssignForm.controls['leave'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
    if (control.length == 0) {
      const laveFilterArray = this.LaveAsList.filter((e) => { return e.category_id == this.leaveAssignForm.value.category_id });
      const result = laveFilterArray.concat(this.LaveTyList.filter(x => laveFilterArray.every(typeid => x.typeid !== typeid.typeid)));
      result.forEach(element => {
        control.push(
          new FormGroup({
            assignid: new FormControl(element.assignid),
            category_id: new FormControl(this.leaveAssignForm.value.category_id),
            typeid: new FormControl(element.typeid),
            type_name: new FormControl(element.type_name),
            eligible_days: new FormControl(element.eligible_days),
            m_days: new FormControl(element.m_days),
            cuid: new FormControl(1),
          })
        )
      });
    }
  }

  Update(assign) {
    const control = <FormArray>this.leaveAssignForm.controls['leave'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
    if (control.length == 0) {
      const laveFilterArray = this.LaveAsList.filter((e) => { return e.assignid == assign });
      this.leaveAssignForm.get('category_id')?.setValue(laveFilterArray[0].category_id)
      laveFilterArray.forEach(element => {
        control.push(
          new FormGroup({
            assignid: new FormControl(element.assignid),
            category_id: new FormControl(element.category_id),
            typeid: new FormControl(element.typeid),
            type_name: new FormControl(element.type_name),
            eligible_days: new FormControl(element.eligible_days),
            m_days: new FormControl(element.m_days),
            cuid: new FormControl(1),
          })
        )
      });
    }
  }

  AssigncancelClick() {
    this.leaveAssignForm.reset();
    this.refreshLeaveAssignList();
    this.getAssignMaxId();
    this.leaveAssignForm.get('assignid')?.setValue(0);
    this.leaveAssignForm.get('category_id')?.setValue(null);
    this.leaveAssignForm.get('cuid')?.setValue(1);
    this.AssignbuttonId = true;
    const control = <FormArray>this.leaveAssignForm.controls['leave'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
  }
}