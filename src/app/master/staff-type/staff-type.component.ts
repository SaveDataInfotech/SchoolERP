import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { staffTypeService } from 'src/app/api-service/staffType.service';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';


@Component({
  selector: 'app-staff-type',
  templateUrl: './staff-type.component.html',
  styleUrls: ['./staff-type.component.scss']
})
export class StaffTypeComponent implements OnInit {
  DepartmentList: any = [];
  MaxId: any = [];
  buttonId: boolean = true;

  constructor(
    private stySvc: staffTypeService, private DialogSvc: DialogService,
    private notificationSvc: NotificationsService, private router: Router) {
  }
  ngOnInit(): void {
    this.refreshstaffTypeList(),
      this.getMaxId(),
      this.cancelClick()
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  stafftypeForm = new FormGroup({
    staffTypeid: new FormControl(0),
    stafftype: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+)$/)]),
    cuid: new FormControl(1),
  })

  refreshstaffTypeList() {
    this.stySvc.getstaffTypeList().subscribe(data => {
      this.DepartmentList = data;
    });
  }

  StaffType() {
    if (this.stafftypeForm.valid) {
      if (this.stafftypeForm.value.staffTypeid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var stafftypeinsert = (this.stafftypeForm.value);
              this.stySvc.addNewstaffType(stafftypeinsert).subscribe(res => {
                
                console.log(res, 'resss')
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved successfully")
                  this.refreshstaffTypeList();
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
      else if (this.stafftypeForm.value.staffTypeid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var stafftypeinsert = (this.stafftypeForm.value);
              this.stySvc.addNewstaffType(stafftypeinsert).subscribe(res => {
                
                console.log(res, 'resss')
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshstaffTypeList();
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
      else {
        alert("something error;")
      }
    }
    else {
      this.stafftypeForm.markAllAsTouched();
    }

  }

  getMaxId() {
    this.stySvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }


  //sample  for Dialog working
  deleteClick(staffTypeid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.stySvc.deletestaffType(staffTypeid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshstaffTypeList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  udateGetClick(staffType: any) {
    this.stafftypeForm.get('staffTypeid')?.setValue(staffType.staffTypeid);
    this.stafftypeForm.get('stafftype')?.setValue(staffType.staffType);
    this.stafftypeForm.get('cuid')?.setValue(staffType.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.stafftypeForm.reset();
    this.stafftypeForm.get('staffTypeid')?.setValue(0);
    this.stafftypeForm.get('stafftype')?.setValue('');
    this.stafftypeForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }

}
