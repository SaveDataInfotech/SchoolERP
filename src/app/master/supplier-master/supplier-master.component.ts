import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { SupplierTypeService } from 'src/app/api-service/SupplierType.service';

@Component({
  selector: 'app-supplier-master',
  templateUrl: './supplier-master.component.html',
  styleUrls: ['./supplier-master.component.scss']
})
export class SupplierMasterComponent implements OnInit {

  SupplierList: any = [];
  MaxId: any = [];
  buttonId: boolean = true;

  constructor(
    private stySvc: SupplierTypeService, private DialogSvc: DialogService,
    private notificationSvc: NotificationsService, private router: Router) {
  }
  ngOnInit(): void {
    this.refresupplierTypeList(),
      this.getMaxId(),
      this.cancelClick()
  }

  suppliertypeForm = new FormGroup({
    supplierid: new FormControl(0),
    supplier_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    mobile_number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]),
    gst_no: new FormControl('', [Validators.required]),
    balance: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    cuid: new FormControl(1),
  })
  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  refresupplierTypeList() {
    this.stySvc.getsupplierTypeList().subscribe(data => {
      this.SupplierList = data;
    });
  }

  newSupplierType() {
    if (this.suppliertypeForm.valid) {
      if (this.suppliertypeForm.value.supplierid == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var suppliertypeinsert = (this.suppliertypeForm.value);
              this.stySvc.addNewsupplierType(suppliertypeinsert).subscribe(res => {
                console.log(res, 'resss')
                if (res?.recordid) {
                  this.notificationSvc.success("Saved Success")
                  this.refresupplierTypeList();
                  this.getMaxId();
                  this.cancelClick();
                }
              });
            }
          });
      }
      else if (this.suppliertypeForm.value.supplierid != 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to update this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var suppliertypeinsert = (this.suppliertypeForm.value);
              this.stySvc.addNewsupplierType(suppliertypeinsert).subscribe(res => {
                console.log(res, 'resss')
                if (res?.recordid) {
                  this.notificationSvc.success("Updated Success")
                  this.refresupplierTypeList();
                  this.getMaxId();
                  this.cancelClick();
                }
              });
            }
          });
      }
    }
    else {
      this.suppliertypeForm.markAllAsTouched();
    }
  }

  getMaxId() {
    this.stySvc.getMaxId().subscribe(data => {
      this.MaxId = data;
    });
  }

  //sample  for Dialog working
  deleteClick(supplierid: number) {
    this.DialogSvc.openConfirmDialog('Are you sure want to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res == true) {
          this.stySvc.deletesupplierType(supplierid).subscribe(res => {
            if (res?.recordid) {
              this.notificationSvc.error("Deleted Success")
              this.refresupplierTypeList();
              this.getMaxId();
              this.cancelClick();
            }
          });
        }
      });
  }

  udateGetClick(supplier: any) {
    this.suppliertypeForm.get('supplierid')?.setValue(supplier.supplierid);
    this.suppliertypeForm.get('supplier_name')?.setValue(supplier.supplier_name);
    this.suppliertypeForm.get('mobile_number')?.setValue(supplier.mobile_number);
    this.suppliertypeForm.get('gst_no')?.setValue(supplier.gst_no);
    this.suppliertypeForm.get('balance')?.setValue(supplier.balance);
    this.suppliertypeForm.get('address')?.setValue(supplier.address);
    this.suppliertypeForm.get('cuid')?.setValue(supplier.cuid);
    this.buttonId = false;
  }

  cancelClick() {
    this.suppliertypeForm.reset();
    this.suppliertypeForm.get('supplierid')?.setValue(0);
    this.suppliertypeForm.get('supplier_name')?.setValue('');
    this.suppliertypeForm.get('mobile_number')?.setValue('');
    this.suppliertypeForm.get('gst_no')?.setValue('');
    this.suppliertypeForm.get('balance')?.setValue('');
    this.suppliertypeForm.get('address')?.setValue('');
    this.suppliertypeForm.get('cuid')?.setValue(1);
    this.buttonId = true;
  }
}