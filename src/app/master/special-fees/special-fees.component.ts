import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { FeesLessService } from 'src/app/api-service/FeesLess.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { BusFeesAssignService } from 'src/app/api-service/busFeesAssign.service';
import { GeneralFeesService } from 'src/app/api-service/generalFees.service';
import { SpecialFeesService } from 'src/app/api-service/specialFees.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';

@Component({
  selector: 'app-special-fees',
  templateUrl: './special-fees.component.html',
  styleUrls: ['./special-fees.component.scss']
})
export class SpecialFeesComponent implements OnInit {
  FeesLessList: any = [];
  MaxIdLess: any = [];
  buttonIdLess: boolean = true;

  ClassList: any = [];
  GroupList: any = [];
  activeBatchYear: any = [];
  newgetbatch: string;
  groupFilterlist: any = [];

  generalFeesList: any = [];

  specialFeesList: any = [];
  groupBusFeeList: any[] = [];
  kmFillterList: any = [];
  constructor(
    private FlSvc: FeesLessService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private batchSvc: BatechYearService,
    private router: Router,
    private genFeesSvc: GeneralFeesService,
    private spFSvc: SpecialFeesService,
    private busFeSvc: BusFeesAssignService,) { }

  ngOnInit(): void {
    this.refreshFeesLessList(),
      this.getMaxIdLess(),
      this.cancelClickLess(),

      this.refreshClassList();
    this.refreshGroupList();
    this.GetActiveBatchYear();

    this.refreshGeneralFeesList();

    this.refreshSpecialFeesList();

    this.refresgroupBusFeeList();
  }

