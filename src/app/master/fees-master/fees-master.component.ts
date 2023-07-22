import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { FeesLessService } from 'src/app/api-service/FeesLess.service';
import { FeesTypeService } from 'src/app/api-service/FeesType.service';

@Component({
  selector: 'app-fees-master',
  templateUrl: './fees-master.component.html',
  styleUrls: ['./fees-master.component.scss']
})
export class FeesMasterComponent implements OnInit {
  FeesList: any = [];
  buttonId: boolean = true;
  MaxId: any = [];

  FeesLessList: any = [];
  MaxIdLess: any = [];
  buttonIdLess: boolean = true;


  constructor(
    private FtySvc: FeesTypeService,
    private FlSvc: FeesLessService,
    private DialogSvc: DialogService,
    private notificationSvc:NotificationsService
  ) { }

  ngOnInit(): void {
    this.refreshFeesTypeList(),
      this.getMaxId(),
      this.cancelClick(),

      this.refreshFeesLessList(),
      this.getMaxIdLess(),
      this.cancelClickLess()
  }

  feestypeForm = new FormGroup({
    typeid: new FormControl(0),
    type_name: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  refreshFeesTypeList() {
    this.FtySvc.getfeesTypeList().subscribe(data => {
      this.FeesList = data;
    });
  }

  NewFeesType() {
    var feestypeinsert = (this.feestypeForm.value);
    this.FtySvc.addNewFeesType(feestypeinsert).subscribe(res => {
      if (res?.recordid) {
        this.refreshFeesTypeList();
        this.getMaxId();
        this.cancelClick();
      }
    });
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


  //fess less Back end Code

  feesLessForm = new FormGroup({
    fess_lessid: new FormControl(0),
    less_type: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  refreshFeesLessList() {
    this.FlSvc.getfeesLessList().subscribe(data => {
      this.FeesLessList = data;
    });
  }

  getMaxIdLess() {
    debugger;
    this.FlSvc.getMaxId().subscribe(data => {
      this.MaxIdLess = data;
    });
  }

  NewFeesLess() {
    var feeslessinsert = (this.feesLessForm.value);
    this.FlSvc.addNewFeesLess(feeslessinsert).subscribe(res => {
      if (res?.recordid) {
        this.refreshFeesLessList();
        this.getMaxIdLess();
        this.cancelClickLess();
      }
    });
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
}