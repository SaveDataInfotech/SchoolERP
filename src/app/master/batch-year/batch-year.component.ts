import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';

@Component({
  selector: 'app-batch-year',
  templateUrl: './batch-year.component.html',
  styleUrls: ['./batch-year.component.scss']
})
export class BatchYearComponent implements OnInit {

  constructor(private batchyearSvc: BatechYearService, private DialogSvc: DialogService, private notificationSvc: NotificationsService) { }
  BatchList: any = [];
  buttonId: boolean = true;
  MaxId: any = [];
  ngOnInit(): void {
    this.refreshBatchYearList();
    this.getMaxId();
    this.cancelClick();
  }

  BatchYearForm = new FormGroup({
    batchid: new FormControl(0),
    batch_year: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })

  refreshBatchYearList() {
    this.batchyearSvc.getBatchYearList().subscribe(data => {
      this.BatchList = data;
    });
  }

  getMaxId() {
    this.batchyearSvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  NewBatchYear() {
    if (this.BatchYearForm.valid) {
      var Batchinsert = (this.BatchYearForm.value);
      this.batchyearSvc.addNewBatch(Batchinsert).subscribe(res => {
        if (res?.recordid) {
          this.notificationSvc.success("Save Success")
          this.refreshBatchYearList();
          this.getMaxId();
          this.cancelClick();
        }
      });
    }
    else {
      this.BatchYearForm.markAllAsTouched();
    }

  }

  udateGetClick(batch: any) {
    this.BatchYearForm.get('batchid')?.setValue(batch.batchid);
    this.BatchYearForm.get('batch_year')?.setValue(batch.batch_year);
    this.BatchYearForm.get('cuid')?.setValue(batch.cuid);
    this.buttonId = false;
  }
  ActiveStatusClick(batchid: number) {
    this.batchyearSvc.ActiveStatusBatch(batchid).subscribe(res => {
      if (res?.recordid) {
        this.refreshBatchYearList();
        this.getMaxId();
        this.cancelClick();
      }
    });
  }

  deleteClick(batchid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.batchyearSvc.deleteBatch(batchid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refreshBatchYearList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  cancelClick() {
    this.BatchYearForm.reset();
    this.BatchYearForm.get('batchid')?.setValue(0);
    this.BatchYearForm.get('batch_year')?.setValue('');
    this.BatchYearForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }
}

