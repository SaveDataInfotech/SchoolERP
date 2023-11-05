import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { VehicleNoRootService } from 'src/app/api-service/VehicleNoRoot.service';
import { VehicleTypeService } from 'src/app/api-service/VehicleType.service';
import { staffProfileService } from 'src/app/api-service/staffProfile.service';
import { VehicleAssignService } from 'src/app/api-service/vehicleAssign.service';

@Component({
  selector: 'app-vehicle-assign',
  templateUrl: './vehicle-assign.component.html',
  styleUrls: ['./vehicle-assign.component.scss']
})
export class VehicleAssignComponent implements OnInit {
  vehicleTypeList: any[] = [];
  vehicleNoRootList: any[] = [];
  staffList: any[] = [];
  vehicleAssignList: any[] = [];
  filteredVehicleNoRootList: any[] = [];
  constructor(private VhtySvc: VehicleTypeService,
    private vhNoRtSvc: VehicleNoRootService,
    private staffSvc: staffProfileService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private vhASvc: VehicleAssignService,
    private router: Router) { }

  ngOnInit(): void {
    this.refreshvehicleTypeList();
    this.refreshvehicleNoRootList();
    this.refreshStaffList();
    this.refreshVehicleAssignList();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  refreshvehicleTypeList() {
    this.VhtySvc.getvehicleTypeList().subscribe(data => {
      this.vehicleTypeList = data;
    });
  }

  refreshvehicleNoRootList() {
    this.vhNoRtSvc.getVeNoRtList().subscribe(data => {
      this.vehicleNoRootList = data;
    });
  }

  refreshStaffList() {
    this.staffSvc.getstaffProfileList().subscribe(data => {
      this.staffList = data.filter((e) => { return e.activestatus == 1 })
    });
  }

  refreshVehicleAssignList() {
    this.vhASvc.getvehicleAssignList().subscribe(data => {
      this.vehicleAssignList = data
    });
  }

  vehicleNofilter() {
    debugger;
    const Typeid = this.vehicleAssignForm.value.typeid;
    this.filteredVehicleNoRootList = this.vehicleNoRootList.filter((e) => { return e.typeid == Typeid })
  }

  vehicleAssignForm = new FormGroup({
    vehicle_assignid: new FormControl(0),
    typeid: new FormControl(null),
    vehicle_no_id: new FormControl(),
    driver_no: new FormControl(''),
    helper_no: new FormControl(''),
    no_of_students: new FormControl(''),
    cuid: new FormControl(1)
  });

  newAssign() {
    if (this.vehicleAssignForm.valid) {
      if (this.vehicleAssignForm.value.vehicle_assignid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var values = (this.vehicleAssignForm.value);
              this.vhASvc.addNewvehicleAssign(values).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshVehicleAssignList();
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
      else if (this.vehicleAssignForm.value.vehicle_assignid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var values = (this.vehicleAssignForm.value);
              this.vhASvc.addNewvehicleAssign(values).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshVehicleAssignList();
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
      this.vehicleAssignForm.markAllAsTouched();
    }
  }

  updateClick(assign) {
    this.vehicleAssignForm.patchValue(assign);
    this.vehicleAssignForm.get('cuid')?.setValue(1);
  }


  deleteClick(id: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.vhASvc.deletevehicleAssign(id).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshVehicleAssignList();
              this.cancelClick();
            }
          });
        }
      });
  }

  cancelClick() {
    this.vehicleAssignForm.reset();
    this.vehicleAssignForm.get('vehicle_assignid')?.setValue(0);
    this.vehicleAssignForm.get('driver_no')?.setValue('');
    this.vehicleAssignForm.get('helper_no')?.setValue('');
    this.vehicleAssignForm.get('no_of_students')?.setValue('');
    this.vehicleAssignForm.get('cuid')?.setValue(1);
  }
}
