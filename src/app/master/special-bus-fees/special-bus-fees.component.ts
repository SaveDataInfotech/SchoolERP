import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { FeesLessService } from 'src/app/api-service/FeesLess.service';
import { VehicleTypeService } from 'src/app/api-service/VehicleType.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { BusFeesAssignService } from 'src/app/api-service/busFeesAssign.service';
import { Directive, ElementRef } from '@angular/core';
import { SpecialBusFeesAssignService } from 'src/app/api-service/specialBusFee.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';

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
  specialBusFeesList: any[] = [];
  ClassnameList: any[] = [];
  specialGroupBusFeesList: any[] = [];
  value: any;
  @ViewChild('input', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus()
    }
  }

  constructor(private router: Router,
    private notificationSvc: NotificationsService,
    private VhtySvc: VehicleTypeService,
    private batchSvc: BatechYearService,
    private DialogSvc: DialogService,
    private busFeSvc: BusFeesAssignService,
    private FlSvc: FeesLessService,
    private spBusSvc: SpecialBusFeesAssignService,
    private ClassSvc: studentClassService,) { }

  ngOnInit(): void {
    this.GetActiveBatchYear();
    this.refreshvehicleTypeList();
    this.refreshFeesLessList();

    this.busFeeListArray();
    this.refreshSpecialBusFeeList();
    this.refreshspecialGroupBusFeeList();
    this.ClassSvc.getClassList().subscribe(data => {
      this.ClassnameList = data
    })
  }

  busFeeListArray() {
    this.busFeSvc.getBusFeesList().subscribe(data => {
      this.busFeeList = data;
      this.busFeeList.forEach((e) => {
        e['s_busfeeid'] = 0
        e['less_per'] = ''
      })
    })
  }

  //// Number Only Event
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  validateWhite(i) {
    debugger;
    const busControl3 = this.specialBusFeesform.get('s_classfeelist') as FormArray;
    const per = busControl3.at(i).get('less_per').value;
    if (Number(per) > 100) {
      busControl3.at(i).get('less_per').setValue('100');
    }
    else if (Number(per) < 0) {
      busControl3.at(i).get('less_per').setValue('0');
    }
    else {
      busControl3.at(i).get('less_per').setValue(per);
    }
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

  refreshSpecialBusFeeList() {
    this.spBusSvc.getSpecialBusFeesList().subscribe(data => {
      this.specialBusFeesList = data;
    });
  }

  refreshspecialGroupBusFeeList() {
    this.spBusSvc.getSpecialGroupBusFeesList().subscribe(data => {
      debugger;
      this.specialGroupBusFeesList = data;
      this.specialGroupBusFeesList.forEach((e) => {
        e['class'] = e.class_name.split(",");
        e['per'] = e.less_per.split(",")
      })
    });
  }

  getAmount(value: any, i) {
    debugger;
    let newClass = [];
    let newAmount = [];
    let index: any;
    let getAmount: any;
    newClass = this.specialGroupBusFeesList[i].class_name.split(",");
    newAmount = this.specialGroupBusFeesList[i].less_per.split(",");

    if (newClass.length == newAmount.length) {
      index = newClass.indexOf(value);
      if (index >= 0) {
        getAmount = newAmount[index];
      }
      else {
        getAmount = 'NULL';
      }
    }
    return getAmount;
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
    less_type: new FormControl(''),
    batch_year: new FormControl(''),
    cuid: new FormControl(1),
    s_classfeelist: new FormArray([])
  });

  getControls() {
    return (this.specialBusFeesform.get('s_classfeelist') as FormArray).controls;
  }

  Search() {
    if (this.specialBusFeesform.valid) {
      const control = <FormArray>this.specialBusFeesform.controls['s_classfeelist'];
      while (control.length !== 0) {
        control.removeAt(0)
      }

      if (control.length == 0) {

        const classFilterArray = this.specialBusFeesList.filter((e) => {
          return e.batch_year == this.specialBusFeesform.value.batch_year
            && e.kmrange == this.specialBusFeesform.value.kmrange
            && e.vehicle_type == this.specialBusFeesform.value.vehicle_type
            && e.less_type == this.specialBusFeesform.value.less_type
        });

        const genFilterList = this.busFeeList.filter((e) => {
          return e.batch_year == this.specialBusFeesform.value.batch_year
            && e.kmrange == this.specialBusFeesform.value.kmrange
            && e.vehicle_type == this.specialBusFeesform.value.vehicle_type
        })

        const result = classFilterArray.concat(genFilterList.filter(x => classFilterArray.every(e => x.classid !== e.classid)));
        if (result.length != 0) {
          result.forEach(element => {
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
                less_per: new FormControl(element.less_per),
                cuid: new FormControl(this.specialBusFeesform.value.cuid),
              })
            )
          });
        }
        else {
          this.notificationSvc.error('There are no details');
        }

      }
      else {
        this.notificationSvc.error('Something error');
      }
    }
    else {
      this.specialBusFeesform.markAllAsTouched();
      this.notificationSvc.error('There are no details to save');
    }
  }

  saveSpecialbusfee() {
    const control = <FormArray>this.specialBusFeesform.controls['s_classfeelist'];
    if (control.length != 0) {
      if (this.specialBusFeesform.value.s_busfeeid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var insert = (this.specialBusFeesform.value.s_classfeelist);
              this.spBusSvc.addNewSpecialBusFees(insert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success");
                  this.refreshSpecialBusFeeList();
                  this.refreshspecialGroupBusFeeList();
                  this.specialFeesCancel();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists");
                  this.refreshSpecialBusFeeList();
                  this.refreshspecialGroupBusFeeList();
                  this.specialFeesCancel();
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
              var insert = (this.specialBusFeesform.value.s_classfeelist);
              this.spBusSvc.addNewSpecialBusFees(insert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success");
                  this.refreshSpecialBusFeeList();
                  this.refreshspecialGroupBusFeeList();
                  this.specialFeesCancel();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists");
                  this.refreshSpecialBusFeeList();
                  this.refreshspecialGroupBusFeeList();
                  this.specialFeesCancel();
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
      this.specialBusFeesform.markAllAsTouched();
      this.notificationSvc.error('There are no details to save');
    }
  }

  specialBusFeeDelete(type, km, year, less_type) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.spBusSvc.deleteSpecialBusFees(type, km, year, less_type).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshSpecialBusFeeList();
              this.refreshspecialGroupBusFeeList();
              this.specialFeesCancel();
            }
          });
        }
      });
  }

  specialFeesCancel() {
    this.specialBusFeesform.reset();
    this.specialBusFeesform.get('s_busfeeid')?.setValue(0);
    this.specialBusFeesform.get('vehicle_type')?.setValue('');
    this.specialBusFeesform.get('kmrange')?.setValue('');
    this.specialBusFeesform.get('less_type')?.setValue('');
    this.specialBusFeesform.get('batch_year')?.setValue(this.newgetbatch);
    this.specialBusFeesform.get('cuid')?.setValue(0);

    const control = <FormArray>this.specialBusFeesform.controls['s_classfeelist'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
  };
}