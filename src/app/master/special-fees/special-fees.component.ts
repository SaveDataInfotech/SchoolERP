import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { FeesAssignService } from 'src/app/api-service/FeesAssign.service';
import { FeesLessService } from 'src/app/api-service/FeesLess.service';
import { FeesTypeService } from 'src/app/api-service/FeesType.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { FeesTypeAssignService } from 'src/app/api-service/feesTypeAssign.service';
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

  constructor(private FtySvc: FeesTypeService,
    private FlSvc: FeesLessService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private feeAsSvc: FeesAssignService,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private batchSvc: BatechYearService,
    private router: Router,
    private feeTyAsSvc: FeesTypeAssignService,
    private genFeesSvc: GeneralFeesService,
    private spFSvc: SpecialFeesService) { }

  ngOnInit(): void {
    this.refreshFeesLessList(),
      this.getMaxIdLess(),
      this.cancelClickLess(),

      this.refreshClassList();
    this.refreshGroupList();
    this.GetActiveBatchYear();

    this.refreshGeneralFeesList();

    this.refreshSpecialFeesList();
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
    fess_lessid: new FormControl(0),
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
      if (this.feesLessForm.value.fess_lessid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var feeslessinsert = (this.feesLessForm.value);
              this.FlSvc.addNewFeesLess(feeslessinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshFeesLessList();
                  this.getMaxIdLess();
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
      else if (this.feesLessForm.value.fess_lessid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var feeslessinsert = (this.feesLessForm.value);
              this.FlSvc.addNewFeesLess(feeslessinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshFeesLessList();
                  this.getMaxIdLess();
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
    this.feesLessForm.get('fess_lessid')?.setValue(less.fess_lessid);
    this.feesLessForm.get('less_type')?.setValue(less.less_type);
    this.feesLessForm.get('cuid')?.setValue(less.cuid);
    this.buttonIdLess = false;
  }

  deleteClickLess(fess_lessid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.FlSvc.deletefeesLessType(fess_lessid).subscribe(res => {
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
    this.feesLessForm.get('fess_lessid')?.setValue(0);
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
        e['s_male_amount']='';
        e['s_female_amount']='';
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
    less_type: new FormControl(''),
    groupid: new FormControl(0),
    batch_year: new FormControl(''),
    cuid: new FormControl(1),
    s_feesList: new FormArray([])
  });
  getControls() {
    return (this.specialFeesForm.get('s_feesList') as FormArray).controls;
  }

  listFeesType() {
    debugger;
    if (this.specialFeesForm.valid) {
      const control = <FormArray>this.specialFeesForm.controls['s_feesList'];
      while (control.length !== 0) {
        control.removeAt(0)
      }
      if (control.length == 0) {
        const classFilterArray = this.specialFeesList.filter((e) => { return e.batch_year == this.specialFeesForm.value.batch_year && e.less_type == this.specialFeesForm.value.less_type && e.classid == this.specialFeesForm.value.classid && e.groupid == this.specialFeesForm.value.groupid })
        const genFilterList = this.generalFeesList.filter((e) => { return e.batch_year == this.specialFeesForm.value.batch_year && e.classid == this.specialFeesForm.value.classid && e.groupid == this.specialFeesForm.value.groupid })
        const result = classFilterArray.concat(genFilterList.filter(x => classFilterArray.every(e => x.typeid !== e.typeid)));
        if (result.length != 0) {
          result.forEach(element => {
            const control = <FormArray>this.specialFeesForm.controls['s_feesList'];
            control.push(
              new FormGroup({
                s_assignid: new FormControl(element.s_assignid),
                classid: new FormControl(this.specialFeesForm.value.classid),
                groupid: new FormControl(this.specialFeesForm.value.groupid),
                less_type: new FormControl(this.specialFeesForm.value.less_type),
                batch_year: new FormControl(this.specialFeesForm.value.batch_year),
                cuid: new FormControl(this.specialFeesForm.value.cuid),
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
                  this.notificationSvc.warn("Already exists");
                  this.refreshSpecialFeesList();
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
                  this.notificationSvc.warn("Already exists");
                  this.refreshSpecialFeesList();
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
          classid: new FormControl(item.classid),
          groupid: new FormControl(item.groupid),
          less_type: new FormControl(item.less_type),
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
    this.specialFeesForm.get('less_type')?.setValue('');
    this.specialFeesForm.get('batch_year')?.setValue(this.newgetbatch);
    this.specialFeesForm.get('cuid')?.setValue(0);

    const control = <FormArray>this.specialFeesForm.controls['s_feesList'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
  };
}
