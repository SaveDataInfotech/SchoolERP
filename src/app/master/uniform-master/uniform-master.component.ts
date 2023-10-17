import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { UniformMasterService } from 'src/app/api-service/UniformMaster.service';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { uniformMeterService } from 'src/app/api-service/uniformMeter.service';

@Component({
  selector: 'app-uniform-master',
  templateUrl: './uniform-master.component.html',
  styleUrls: ['./uniform-master.component.scss']
})
export class UniformMasterComponent implements OnInit {
  UniformSizeList: any = [];
  MaxId: any = [];
  buttonId: boolean = true;
  overcoatif: boolean;

  UniformMeterList: any = [];
  MeterMaxId: any = [];
  meterbuttonId: boolean = true;
  overcoatifMetr: boolean;

  ClassList: any = [];
  constructor(
    private uniformSvc: UniformMasterService, private DialogSvc: DialogService, private notificationSvc: NotificationsService,
    private uniformMSvc: uniformMeterService, private router: Router, private ClassSvc: studentClassService,
  ) {
  }
  ngOnInit(): void {
    this.refreshUniformSizeList(),
      this.getMaxId(),
      this.cancelClick(),

      this.refreshUnifromMeterList(),
      this.getMaxIdUniformMeter(),
      this.MetercancelClick();

      this.refreshClassList();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  //// Number Only Event
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  refreshClassList() {
    this.ClassSvc.getClassList().subscribe(data => {
      this.ClassList = data;
    });
  }

  uniformSizeForm = new FormGroup({
    uniformid: new FormControl(0),
    gender: new FormControl('', [Validators.required]),
    classid: new FormControl(null),
    shirting: new FormControl(''),
    suiting: new FormControl(''),
    over_coat: new FormControl('--'),
    amount: new FormControl('', [Validators.required]),
    cuid: new FormControl(1)
  })

  ifovercoatfun(value: any) {
    if (value != "Male") {
      this.overcoatif = true;
    }
    else {
      this.overcoatif = false;
    }
  }

  refreshUniformSizeList() {
    this.uniformSvc.getuniformList().subscribe(data => {
      this.UniformSizeList = data;
    });
  }

  NewUniformSize() {
    debugger;
    if (this.uniformSizeForm.valid) {
      if (this.uniformSizeForm.value.uniformid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var uniformsizeinsert = (this.uniformSizeForm.value);
              this.uniformSvc.addNewuniform(uniformsizeinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved successfully")
                  this.refreshUniformSizeList();
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
      else if (this.uniformSizeForm.value.uniformid != 0) {
        debugger;
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var uniformsizeinsert = (this.uniformSizeForm.value);
              this.uniformSvc.addNewuniform(uniformsizeinsert).subscribe(res => {
                if (res.status == 'Update Success') {
                  this.notificationSvc.success("Saved successfully")
                  this.refreshUniformSizeList();
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
      this.uniformSizeForm.markAllAsTouched();
    }
  }

  getMaxId() {
    this.uniformSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  //sample  for Dialog working
  deleteuniformSize(uniformid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.uniformSvc.deleteuniform(uniformid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshUniformSizeList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  udateGetClick(size: any) {
    if (size.gender == "Male") {
      this.overcoatif = false;
    }
    else {
      this.overcoatif = true;
    }
    this.uniformSizeForm.patchValue(size);
    this.uniformSizeForm.get('cuid')?.setValue(1);
    this.buttonId = false;
  }

  cancelClick() {
    this.uniformSizeForm.reset();
    this.uniformSizeForm.get('uniformid')?.setValue(0);
    this.uniformSizeForm.get('gender')?.setValue('');
    this.uniformSizeForm.get('classid')?.setValue(null);
    this.uniformSizeForm.get('shirting')?.setValue('');
    this.uniformSizeForm.get('suiting')?.setValue('');
    this.uniformSizeForm.get('over_coat')?.setValue('');
    this.uniformSizeForm.get('amount')?.setValue('');
    this.uniformSizeForm.get('cuid')?.setValue(1);
    this.buttonId = true;
    this.overcoatif = false;
  }


  //Uniform meter


  uniformMeterForm = new FormGroup({
    uniformid: new FormControl(0),
    gender: new FormControl('', [Validators.required]),
    classid:new FormControl(null),
    shirting: new FormControl('1M', [Validators.required]),
    sh_am: new FormControl('', [Validators.required]),
    suiting: new FormControl('1M', [Validators.required]),
    su_am: new FormControl('', [Validators.required]),
    overcoat: new FormControl('1M'),
    oc_am: new FormControl(''),
    cuid: new FormControl(1),
  })

  refreshUnifromMeterList() {
    this.uniformMSvc.getUniformList().subscribe(data => {
      this.UniformMeterList = data;
    });
  }

  ifovercoatfunMeter(value: any) {
    if (value != "Male") {
      this.overcoatifMetr = true;
    }
    else {
      this.overcoatifMetr = false;
    }
  }

  newUniformMeter() {
    if (this.uniformMeterForm.valid) {
      if (this.uniformMeterForm.value.uniformid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var stafftypeinsert = (this.uniformMeterForm.value);
              this.uniformMSvc.addNewUniform(stafftypeinsert).subscribe(res => {
                
                if (res?.recordid) {
                  this.notificationSvc.success("Saved Success")
                  this.refreshUnifromMeterList();
                  this.getMaxIdUniformMeter();
                  this.MetercancelClick();
                }
              });
            }
          });
      }
      else if (this.uniformMeterForm.value.uniformid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var stafftypeinsert = (this.uniformMeterForm.value);
              this.uniformMSvc.addNewUniform(stafftypeinsert).subscribe(res => {
                
                if (res?.recordid) {
                  this.notificationSvc.success("Updated Success")
                  this.refreshUnifromMeterList();
                  this.getMaxIdUniformMeter();
                  this.MetercancelClick();
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
      this.uniformMeterForm.markAllAsTouched();
    }
  }

  getMaxIdUniformMeter() {
    this.uniformMSvc.getMaxId().subscribe(data => {
      this.MeterMaxId = data;
    });
  }


  //sample  for Dialog working
  deleteMeterClick(uniformid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.uniformMSvc.deleteUniform(uniformid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshUnifromMeterList();
              this.getMaxIdUniformMeter();
              this.MetercancelClick();
            }
          });
        }
      });
  }

  updateMeterGetClick(meter: any) {
    if (meter.gender == "Male") {
      this.overcoatifMetr = false;
    }
    else {
      this.overcoatifMetr = true;
    }
    this.uniformMeterForm.patchValue(meter);
    this.uniformMeterForm.get('cuid')?.setValue(1);
    this.meterbuttonId = false;
  }

  MetercancelClick() {
    this.uniformMeterForm.reset();
    this.uniformMeterForm.get('uniformid')?.setValue(0);
    this.uniformMeterForm.get('gender')?.setValue('');
    this.uniformMeterForm.get('classid')?.setValue(null);
    this.uniformMeterForm.get('shirting')?.setValue('1M');
    this.uniformMeterForm.get('sh_am')?.setValue('');
    this.uniformMeterForm.get('suiting')?.setValue('1M');
    this.uniformMeterForm.get('su_am')?.setValue('');
    this.uniformMeterForm.get('overcoat')?.setValue('1M');
    this.uniformMeterForm.get('oc_am')?.setValue('');
    this.uniformMeterForm.get('cuid')?.setValue(1);
    this.meterbuttonId = true;
  }

}
