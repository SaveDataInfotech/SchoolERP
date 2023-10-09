import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { FeesLessService } from 'src/app/api-service/FeesLess.service';
import { VehicleTypeService } from 'src/app/api-service/VehicleType.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { BusFeesAssignService } from 'src/app/api-service/busFeesAssign.service';

@Component({
  selector: 'app-special-bus-fees',
  templateUrl: './special-bus-fees.component.html',
  styleUrls: ['./special-bus-fees.component.scss']
})
export class SpecialBusFeesComponent implements OnInit {
  activeBatchYear: any = [];
  newgetbatch: string;
  vehicleTypeList: any[] = [];
  busFeeList: any[] = [];
  FeesLessList: any = [];
  constructor(private router: Router,
    private notificationSvc: NotificationsService,
    private VhtySvc: VehicleTypeService,
    private batchSvc: BatechYearService,
    private busFeSvc: BusFeesAssignService,
    private FlSvc: FeesLessService,) { }

  ngOnInit(): void {
    this.GetActiveBatchYear();
    this.refreshvehicleTypeList();
    this.refreshFeesLessList()
  }

  GetActiveBatchYear() {
    this.batchSvc.GetActiveBatchYear().subscribe(data => {
      this.activeBatchYear = data;
      const getbatch = JSON.stringify(this.activeBatchYear[0].batch_year)
      this.newgetbatch = (getbatch.replace(/['"]+/g, ''));
      this.specialBusFeesform.get('batch_year')?.setValue(this.newgetbatch);
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

  refreshFeesLessList() {
    this.FlSvc.getfeesLessList().subscribe(data => {
      this.FeesLessList = data;
    });
  }

  autokm() {
    debugger;
    var regExp = /[a-zA-Z]/g;
    var num = /([0-9]+)/g;
    const km = this.specialBusFeesform.value.kmrange
    if (regExp.test(km) && km != null) {
      const myArray = km.split(/([0-9]+)/)
      this.specialBusFeesform.get('kmrange')?.setValue(myArray[1] + 'KM');
    }
    else if (num.test(km) && km != null) {
      this.specialBusFeesform.get('kmrange')?.setValue(km + 'KM');
    }
    else {
      this.specialBusFeesform.get('kmrange')?.setValue('');
    }
  }

  specialBusFeesform = new FormGroup({
    s_busfeeid: new FormControl(0),
    vehicle_type: new FormControl(''),
    kmrange: new FormControl(''),
    less_type:new FormControl(''),
    batch_year: new FormControl(''),
    cuid: new FormControl(1),
    s_classfeelist: new FormArray([])
  });

  getControls() {
    return (this.specialBusFeesform.get('s_classfeelist') as FormArray).controls;
  }

  busFeeListArray() {
    this.busFeSvc.getBusFeesList().subscribe(data => {
      debugger;
      this.busFeeList = data;


      const control = <FormArray>this.specialBusFeesform.controls['s_classfeelist'];
      while (control.length !== 0) {
        control.removeAt(0)
      }

      if (control.length == 0) {

        // const typeFilterArray = this.busFeeList.filter((e) => {
        //   return e.batch_year == this.busFeesForm.value.batch_year
        //     && e.vehicle_type == this.busFeesForm.value.vehicle_type
        //     && e.kmrange == this.busFeesForm.value.kmrange
        // });

        this.busFeeList.forEach(element => {
          const control = <FormArray>this.specialBusFeesform.controls['s_classfeelist'];
          control.push(
            new FormGroup({
              s_busfeeid: new FormControl(element.s_busfeeid),
              vehicle_type: new FormControl(this.specialBusFeesform.value.vehicle_type),
              kmrange: new FormControl(this.specialBusFeesform.value.kmrange),
              less_type: new FormControl(this.specialBusFeesform.value.less_type),
              batch_year: new FormControl(this.specialBusFeesform.value.batch_year),
              class_name: new FormControl(element.class_name),
              classid: new FormControl(element.classid),
              amount: new FormControl(element.amount),
              cuid: new FormControl(this.specialBusFeesform.value.cuid),
            })
          )
        });
      }
      else {
        this.notificationSvc.error('Something error');
      }
    });
  }

  saveSpecialbusfee() {
    console.log(this.specialBusFeesform);
  }

}
