import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { StaffLoanService } from 'src/app/api-service/staffLoan.service';
import { staffProfileService } from 'src/app/api-service/staffProfile.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';

@Component({
  selector: 'app-staff-loan',
  templateUrl: './staff-loan.component.html',
  styleUrls: ['./staff-loan.component.scss']
})
export class StaffLoanComponent implements OnInit {
  StaffTypeList: any[] = [];
  staffList: any[] = [];
  staffListAll: any[] = [];
  staffFilterList: any[] = [];
  LoanList: any[] = [];
  staffDeductionFilterList: any[] = [];


  constructor(
    private notificationSvc: NotificationsService,
    private SttySvc: staffTypeService,
    private DialogSvc: DialogService,
    private staffSvc: staffProfileService,
    private LoanSvc: StaffLoanService,
    private currencyPipe: CurrencyPipe
  ) { }

  date1 = new Date();

  currentYear = this.date1.getUTCFullYear();

  currentMonth = this.date1.getUTCMonth() + 1;

  currentDate = this.date1.getUTCDate();

  todayDate: Date = new Date();
  today = String(this.todayDate);

  finalMonth: any;
  finalDay: any;

  ngOnInit(): void {

    if (this.currentMonth < 10) {
      this.finalMonth = "0" + this.currentMonth;
    }
    else {
      this.finalMonth = this.currentMonth;
    }


    if (this.currentDate < 10) {
      this.finalDay = "0" + this.currentDate;
    }
    else {
      this.finalDay = this.currentDate;
    }

    this.today = this.currentYear + "-" + this.finalMonth + "-" + this.finalDay;
    this.staffLoanForm.get('date')?.setValue(this.today);
    this.staffLoanDeductionForm.get('payment_date')?.setValue(this.today);
    this.refreshstaffTypeList();
    this.refreshStaffList();
    this.refreshgetLoanList();
  }

  refreshstaffTypeList() {
    this.SttySvc.getstaffTypeList().subscribe(data => {
      this.StaffTypeList = data;
    });
  }

  refreshStaffList() {
    this.staffSvc.getstaffProfileList().subscribe(data => {
      this.staffListAll = data;
      this.staffList = this.staffListAll.filter((e) => { return e.activestatus == 1 })
    });
  }

  staffFilter(value) {
    debugger;
    this.staffLoanForm.get('staff_no')?.setValue('');
    this.staffLoanForm.get('staff_name')?.setValue('');
    this.staffFilterList = this.staffListAll.filter((e) => { return e.staff_type == value })
  }

  

  refreshgetLoanList() {
    this.LoanSvc.getLoanList().subscribe(data => {
      this.LoanList = data;
    });
  }

  staffNameBind(value) {
    debugger;
    const name = this.staffFilterList.filter((e) => { return e.staff_no == value });
    this.staffLoanForm.get('staff_name')?.setValue(name[0].staff_name);
  }

  staffLoanForm = new FormGroup({
    id: new FormControl(0),
    staff_type: new FormControl('', [Validators.required]),
    date: new FormControl(''),
    staff_no: new FormControl('', [Validators.required]),
    staff_name: new FormControl(''),
    loan_amount: new FormControl('', [Validators.required]),
    n_month: new FormControl('', [Validators.required]),
    emi_amount: new FormControl(''),
    cuid: new FormControl(1)
  });


  get staff_type() {
    return this.staffLoanForm.get('staff_type');
  }
  get staff_no() {
    return this.staffLoanForm.get('staff_no');
  }

  saNewLoan() {
    if (this.staffLoanForm.valid) {
      var loanInsert = (this.staffLoanForm.value);
      if (Number(this.staffLoanForm.value.n_month) <= 0) {
        this.notificationSvc.error("Invalid Total No Of Month")
      }
      else if (Number(this.staffLoanForm.value.emi_amount) <= 0) {
        this.notificationSvc.error("Invalid Emi Amount")
      }
      else {
        this.LoanSvc.addNewLoan(loanInsert).subscribe(res => {
          if (res.status == 'Insert Success') {
            this.notificationSvc.success("Saved Success")
            this.refreshgetLoanList();
            this.newLoanCancelClick();
          }
          else if (res.status == 'Already exists') {
            this.notificationSvc.warn(this.staffLoanForm.value.staff_name + " " + "Already having Loan")
          }
          else {
            this.notificationSvc.error("Something error")
          }
        });
      }
    }
    else {
      this.staffLoanForm.markAllAsTouched();
    }

  }

  automatedEmiAmount() {
    debugger;
    const amount = Number(this.staffLoanForm.value.loan_amount) / Number(this.staffLoanForm.value.n_month);
    this.staffLoanForm.get('emi_amount')?.setValue(String(amount));

    if (this.staffLoanForm.value.emi_amount == "Infinity") {
      this.staffLoanForm.get('emi_amount')?.setValue('');
    }
    else if (this.staffLoanForm.value.emi_amount == "NaN") {
      this.staffLoanForm.get('emi_amount')?.setValue('');
    }
  }

