import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { bookPurchaseService } from 'src/app/api-service/bookPurchase.service';

@Component({
  selector: 'app-book-purchase',
  templateUrl: './book-purchase.component.html',
  styleUrls: ['./book-purchase.component.scss']
})
export class BookPurchaseComponent implements OnInit {
  purchaseList: any[] = [];
  constructor(private router: Router,
    private boPurSvc: bookPurchaseService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService) { }

  ngOnInit(): void {
    this.refreshPurchaseList();
    this.purchaseCancelClick();
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

  bookPurchaseForm = new FormGroup({
    purchase_id: new FormControl(0),
    purchase_date: new FormControl(''),
    sp_bill_no: new FormControl(''),
    sp_name: new FormControl(''),
    bill_no: new FormControl(''),
    book_author: new FormControl(''),
    mat_name: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    cuid: new FormControl(1)
  });

  refreshPurchaseList() {
    this.boPurSvc.getPurchaseList().subscribe(data => {
      this.purchaseList = data;
    });
  }


  save() {
    if (this.bookPurchaseForm.valid) {
      if (this.bookPurchaseForm.value.purchase_id == 0) {
        this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
          .afterClosed().subscribe(res => {
            if (res == true) {
              var departmentinsert = (this.bookPurchaseForm.value);
              this.boPurSvc.addNewPurchase(departmentinsert).subscribe(res => {
                if (res.status == 'Saved successfully') {
                  this.notificationSvc.success("Saved successfully")
                  this.refreshPurchaseList();
                  this.purchaseCancelClick();
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
      this.bookPurchaseForm.markAllAsTouched();
      this.notificationSvc.error("Fill mandatory");
    }
  }

  purchaseCancelClick() {
    this.bookPurchaseForm.reset();
    this.bookPurchaseForm.get('purchase_id')?.setValue(0),
      this.bookPurchaseForm.get('purchase_date')?.setValue(''),
      this.bookPurchaseForm.get('sp_bill_no')?.setValue(''),
      this.bookPurchaseForm.get('sp_name')?.setValue(''),
      this.bookPurchaseForm.get('bill_no')?.setValue(''),
      this.bookPurchaseForm.get('book_author')?.setValue(''),
      this.bookPurchaseForm.get('mat_name')?.setValue(''),
      this.bookPurchaseForm.get('price')?.setValue(''),
      this.bookPurchaseForm.get('quantity')?.setValue(''),
      this.bookPurchaseForm.get('cuid')?.setValue(1)
  }

}
