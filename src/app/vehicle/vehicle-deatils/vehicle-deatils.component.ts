import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { VehicleProcessTypeService } from 'src/app/api-service/vehicleProcessType.service';

@Component({
  selector: 'app-vehicle-deatils',
  templateUrl: './vehicle-deatils.component.html',
  styleUrls: ['./vehicle-deatils.component.scss']
})
export class VehicleDeatilsComponent implements OnInit {
  MaxId: any = [];
  processTypeList: any = [];


  constructor(private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private vPtSvc: VehicleProcessTypeService,
    private router: Router) { }

  ngOnInit(): void {
    this.getMaxId();
    this.refreshProcesstypeList();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  getMaxId() {
    this.vPtSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }
  refreshProcesstypeList() {
    this.vPtSvc.getvehicleProcessTypeList().subscribe(data => {
      this.processTypeList = data;
    });
  }


  vehicleProcessTypeForm = new FormGroup({
    processid: new FormControl(0),
    process_name: new FormControl(''),
    cuid: new FormControl(1)
  });


  newProcessType() {
    if (this.vehicleProcessTypeForm.valid) {
      if (this.vehicleProcessTypeForm.value.processid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var roleinsert = (this.vehicleProcessTypeForm.value);
              this.vPtSvc.addNewvehicleProcessType(roleinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshProcesstypeList();
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
      else if (this.vehicleProcessTypeForm.value.processid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var roleinsert = (this.vehicleProcessTypeForm.value);
              this.vPtSvc.addNewvehicleProcessType(roleinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshProcesstypeList();
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
      this.vehicleProcessTypeForm.markAllAsTouched();
    }
  }

  udateGetClick(type) {
    this.vehicleProcessTypeForm.patchValue(type);
    this.vehicleProcessTypeForm.get('cuid')?.setValue(1);
  }

  deleteClick(id: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.vPtSvc.deletevehicleProcessType(id).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshProcesstypeList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  cancelClick() {
    this.vehicleProcessTypeForm.reset();
    this.vehicleProcessTypeForm.get('processid')?.setValue(0);
    this.vehicleProcessTypeForm.get('process_name')?.setValue('');
    this.vehicleProcessTypeForm.get('cuid')?.setValue(1);
  }
}