  newLoanCancelClick() {
    this.staffLoanForm.reset();
    this.staffLoanForm.get('id')?.setValue(0);
    this.staffLoanForm.get('staff_type')?.setValue('');
    this.staffLoanForm.get('date')?.setValue(this.today);
    this.staffLoanForm.get('staff_no')?.setValue('');
    this.staffLoanForm.get('staff_name')?.setValue('');
    this.staffLoanForm.get('loan_amount')?.setValue('');
    this.staffLoanForm.get('n_month')?.setValue('');
    this.staffLoanForm.get('emi_amount')?.setValue('');
    this.staffLoanForm.get('cuid')?.setValue(1);
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  
  staffDeducFilter(value) {
    debugger;   
    this.cancelClick1()
    this.staffDeductionFilterList = this.LoanList.filter((e) => { return e.staff_type == value })
  }

  patchvalue(value) {
    const patchList = this.LoanList.filter((e) => { return e.staff_no == value })
    this.staffLoanDeductionForm.patchValue(patchList[0]);
    this.staffLoanDeductionForm.get('d_amount')?.setValue(patchList[0].emi_amount);
    this.staffLoanDeductionForm.get('payment_date')?.setValue(this.today);
  }


  comparePayAmount(value){
    const bAmount= Number(this.staffLoanDeductionForm.value.balance_amount);
    if(bAmount < Number(value)){
      this.notificationSvc.error("Invalid Payable Amount")
    }
  };

  staffLoanDeductionForm = new FormGroup({
    id: new FormControl(0),
    staff_type: new FormControl(''),
    date: new FormControl(''),
    staff_no: new FormControl(''),
    staff_name: new FormControl(''),
    loan_amount: new FormControl(''),
    emi_amount: new FormControl(''),
    n_month: new FormControl(''),
    balance_amount: new FormControl(''),
    n_dues: new FormControl(''),
    d_amount: new FormControl(''),
    pn_month: new FormControl(false),
    payment_date:new FormControl(''),
    cuid: new FormControl(1)
  })

  PNChange(event: any) {
    debugger;    
    if (event.target.checked) {
      this.staffLoanDeductionForm.get('d_amount')?.setValue('0');
    } else {
      this.staffLoanDeductionForm.get('d_amount')?.setValue(this.staffLoanDeductionForm.value.emi_amount);
    }
  };

  LoanDeduction() {
    debugger;
    console.log(this.staffLoanDeductionForm.value)
    if(Number(this.staffLoanDeductionForm.value.d_amount) <= Number(this.staffLoanDeductionForm.value.balance_amount)  ){
      var loanInsert = (this.staffLoanDeductionForm.value);
      this.LoanSvc.LoanDeduction(loanInsert).subscribe(res => {
        if (res.status == 'Insert Success') {
          this.notificationSvc.success("Saved Success")
          this.refreshgetLoanList();
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
    else {
      this.notificationSvc.error("The payable amount should be less than or equal to the balance")
    }
  }

  cancelClick() {
    this.staffLoanDeductionForm.reset();
    this.staffLoanDeductionForm.get('id')?.setValue(0);
    this.staffLoanDeductionForm.get('staff_type')?.setValue('');
    this.staffLoanDeductionForm.get('date')?.setValue('');
    this.staffLoanDeductionForm.get('staff_no')?.setValue('');
    this.staffLoanDeductionForm.get('staff_name')?.setValue('');
    this.staffLoanDeductionForm.get('loan_amount')?.setValue('');
    this.staffLoanDeductionForm.get('emi_amount')?.setValue('');
    this.staffLoanDeductionForm.get('n_month')?.setValue('');
    this.staffLoanDeductionForm.get('balance_amount')?.setValue('');
    this.staffLoanDeductionForm.get('n_dues')?.setValue('');
    this.staffLoanDeductionForm.get('d_amount')?.setValue('');
    this.staffLoanDeductionForm.get('pn_month')?.setValue(false);
    this.staffLoanDeductionForm.get('payment_date')?.setValue(this.today);
    this.staffLoanDeductionForm.get('cuid')?.setValue(0);
  }

  cancelClick1() {
    this.staffLoanDeductionForm.get('id')?.setValue(0);   
    this.staffLoanDeductionForm.get('date')?.setValue('');
    this.staffLoanDeductionForm.get('staff_no')?.setValue('');
    this.staffLoanDeductionForm.get('staff_name')?.setValue('');
    this.staffLoanDeductionForm.get('loan_amount')?.setValue('');
    this.staffLoanDeductionForm.get('emi_amount')?.setValue('');
    this.staffLoanDeductionForm.get('n_month')?.setValue('');
    this.staffLoanDeductionForm.get('balance_amount')?.setValue('');
    this.staffLoanDeductionForm.get('n_dues')?.setValue('');
    this.staffLoanDeductionForm.get('d_amount')?.setValue('');
    this.staffLoanDeductionForm.get('pn_month')?.setValue(false);
    this.staffLoanDeductionForm.get('payment_date')?.setValue(this.today);
    this.staffLoanDeductionForm.get('cuid')?.setValue(0);
  }

}
