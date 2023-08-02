import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { UniformMasterService } from 'src/app/api-service/UniformMaster.service';
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
  //submitted: boolean = false;

  UniformMeterList:any=[];
  MeterMaxId:any=[];
  meterbuttonId:boolean=true;
  overcoatifMetr:boolean;
  constructor(
    private uniformSvc: UniformMasterService, private DialogSvc: DialogService, private notificationSvc: NotificationsService,
    private uniformMSvc: uniformMeterService,private router: Router
    ) {
  }
  ngOnInit(): void {
    this.refreshUniformSizeList(),
      this.getMaxId(),
      this.cancelClick(),

      this.refreshUnifromMeterList(),
      this.getMaxIdUniformMeter(),
      this.MetercancelClick()
  }


  backButton() {
    this.router.navigateByUrl('/app/dashboard');
  }

  
  uniformSizeForm = new FormGroup({
    uniformid: new FormControl(0),
    gender: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    shirting: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9][A-Za-z0-9._-]*')]),
    suiting: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9][A-Za-z0-9._-]*')]),
    over_coat: new FormControl('--', [Validators.pattern('[a-zA-Z0-9][A-Za-z0-9._-]*')]),
    amount: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
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
  // ngsubmit() {
  //   debugger;
  //   this.submitted = true
  //   if (this.uniformSizeForm.invalid) {
  //     this.submitted = true
  //   }
  // }

  NewUniformSize() {
    if (this.uniformSizeForm.valid) {
      if (this.uniformSizeForm.value.uniformid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var uniformsizeinsert = (this.uniformSizeForm.value);
              this.uniformSvc.addNewuniform(uniformsizeinsert).subscribe(res => {
                console.log(res, 'resss')
                if (res?.recordid) {
                  this.notificationSvc.success("Saved Success")
                  this.refreshUniformSizeList();
                  this.getMaxId();
                  this.cancelClick();
                }
              });
            }
          });
      }
      else if (this.uniformSizeForm.value.uniformid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var uniformsizeinsert = (this.uniformSizeForm.value);
              this.uniformSvc.addNewuniform(uniformsizeinsert).subscribe(res => {
                console.log(res, 'resss')
                if (res?.recordid) {
                  this.notificationSvc.success("Updated Success")
                  this.refreshUniformSizeList();
                  this.getMaxId();
                  this.cancelClick();
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
    this.uniformSizeForm.get('uniformid')?.setValue(size.uniformid);
    this.uniformSizeForm.get('gender')?.setValue(size.gender);
    this.uniformSizeForm.get('size')?.setValue(size.size);
    this.uniformSizeForm.get('shirting')?.setValue(size.shirting);
    this.uniformSizeForm.get('suiting')?.setValue(size.suiting);
    this.uniformSizeForm.get('over_coat')?.setValue(size.over_coat);
    this.uniformSizeForm.get('amount')?.setValue(size.amount);
    this.uniformSizeForm.get('cuid')?.setValue(size.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.uniformSizeForm.reset();
    this.uniformSizeForm.get('uniformid')?.setValue(0);
    this.uniformSizeForm.get('gender')?.setValue('');
    this.uniformSizeForm.get('size')?.setValue('');
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
    shirting: new FormControl('', [Validators.required]),
    sh_am: new FormControl('', [Validators.required]),
    suiting: new FormControl('', [Validators.required]),
    su_am: new FormControl('', [Validators.required]),
    overcoat: new FormControl(''),
    oc_am: new FormControl(''),
    cuid: new FormControl(1),
  })

  refreshUnifromMeterList() {
    this.uniformMSvc.getUniformList().subscribe(data => {
      this.UniformMeterList = data;
    });
  }

  ifovercoatfunMeter(value: any) {
    debugger;
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
                console.log(res, 'resss')
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
                console.log(res, 'resss')
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
    this.uniformMeterForm.get('uniformid')?.setValue(meter.uniformid);
    this.uniformMeterForm.get('gender')?.setValue(meter.gender);
    this.uniformMeterForm.get('shirting')?.setValue(meter.shirting);
    this.uniformMeterForm.get('sh_am')?.setValue(meter.sh_am);
    this.uniformMeterForm.get('suiting')?.setValue(meter.suiting);
    this.uniformMeterForm.get('su_am')?.setValue(meter.su_am);
    this.uniformMeterForm.get('overcoat')?.setValue(meter.overcoat);
    this.uniformMeterForm.get('oc_am')?.setValue(meter.oc_am);
    this.uniformMeterForm.get('cuid')?.setValue(meter.cuid);
    this.meterbuttonId = false;
  }

  MetercancelClick() {
    debugger;
    this.uniformMeterForm.reset();
    this.uniformMeterForm.get('uniformid')?.setValue(0);
    this.uniformMeterForm.get('gender')?.setValue('');
    this.uniformMeterForm.get('shirting')?.setValue('');
    this.uniformMeterForm.get('sh_am')?.setValue('');
    this.uniformMeterForm.get('suiting')?.setValue('');
    this.uniformMeterForm.get('su_am')?.setValue('');
    this.uniformMeterForm.get('overcoat')?.setValue('');
    this.uniformMeterForm.get('oc_am')?.setValue('');
    this.uniformMeterForm.get('cuid')?.setValue(1);
    this.meterbuttonId = true;
  }

}
