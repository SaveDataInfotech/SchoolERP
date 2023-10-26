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

  letterOnly(event) {
    var charCode = event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)

      return true;
    else
      return false;
  }

  stafftypeForm = new FormGroup({
    staff_typeid: new FormControl(0),
    staff_type: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+)$/)]),
    short_code: new FormControl(''),
    cuid: new FormControl(1),
  })

  refreshstaffTypeList() {
    this.stySvc.getstaffTypeList().subscribe(data => {
      this.DepartmentList = data;
    });
  }

  StaffType() {
    if (this.stafftypeForm.valid) {
      if (this.stafftypeForm.value.staff_typeid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var stafftypeinsert = (this.stafftypeForm.value);
              this.stySvc.addNewstaffType(stafftypeinsert).subscribe(res => {
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
      else if (this.stafftypeForm.value.staff_typeid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var stafftypeinsert = (this.stafftypeForm.value);
              this.stySvc.addNewstaffType(stafftypeinsert).subscribe(res => {
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
  deleteClick(staff_typeid: number) {
    debugger;
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.stySvc.deletestaffType(staff_typeid).subscribe(res => {
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

  udateGetClick(value: any) {
    this.stafftypeForm.get('staff_typeid')?.setValue(value.staff_typeid);
    this.stafftypeForm.get('staff_type')?.setValue(value.staff_type);
    this.stafftypeForm.get('short_code')?.setValue(value.short_code);
    this.stafftypeForm.get('cuid')?.setValue(1);
    this.buttonId = false;
  }

  cancelClick() {
    this.stafftypeForm.reset();
    this.stafftypeForm.get('staff_typeid')?.setValue(0);
    this.stafftypeForm.get('staff_type')?.setValue('');
    this.stafftypeForm.get('short_code')?.setValue('');
    this.stafftypeForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }

}
