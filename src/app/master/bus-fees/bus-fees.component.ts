import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { VehicleTypeService } from 'src/app/api-service/VehicleType.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { BusFeesAssignService } from 'src/app/api-service/busFeesAssign.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';

@Component({
  selector: 'app-bus-fees',
  templateUrl: './bus-fees.component.html',
  styleUrls: ['./bus-fees.component.scss']
})
export class BusFeesComponent implements OnInit {
  vehicleTypeList: any[] = [];
  ClassList: any = [];
  activeBatchYear: any = [];
  newgetbatch: string;
  busFeeList: any[] = [];
  //kmvalue: string = 'KM';
  constructor(private VhtySvc: VehicleTypeService, private router: Router,
    private ClassSvc: studentClassService, private notificationSvc: NotificationsService,
    private batchSvc: BatechYearService,
    private DialogSvc: DialogService,
    private busFeSvc: BusFeesAssignService) { }

  ngOnInit(): void {
    this.refreshvehicleTypeList();
    this.GetActiveBatchYear();
    this.refreshBusFeeList();
  }

  GetActiveBatchYear() {
    this.batchSvc.GetActiveBatchYear().subscribe(data => {
      this.activeBatchYear = data;
      const getbatch = JSON.stringify(this.activeBatchYear[0].batch_year)
      this.newgetbatch = (getbatch.replace(/['"]+/g, ''));
      this.busFeesForm.get('batch_year')?.setValue(this.newgetbatch);
    });
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  refreshvehicleTypeList() {
    this.VhtySvc.getvehicleTypeList().subscribe(data => {
      this.vehicleTypeList = data;
    });
  }

  refreshBusFeeList() {
    this.busFeSvc.getBusFeesList().subscribe(data => {
      debugger;
      this.busFeeList = data;
    });
  }

  autokm() {
    debugger;
    var regExp = /[a-zA-Z]/g;
    var num = /([0-9]+)/g;
    const km = this.busFeesForm.value.kmrange
    if (regExp.test(km) && km != null) {
      const myArray = km.split(/([0-9]+)/)
      this.busFeesForm.get('kmrange')?.setValue(myArray[1] + 'KM');
    }
    else if (num.test(km) && km != null) {
      this.busFeesForm.get('kmrange')?.setValue(km + 'KM');
    }
    else {
      this.busFeesForm.get('kmrange')?.setValue('');
    }
  }

  refreshClassList() {
    debugger;
    if (this.busFeesForm.valid) {
      this.ClassSvc.getClassList().subscribe(data => {
        this.ClassList = data;
        this.ClassList.forEach(e => {
          e['busfeeid'] = 0;
          e['amount'] = '';
        });

        const control = <FormArray>this.busFeesForm.controls['classfeelist'];
        while (control.length !== 0) {
          control.removeAt(0)
        }

        if (control.length == 0) {

          const typeFilterArray = this.busFeeList.filter((e) => {
            return e.batch_year == this.busFeesForm.value.batch_year
              && e.vehicle_type == this.busFeesForm.value.vehicle_type
              && e.kmrange == this.busFeesForm.value.kmrange
          });

          const result = typeFilterArray.concat(this.ClassList.filter(x => typeFilterArray.every(c => x.classid !== c.classid)));

          result.forEach(element => {
            const control = <FormArray>this.busFeesForm.controls['classfeelist'];
            control.push(
              new FormGroup({
                busfeeid: new FormControl(element.busfeeid),
                vehicle_type: new FormControl(this.busFeesForm.value.vehicle_type),
                kmrange: new FormControl(this.busFeesForm.value.kmrange),
                batch_year: new FormControl(this.busFeesForm.value.batch_year),
                class_name: new FormControl(element.class_name),
                classid: new FormControl(element.classid),
                amount: new FormControl(element.amount),
                cuid: new FormControl(this.busFeesForm.value.cuid),
              })
            )
          });
        }
        else {
          this.notificationSvc.error('Something error');
        }
      });
    }
    else {
      this.busFeesForm.markAllAsTouched();
    }
  }

  busFeesForm = new FormGroup({
    busfeeid: new FormControl(0),
    vehicle_type: new FormControl(''),
    kmrange: new FormControl(''),
    batch_year: new FormControl(''),
    cuid: new FormControl(1),
    classfeelist: new FormArray([])
  });
  getControls() {
    return (this.busFeesForm.get('classfeelist') as FormArray).controls;
  }

  save() {
    const control = <FormArray>this.busFeesForm.controls['classfeelist'];
    if (control.length != 0) {
      if (this.busFeesForm.value.busfeeid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var insert = (this.busFeesForm.value.classfeelist);
              this.busFeSvc.addNewBusFees(insert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success");
                  this.refreshBusFeeList();
                  this.busFeesCancel();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists");
                  this.refreshBusFeeList();
                }
                else {
                  this.notificationSvc.error("Something error")
                }
              });
            }
          });
      }
      else {
        this.DialogSvc.openConfirmDialog('Are you sure want to Update this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var insert = (this.busFeesForm.value.classfeelist);
              this.busFeSvc.addNewBusFees(insert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success");
                  this.refreshBusFeeList();
                  this.busFeesCancel();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists");
                  this.refreshBusFeeList();
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
      this.busFeesForm.markAllAsTouched();
      this.notificationSvc.error('There are no details to save')
    }
  }

  busFeeDelete(busfeeid) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.busFeSvc.deleteBusFees(busfeeid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshBusFeeList();
              this.busFeesCancel()
            }
          });
        }
      });
  }

  busFeesCancel() {
    this.busFeesForm.reset();
    this.busFeesForm.get('busfeeid')?.setValue(0);
    this.busFeesForm.get('vehicle_type')?.setValue('');
    this.busFeesForm.get('kmrange')?.setValue('');
    this.busFeesForm.get('batch_year')?.setValue(this.newgetbatch);
    this.busFeesForm.get('cuid')?.setValue(0);

    const control = <FormArray>this.busFeesForm.controls['classfeelist'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
  };

}
