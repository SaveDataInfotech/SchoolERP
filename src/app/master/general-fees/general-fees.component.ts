import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { FeesTypeService } from 'src/app/api-service/FeesType.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { GeneralFeesService } from 'src/app/api-service/generalFees.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';

@Component({
  selector: 'app-general-fees',
  templateUrl: './general-fees.component.html',
  styleUrls: ['./general-fees.component.scss']
})
export class GeneralFeesComponent implements OnInit {
  FeesList: any = [];
  buttonId: boolean = true;
  MaxId: any = [];

  ClassList: any = [];
  GroupList: any = [];
  activeBatchYear: any = [];
  newgetbatch: string;
  groupFilterlist: any = [];

  generalFeesList: any = [];
  constructor(private FtySvc: FeesTypeService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private router: Router,
    private batchSvc: BatechYearService,
    private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private genFeesSvc: GeneralFeesService) { }

  ngOnInit(): void {
    this.refreshFeesTypeList();
    this.getMaxId();
    this.cancelClick();

    this.refreshClassList();
    this.refreshGroupList();
    this.GetActiveBatchYear();
    this.refreshGeneralFeesList();
  }
  GetActiveBatchYear() {
    this.batchSvc.GetActiveBatchYear().subscribe(data => {
      this.activeBatchYear = data;
      const getbatch = JSON.stringify(this.activeBatchYear[0].batch_year)
      this.newgetbatch = (getbatch.replace(/['"]+/g, ''));
      this.generalFeesAssignForm.get('batch_year')?.setValue(this.newgetbatch);
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
    this.generalFeesAssignForm.get('classid')?.setValue(classid);
    this.groupFilterlist = this.GroupList.filter((e: any) => { return e.classid == classid });
    this.generalFeesAssignForm.get('groupid')?.setValue(0);
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

  //Fees type

  feestypeForm = new FormGroup({
    typeid: new FormControl(0),
    type_name: new FormControl(''),
    cuid: new FormControl(1),
  })

  refreshFeesTypeList() {
    this.FtySvc.getfeesTypeList().subscribe(data => {
      this.FeesList = data;
      this.FeesList.forEach(e => {
        e['assignid'] = 0;
        e['male_amount'] = '';
        e['female_amount'] = '';
      });
    });
  }

  NewFeesType() {
    if (this.feestypeForm.valid) {
      if (this.feestypeForm.value.typeid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var feestypeinsert = (this.feestypeForm.value);
              this.FtySvc.addNewFeesType(feestypeinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshFeesTypeList();
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
      else if (this.feestypeForm.value.typeid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var feestypeinsert = (this.feestypeForm.value);
              this.FtySvc.addNewFeesType(feestypeinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Updated Success")
                  this.refreshFeesTypeList();
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
    }
    else {
      this.feestypeForm.markAllAsTouched();
    }
  }

  getMaxId() {
    this.FtySvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  deleteClick(typeid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.FtySvc.deletefeesType(typeid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshFeesTypeList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  udateGetClick(fees: any) {
    this.feestypeForm.get('typeid')?.setValue(fees.typeid);
    this.feestypeForm.get('type_name')?.setValue(fees.type_name);
    this.feestypeForm.get('cuid')?.setValue(fees.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.feestypeForm.reset();
    this.feestypeForm.get('typeid')?.setValue(0);
    this.feestypeForm.get('type_name')?.setValue('');
    this.feestypeForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }


  ///////////////////Fees  Assign

  refreshGeneralFeesList() {
    this.genFeesSvc.getGeneralFeesList().subscribe(data => {
      this.generalFeesList = data;
    });
  }

  generalFeesAssignForm = new FormGroup({
    assignid: new FormControl(0),
    classid: new FormControl(null, [Validators.required]),
    groupid: new FormControl(0, [Validators.required]),
    batch_year: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
    feesList: new FormArray([])
  });

  getControls() {
    return (this.generalFeesAssignForm.get('feesList') as FormArray).controls;
  }

  listFeesType() {
    if (this.generalFeesAssignForm.valid) {
      const control = <FormArray>this.generalFeesAssignForm.controls['feesList'];
      while (control.length !== 0) {
        control.removeAt(0)
      }
      if (control.length == 0) {
        const classFilterArray = this.generalFeesList.filter((e) => { return e.batch_year == this.generalFeesAssignForm.value.batch_year && e.classid == this.generalFeesAssignForm.value.classid && e.groupid == this.generalFeesAssignForm.value.groupid });
        const result = classFilterArray.concat(this.FeesList.filter(x => classFilterArray.every(typeid => x.typeid !== typeid.typeid)));
        result.forEach(element => {
          const control = <FormArray>this.generalFeesAssignForm.controls['feesList'];
          control.push(
            new FormGroup({
              assignid: new FormControl(element.assignid),
              classid: new FormControl(this.generalFeesAssignForm.value.classid),
              groupid: new FormControl(this.generalFeesAssignForm.value.groupid),
              batch_year: new FormControl(this.generalFeesAssignForm.value.batch_year),
              cuid: new FormControl(this.generalFeesAssignForm.value.cuid),
              typeid: new FormControl(element.typeid),
              type_name: new FormControl(element.type_name),
              male_amount: new FormControl(element.male_amount),
              female_amount: new FormControl(element.female_amount)
            })
          )
        });
      }
      else {
        this.notificationSvc.error('Something error');
      }
    }
    else {
      this.generalFeesAssignForm.markAllAsTouched()
    }
  }

  newGeneralFees() {

    const control = <FormArray>this.generalFeesAssignForm.controls['feesList'];
    if (control.length != 0) {
      if (this.generalFeesAssignForm.value.assignid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var insert = (this.generalFeesAssignForm.value.feesList);
              this.genFeesSvc.addNewGeneralFees(insert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success");
                  this.refreshGeneralFeesList();
                  this.generalFeesCancel();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists");
                  this.refreshGeneralFeesList();
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
              var insert = (this.generalFeesAssignForm.value.feesList);
              this.genFeesSvc.addNewGeneralFees(insert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success");
                  this.refreshGeneralFeesList();
                  this.generalFeesCancel();
                }
                else if (res.status == 'Already exists') {
                  this.notificationSvc.warn("Already exists");
                  this.refreshGeneralFeesList();
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
      this.generalFeesAssignForm.markAllAsTouched();
      this.notificationSvc.error('There are no details to save')
    }
  }

  generalUpdate(item) {

    this.generalFeesAssignForm.patchValue(item);
    const control = <FormArray>this.generalFeesAssignForm.controls['feesList'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
    if (control.length == 0) {
      const control = <FormArray>this.generalFeesAssignForm.controls['feesList'];
      control.push(
        new FormGroup({
          assignid: new FormControl(item.assignid),
          classid: new FormControl(item.classid),
          groupid: new FormControl(item.groupid),
          batch_year: new FormControl(item.batch_year),
          cuid: new FormControl(this.generalFeesAssignForm.value.cuid),
          typeid: new FormControl(item.typeid),
          type_name: new FormControl(item.type_name),
          male_amount: new FormControl(item.male_amount),
          female_amount: new FormControl(item.female_amount)
        })
      )
    }
    else {
      this.notificationSvc.error('Something error');
    }
  }

  generalDelete(assignid) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.genFeesSvc.deleteGeneralFees(assignid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshGeneralFeesList();
              this.generalFeesCancel();
            }
          });
        }
      });
  }

  sameFemaleAmount(i, value) {
    if (value.target.checked) {
      const busControl = this.generalFeesAssignForm.get('feesList') as FormArray;
      busControl.at(i).get('female_amount').setValue(busControl.at(i).get('male_amount').value);
    }
    else {
      const busControl = this.generalFeesAssignForm.get('feesList') as FormArray;
      busControl.at(i).get('female_amount').setValue('0');
    }
  }

  generalFeesCancel() {
    this.generalFeesAssignForm.reset();
    this.generalFeesAssignForm.get('assignid')?.setValue(0);
    this.generalFeesAssignForm.get('classid')?.setValue(null);
    this.generalFeesAssignForm.get('groupid')?.setValue(0);
    this.generalFeesAssignForm.get('batch_year')?.setValue(this.newgetbatch);
    this.generalFeesAssignForm.get('cuid')?.setValue(0);

    const control = <FormArray>this.generalFeesAssignForm.controls['feesList'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
  };
}