  GetActiveBatchYear() {
    this.batchSvc.GetActiveBatchYear().subscribe(data => {
      this.activeBatchYear = data;
      const getbatch = JSON.stringify(this.activeBatchYear[0].batch_year)
      this.newgetbatch = (getbatch.replace(/['"]+/g, ''));
      this.specialFeesForm.get('batch_year')?.setValue(this.newgetbatch);
    });
  }
  refreshClassList() {
    this.ClassSvc.getClassList().subscribe(data => {
      this.ClassList = data;
    });
  }

  refreshGroupList() {
    this.GroupSvc.getGroupList().subscribe(data => {
      this.GroupList = data;
    });
  }

  filterGroupfun(classsid: any) {
    const classid = Number(classsid);
    this.specialFeesForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.specialFeesForm.get('groupid')?.setValue(0);
  }

  //// Number Only Event
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  feesLessForm = new FormGroup({
    fees_lessid: new FormControl(0),
    less_type: new FormControl(''),
    cuid: new FormControl(1),
  })

  refreshFeesLessList() {
    this.FlSvc.getfeesLessList().subscribe(data => {
      this.FeesLessList = data;
    });
  }

  getMaxIdLess() {
    this.FlSvc.getMaxId().subscribe(data => {
      this.MaxIdLess = data;
    });
  }

  NewFeesLess() {
    if (this.feesLessForm.valid) {
      if (this.feesLessForm.value.fees_lessid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var feeslessinsert = (this.feesLessForm.value);
              this.FlSvc.addNewFeesLess(feeslessinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshFeesLessList();
                  this.getMaxIdLess();
                  this.refreshSpecialFeesList();
                  this.cancelClickLess();
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
      else if (this.feesLessForm.value.fees_lessid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var feeslessinsert = (this.feesLessForm.value);
              this.FlSvc.addNewFeesLess(feeslessinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshFeesLessList();
                  this.getMaxIdLess();
                  this.refreshSpecialFeesList();
                  this.cancelClickLess();
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
      this.feesLessForm.markAllAsTouched();
    }
  }

  udateGetClickLess(less: any) {
    this.feesLessForm.patchValue(less);
    this.feesLessForm.get('cuid')?.setValue(1);
    this.buttonIdLess = false;
  }

  deleteClickLess(id: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.FlSvc.deletefeesLessType(id).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshFeesLessList();
              this.getMaxIdLess();
              this.cancelClickLess();
            }
          });
        }
      });
  }

  cancelClickLess() {
    this.feesLessForm.reset();
    this.feesLessForm.get('fees_lessid')?.setValue(0);
    this.feesLessForm.get('less_type')?.setValue('');
    this.feesLessForm.get('cuid')?.setValue(1);
    this.buttonIdLess = true;
  }
  ////////////////////////////////////////////////////////////
  refreshGeneralFeesList() {
    this.genFeesSvc.getGeneralFeesList().subscribe(data => {
      this.generalFeesList = data;
      this.generalFeesList.forEach(e => {
        e['s_assignid'] = 0;
        e['s_male_amount'] = '';
        e['s_female_amount'] = '';
      });
    });
  }

  refreshSpecialFeesList() {
    this.spFSvc.getSpecialFeesList().subscribe(data => {
      this.specialFeesList = data;
    });
  }

  specialFeesForm = new FormGroup({
    s_assignid: new FormControl(0),
    classid: new FormControl(null),
    fees_lessid: new FormControl(''),
    groupid: new FormControl(0),
    batch_year: new FormControl(''),
    kmrange: new FormControl('Own vehicle'),
    cuid: new FormControl(1),
    s_feesList: new FormArray([])
  });
  getControls() {
    return (this.specialFeesForm.get('s_feesList') as FormArray).controls;
  }

  autokm() {
    debugger;
    var regExp = /[a-zA-Z]/g;
    var num = /([0-9]+)/g;
    const km = this.specialFeesForm.value.kmrange
    if (regExp.test(km) && km != null) {
      const myArray = km.split(/([0-9]+)/)
      this.specialFeesForm.get('kmrange')?.setValue(myArray[1] + 'KM');
    }
    else if (num.test(km) && km != null) {
      this.specialFeesForm.get('kmrange')?.setValue(km + 'KM');
    }
    else {
      this.specialFeesForm.get('kmrange')?.setValue('');
    }
  }

  refresgroupBusFeeList() {
    this.busFeSvc.getGroupBusFeesList().subscribe(data => {
      debugger;
      this.groupBusFeeList = data;

      this.kmFillterList = this.groupBusFeeList.filter((e) => {
        return e.batch_year == this.newgetbatch
      });
    });
  }

  validateWhite(i) {
    debugger;
    const busControl3 = this.specialFeesForm.get('s_feesList') as FormArray;
    const per = busControl3.at(i).get('s_male_amount').value;
    if (Number(per) > 100) {
      busControl3.at(i).get('s_male_amount').setValue('100');
    }
    else if (Number(per) < 0) {
      busControl3.at(i).get('s_male_amount').setValue('0');
    }
    else {
      busControl3.at(i).get('s_male_amount').setValue(per);
    }
  }

  fevalidateWhite(i) {
    debugger;
    const busControl3 = this.specialFeesForm.get('s_feesList') as FormArray;
    const per = busControl3.at(i).get('s_female_amount').value;
    if (Number(per) > 100) {
      busControl3.at(i).get('s_female_amount').setValue('100');
    }
    else if (Number(per) < 0) {
      busControl3.at(i).get('s_female_amount').setValue('0');
    }
    else {
      busControl3.at(i).get('s_female_amount').setValue(per);
    }
  }


  listFeesType() {
    debugger;
    if (this.specialFeesForm.valid) {
      const control = <FormArray>this.specialFeesForm.controls['s_feesList'];
      while (control.length !== 0) {
        control.removeAt(0)
      }
      if (control.length == 0) {
        debugger;
        const classFilterArray = this.specialFeesList.filter((e) => {
          return e.batch_year == this.specialFeesForm.value.batch_year
            && e.fees_lessid == this.specialFeesForm.value.fees_lessid
            && e.classid == this.specialFeesForm.value.classid
            && e.groupid == this.specialFeesForm.value.groupid
            && e.kmrange == this.specialFeesForm.value.kmrange
        });

        const genFilterList = this.generalFeesList.filter((e) => { return e.batch_year == this.specialFeesForm.value.batch_year && e.classid == this.specialFeesForm.value.classid && e.groupid == this.specialFeesForm.value.groupid });
        const result = classFilterArray.concat(genFilterList.filter(x => classFilterArray.every(e => x.typeid !== e.typeid)));
        if (result.length != 0) {
          result.forEach(element => {
            const control = <FormArray>this.specialFeesForm.controls['s_feesList'];
            control.push(
              new FormGroup({
                s_assignid: new FormControl(element.s_assignid),
                assignid: new FormControl(element.assignid),
                classid: new FormControl(this.specialFeesForm.value.classid),
                groupid: new FormControl(this.specialFeesForm.value.groupid),
                fees_lessid: new FormControl(this.specialFeesForm.value.fees_lessid),
                batch_year: new FormControl(this.specialFeesForm.value.batch_year),
                kmrange: new FormControl(this.specialFeesForm.value.kmrange),
                cuid: new FormControl(1),
                typeid: new FormControl(element.typeid),
                type_name: new FormControl(element.type_name),
                male_amount: new FormControl(element.male_amount),
                female_amount: new FormControl(element.female_amount),
                s_male_amount: new FormControl(element.s_male_amount),
                s_female_amount: new FormControl(element.s_female_amount)
              })
            )
          });
        }
        else {
          this.notificationSvc.error('No fees details are there ! Please Check General Fees Details');
        }
      }
      else {
        this.notificationSvc.error('Something error');
      }
    }
    else {
      this.specialFeesForm.markAllAsTouched()
    }
  }

  specialFeesSave() {
    const control = <FormArray>this.specialFeesForm.controls['s_feesList'];
    if (control.length != 0) {
      if (this.specialFeesForm.value.s_assignid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var insert = (this.specialFeesForm.value.s_feesList);
              this.spFSvc.addNewSpecialFees(insert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success");
                  this.refreshSpecialFeesList();
                  this.specialFeesCancel();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.success("Saved Success");
                  this.refreshSpecialFeesList();
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
              var insert = (this.specialFeesForm.value.s_feesList);
              this.spFSvc.addNewSpecialFees(insert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success");
                  this.refreshSpecialFeesList();
                  this.specialFeesCancel();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.success("Saved Success");
                  this.refreshSpecialFeesList();
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
      this.specialFeesForm.markAllAsTouched();
      this.notificationSvc.error('There are no details to save');
    }
  }


  specialFeesUpdate(item) {
    this.specialFeesForm.patchValue(item);
    const control = <FormArray>this.specialFeesForm.controls['s_feesList'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
    if (control.length == 0) {
      const control = <FormArray>this.specialFeesForm.controls['s_feesList'];
      control.push(
        new FormGroup({
          s_assignid: new FormControl(item.s_assignid),
          assignid: new FormControl(item.assignid),
          classid: new FormControl(item.classid),
          groupid: new FormControl(item.groupid),
          fees_lessid: new FormControl(item.fees_lessid),
          batch_year: new FormControl(item.batch_year),
          cuid: new FormControl(this.specialFeesForm.value.cuid),
          typeid: new FormControl(item.typeid),
          type_name: new FormControl(item.type_name),
          male_amount: new FormControl(item.male_amount),
          female_amount: new FormControl(item.female_amount),
          s_male_amount: new FormControl(item.s_male_amount),
          s_female_amount: new FormControl(item.s_female_amount)
        })
      )
    }
    else {
      this.notificationSvc.error('Something error');
    }
  };

  sameFemaleAmount(i, value) {
    if (value.target.checked) {
      const busControl = this.specialFeesForm.get('s_feesList') as FormArray;
      busControl.at(i).get('s_female_amount').setValue(busControl.at(i).get('s_male_amount').value);
    }
    else {
      const busControl = this.specialFeesForm.get('s_feesList') as FormArray;
      busControl.at(i).get('s_female_amount').setValue('0');
    }
  }


  specialDelete(value) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.spFSvc.deleteSpecialFees(value).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshSpecialFeesList();
              this.specialFeesCancel();
            }
          });
        }
      });
  }

  specialFeesCancel() {
    this.specialFeesForm.reset();
    this.specialFeesForm.get('s_assignid')?.setValue(0);
    this.specialFeesForm.get('classid')?.setValue(null);
    this.specialFeesForm.get('groupid')?.setValue(0);
    this.specialFeesForm.get('fees_lessid')?.setValue('');
    this.specialFeesForm.get('batch_year')?.setValue(this.newgetbatch);
    this.specialFeesForm.get('kmrange')?.setValue('Own vehicle');
    this.specialFeesForm.get('cuid')?.setValue(0);

    const control = <FormArray>this.specialFeesForm.controls['s_feesList'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
  };
}
