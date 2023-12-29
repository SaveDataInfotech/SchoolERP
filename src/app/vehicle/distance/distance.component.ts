import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { VehicleAssignService } from 'src/app/api-service/vehicleAssign.service';
import { VehicleDistanceService } from 'src/app/api-service/vehicleDistance.service';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.scss']
})
export class DistanceComponent implements OnInit {
  vehicleAssignList: any[] = [];
  vehicleDistanceList: any[] = [];

  constructor(private vhASvc: VehicleAssignService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private vDSvc: VehicleDistanceService,
    private router: Router) { }

  date1 = new Date();
  currentYear = this.date1.getUTCFullYear();
  currentMonth = this.date1.getUTCMonth() + 1;
  currentDate = this.date1.getUTCDate();
  today = "2023-12-12";
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

    this.vehicleDistanceForm.get('date')?.setValue(this.today);
    this.refreshVehicleAssignList();
    this.refreshvehicleDistanceList();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  refreshVehicleAssignList() {
    this.vhASvc.getvehicleAssignList().subscribe(data => {
      this.vehicleAssignList = data
    });
  }

  refreshvehicleDistanceList() {
    this.vDSvc.getvehicleDistanceList().subscribe(data => {
      this.vehicleDistanceList = data;
    });
  }


  getVehicleDetails() {
    
    const vehicleNo = this.vehicleDistanceForm.value.vehicle_no_id;
    const newVehicleDetails = this.vehicleAssignList.filter((e) => { return e.vehicle_no_id == vehicleNo });
    this.vehicleDistanceForm.get('driver_name')?.setValue(newVehicleDetails[0].driver_name);
    this.vehicleDistanceForm.get('helper_name')?.setValue(newVehicleDetails[0].helper_name)
    this.vehicleDistanceForm.get('vehicle_root_no')?.setValue(newVehicleDetails[0].vehicle_root_no)
  }

  vehicleDistanceForm = new FormGroup({
    distanceid: new FormControl(0),
    date: new FormControl(''),
    vehicle_no_id: new FormControl(null),
    vehicle_root_no: new FormControl(''),
    driver_name: new FormControl(''),
    helper_name: new FormControl(''),
    km_start: new FormControl(''),
    km_end: new FormControl(''),
    cuid: new FormControl(1)
  });


  newDistance() {
    
    if (this.vehicleDistanceForm.valid) {
      if (this.vehicleDistanceForm.value.distanceid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var values = (this.vehicleDistanceForm.value);
              this.vDSvc.addNewvehicleDistance(values).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshvehicleDistanceList();
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
      else if (this.vehicleDistanceForm.value.distanceid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var values = (this.vehicleDistanceForm.value);
              this.vDSvc.addNewvehicleDistance(values).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshvehicleDistanceList();
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
      this.vehicleDistanceForm.markAllAsTouched();
    }
  }

  updateClick(item) {
    
    this.vehicleDistanceForm.patchValue(item);
    this.vehicleDistanceForm.get('cuid')?.setValue(1);
  }

  deleteClick(id: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.vDSvc.deletevehicleDistance(id).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshvehicleDistanceList();
            }
          });
        }
      });
  }

  cancelClick() {
    this.vehicleDistanceForm.reset();
    this.vehicleDistanceForm.get('distanceid')?.setValue(0);
    this.vehicleDistanceForm.get('date')?.setValue(this.today);
    this.vehicleDistanceForm.get('vehicle_root_no')?.setValue('');
    this.vehicleDistanceForm.get('driver_name')?.setValue('');
    this.vehicleDistanceForm.get('helper_name')?.setValue('');
    this.vehicleDistanceForm.get('km_start')?.setValue('');
    this.vehicleDistanceForm.get('km_end')?.setValue('');

    this.vehicleDistanceForm.get('cuid')?.setValue(1);
  }
}
