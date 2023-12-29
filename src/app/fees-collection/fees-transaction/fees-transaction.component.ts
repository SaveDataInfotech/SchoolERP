import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeescollectionService } from 'src/app/api-service/feesCollection.service';
import { FeesTransactionService } from 'src/app/api-service/feetransaction.service';
import { PreviewFeesDialogService } from 'src/app/api-service/previewFeesDialog.service';
import { SchoolfeeEditDialogService } from 'src/app/api-service/schoolFeeEditDialog.service';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-fees-transaction',
  templateUrl: './fees-transaction.component.html',
  styleUrls: ['./fees-transaction.component.scss']
})
export class FeesTransactionComponent implements OnInit {
  feeTransactionList: any[] = [];
  Listgeneralfeesbybillno: any[] = [];
  busfeesbybillnoList: any[] = [];
  arrearfeesbybillnoList: any[] = [];

  constructor(private trSacSvc: FeesTransactionService,
    private pDSvc: PreviewFeesDialogService,
    private feesCollSvc: FeescollectionService,
    private notificationSvc: NotificationsService,
    private eDSvc: SchoolfeeEditDialogService,
    private spinner: NgxSpinnerService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  @ViewChild('tableRef') tableRef: ElementRef;

  scrollToTop() {
    if (this.tableRef && this.tableRef.nativeElement) {
      const tableElement = this.tableRef.nativeElement.querySelector('table');
      tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToBottom() {
    if (this.tableRef && this.tableRef.nativeElement) {
      const tableElement = this.tableRef.nativeElement.querySelector('table');
      tableElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  feesTransactionForm = new FormGroup({
    fromdate: new FormControl(''),
    todate: new FormControl('')
  });

  async searchTransaction() {
    const fromDate = this.feesTransactionForm.value.fromdate
    const toDate = this.feesTransactionForm.value.todate
    if (this.feesTransactionForm.valid) {
      this.spinner.show();
      await this.trSacSvc.feeTransactionList(fromDate, toDate).subscribe(data => {
        this.feeTransactionList = data;
        this.spinner.hide();
      });      
    }
    else {
      this.feesTransactionForm.markAllAsTouched()
    }
  }

  async previewClick(value: any): Promise<void> {
    const generalFees = await this.feesCollSvc.getgeneralfeesbybillno(value.bill_no, value.admission_no).toPromise();
    this.Listgeneralfeesbybillno = generalFees;

    const busFees = await this.feesCollSvc.getbusfeesbybillno(value.bill_no, value.admission_no).toPromise();
    this.busfeesbybillnoList = busFees;

    const arrearFees = await this.feesCollSvc.getArrearfeesbybillno(value.bill_no, value.admission_no).toPromise();
    this.arrearfeesbybillnoList = arrearFees;

    this.pDSvc.openConfirmDialog(this.Listgeneralfeesbybillno, this.busfeesbybillnoList, this.arrearfeesbybillnoList, value)
      .afterClosed().subscribe(res => {
        if (res == true) {
        }
      });
  }

  editClick(value) {
    this.eDSvc.openConfirmDialog(value)
      .afterClosed().subscribe(res => {
        
        if (res) {
          this.feesCollSvc.studentFeesEdit(res).subscribe(res => {
            if (res.status == 'Saved successfully') {
              this.searchTransaction();
              this.notificationSvc.success("Saved Success");
            }
            else {
              this.notificationSvc.error("Something error")
            }
          });
        }
      });
  }
}
