import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { resonDialogService } from 'src/app/api-service/resonDialog.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-batch-year',
  templateUrl: './batch-year.component.html',
  styleUrls: ['./batch-year.component.scss']
})
export class BatchYearComponent implements OnInit {

  constructor(private batchyearSvc: BatechYearService,
    private DialogSvc: DialogService,
    private resonDialogSvc: resonDialogService,
    private notificationSvc: NotificationsService,
    private router: Router) { }
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
    updateReson: new FormControl(''),
    cuid: new FormControl(1),
  })

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

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
      if (this.BatchYearForm.value.batchid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var Batchinsert = (this.BatchYearForm.value);
              this.batchyearSvc.addNewBatch(Batchinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved Success")
                  this.refreshBatchYearList();
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
        this.resonDialogSvc.openConfirmDialog('')
          .afterClosed().subscribe(res => {
            if (res != null && res != false) {
              this.BatchYearForm.get('updateReson')?.setValue(res);
              this.DialogSvc.openConfirmDialog('Are you sure want to edit this record ?')
                .afterClosed().subscribe(res => {
                  if (res == true) {
                    var Batchinsert = (this.BatchYearForm.value);
                    this.batchyearSvc.addNewBatch(Batchinsert).subscribe(res => {
                      if (res.status == 'Saved successfully') {
                        this.notificationSvc.success("Updated Success")
                        this.refreshBatchYearList();
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
            else if (res == false) {
              this.notificationSvc.warn("If you want to edit this,Enter your reson!")
            }
            else {
              this.notificationSvc.error("Invalid reson")
            }
          });
      }
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