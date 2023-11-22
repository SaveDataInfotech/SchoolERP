import { Component, OnInit } from '@angular/core';
import { studentClassService } from 'src/app/api-service/studentClass.service';
import { studentGroupService } from 'src/app/api-service/studentGroup.service';
import { studentSectionService } from 'src/app/api-service/StudentSection.service';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { NotificationsService } from 'angular2-notifications';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FeescollectionService } from 'src/app/api-service/feesCollection.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BatechYearService } from 'src/app/api-service/batchYear.service';
import { Router } from '@angular/router';
import { PreviewFeesDialogService } from 'src/app/api-service/previewFeesDialog.service';
import { studentProfileService } from 'src/app/api-service/studentProfile.service';

@Component({
  selector: 'app-student-fees',
  templateUrl: './student-fees.component.html',
  styleUrls: ['./student-fees.component.scss']
})
export class StudentFeesComponent implements OnInit {
  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  StudentList: any[] = [];
  FeesCollectionList: any[] = [];
  BusFeesesList: any[] = [];
  total: number = 0;
  activeBatchYear: any = [];
  newgetbatch: string;
  maxIDList: any[] = [];
  generalFeesList: any[] = [];
  Listgeneralfeesbybillno: any[] = [];
  busfeesbybillnoList: any[] = [];
  maxnumber: number;
  billno: string;
  constructor(private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private feesCollSvc: FeescollectionService,
    private spinner: NgxSpinnerService,
    private batchSvc: BatechYearService,
    private router: Router,
    private pDSvc: PreviewFeesDialogService,
    private studProSvc: studentProfileService,) { }


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
    this.feesCollectionForm.get('date').setValue(this.today);
    /////////////
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.GetActiveBatchYear();
    this.getMaxId();
    this.refreshRecentFeesCollectionList(this.today);
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

  GetActiveBatchYear() {
    this.batchSvc.GetActiveBatchYear().subscribe(data => {
      this.activeBatchYear = data;
      const getbatch = JSON.stringify(this.activeBatchYear[0].batch_year)
      this.newgetbatch = (getbatch.replace(/['"]+/g, ''));
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

  refreshSectionList() {
    this.ScSvc.getSectionList().subscribe(data => {
      this.SectionList = data;
    });
  }

  async getMaxId() {
    const max = await this.feesCollSvc.getMaxId().toPromise();
    this.maxIDList = max;
    this.maxnumber = this.maxIDList[this.maxIDList.length - 1].s_deductionid + 1;

    const maxnum: string = String(this.maxnumber).padStart(4, '0');
    this.billno = maxnum;
    this.feesCollectionForm.get('bill_no')?.setValue(maxnum);
  }

  refreshRecentFeesCollectionList(today) {
    this.feesCollSvc.RecentFeesCollectionList(today).subscribe(data => {
      this.FeesCollectionList = data;
    });
  }

  feesCollectionForm = new FormGroup({
    select_all: new FormControl(false),
    admission_no: new FormControl(''),
    classid: new FormControl(),
    groupid: new FormControl(),
    sectionid: new FormControl(),
    student_name: new FormControl(''),
    batch_year: new FormControl(''),
    date: new FormControl(''),
    total_amount: new FormControl(''),
    bill_no: new FormControl(''),
    payment_type: new FormControl('cash'),
    cuid: new FormControl(1),
    busFeesList: new FormArray([
    ]),
    generalFees: new FormArray([
    ])
  });
  getCommonControls() {
    return (this.feesCollectionForm.get('generalFees') as FormArray).controls;
  }

  getBusControls() {
    return (this.feesCollectionForm.get('busFeesList') as FormArray).controls;
  }

  async getStudent(value) {
    debugger;
    const studentDetails = await this.studProSvc.searchstudentDetails(value).toPromise();
    this.StudentList = studentDetails;
    debugger;
    if (this.StudentList.length != 0) {
      this.feesCollectionForm.get('classid')?.setValue(this.StudentList[0].classid);
      this.feesCollectionForm.get('groupid')?.setValue(this.StudentList[0].groupid);
      this.feesCollectionForm.get('sectionid')?.setValue(this.StudentList[0].sectionid);
      this.feesCollectionForm.get('student_name')?.setValue(this.StudentList[0].student_name);
      this.feesCollectionForm.get('batch_year')?.setValue(this.StudentList[0].batch_year);
      this.feesCollectionForm.get('cuid')?.setValue(1);

      const busFee = await this.feesCollSvc.getBusFeesList(value).toPromise();
      this.BusFeesesList = busFee;

      const control3 = <FormArray>this.feesCollectionForm.controls['busFeesList'];
      while (control3.length !== 0) {
        control3.removeAt(0)
      }

      if (control3.length == 0) {
        this.BusFeesesList.forEach(element => {
          if (element.balance != 0) {
            const control = <FormArray>this.feesCollectionForm.controls['busFeesList'];
            control.push(
              new FormGroup({
                selected: new FormControl(false),
                feesid: new FormControl(element.feesid),
                admission_no: new FormControl(this.feesCollectionForm.value.admission_no),
                classid: new FormControl(element.classid),
                groupid: new FormControl(element.groupid),
                sectionid: new FormControl(element.sectionid),
                gender: new FormControl(element.gender),
                date: new FormControl(this.feesCollectionForm.value.date),
                batch_year: new FormControl(element.batch_year),
                typeid: new FormControl(element.typeid),
                vehicle_name: new FormControl(element.vehicle_name),
                kmrange: new FormControl(element.kmrange),
                fees_lessid: new FormControl(element.fees_lessid),
                amount: new FormControl(element.amount),
                balance: new FormControl(element.balance),
                deduction_amount: new FormControl(''),
                bill_no: new FormControl(this.feesCollectionForm.value.bill_no),
                payment_type: new FormControl(this.feesCollectionForm.value.payment_type),
                cuid: new FormControl(this.feesCollectionForm.value.cuid),
              })
            )
          }
        });
      }

      const generalFee = await this.feesCollSvc.getGeneralFeesList(value).toPromise();
      this.generalFeesList = generalFee;

      const control4 = <FormArray>this.feesCollectionForm.controls['generalFees'];
      while (control4.length !== 0) {
        control4.removeAt(0)
      }

      if (control4.length == 0) {
        this.generalFeesList.forEach(element => {
          if (element.balance != 0) {
            const control = <FormArray>this.feesCollectionForm.controls['generalFees'];
            control.push(
              new FormGroup({
                selected: new FormControl(false),
                feesid: new FormControl(element.feesid),
                admission_no: new FormControl(this.feesCollectionForm.value.admission_no),
                classid: new FormControl(element.classid),
                groupid: new FormControl(element.groupid),
                sectionid: new FormControl(element.sectionid),
                gender: new FormControl(element.gender),
                date: new FormControl(this.feesCollectionForm.value.date),
                batch_year: new FormControl(element.batch_year),
                typeid: new FormControl(element.typeid),
                type_name: new FormControl(element.type_name),
                fees_lessid: new FormControl(element.fees_lessid),
                amount: new FormControl(element.amount),
                balance: new FormControl(element.balance),
                deduction_amount: new FormControl(''),
                bill_no: new FormControl(this.feesCollectionForm.value.bill_no),
                payment_type: new FormControl(this.feesCollectionForm.value.payment_type),
                cuid: new FormControl(this.feesCollectionForm.value.cuid),
              })
            )
          }
        });
      }

    }
    else {
      this.notificationSvc.error('Invalid Admission Number')
    }
  }

  updateSelectAllCheckbox(i, value) {
    debugger;
    let total: number = 0;
    const classidArray = this.feesCollectionForm.get('generalFees') as FormArray;
    const busArray = this.feesCollectionForm.get('busFeesList') as FormArray;
    if (value.target.checked) {
      const am = classidArray.at(i).get('balance').value;
      classidArray.at(i).get('deduction_amount').setValue(am);
    }
    else {
      classidArray.at(i).get('deduction_amount').setValue('0');
    }
    const allSelectedInClassidArray = classidArray.controls.every(control => control.get('selected').value === true);
    const allSelectedInBusArray = busArray.controls.every(control => control.get('selected').value === true);
    if (allSelectedInClassidArray && allSelectedInBusArray) {
      this.feesCollectionForm.get('select_all').setValue(true);
    } else {
      this.feesCollectionForm.get('select_all').setValue(false);
    }

    const bus = this.feesCollectionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {

      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    const common = this.feesCollectionForm.get('generalFees') as FormArray;
    common.controls.forEach((e) => {

      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  }

  updateSelectAllCheckboxByBus(i, value) {
    debugger;
    let total: number = 0;
    const classidArray = this.feesCollectionForm.get('generalFees') as FormArray;
    const busArray = this.feesCollectionForm.get('busFeesList') as FormArray;
    if (value.target.checked) {
      const am = busArray.at(i).get('balance').value;
      busArray.at(i).get('deduction_amount').setValue(am);
    }
    else {
      busArray.at(i).get('deduction_amount').setValue('0');
    }
    const allSelectedInClassidArray = classidArray.controls.every(control => control.get('selected').value === true);
    const allSelectedInBusArray = busArray.controls.every(control => control.get('selected').value === true);
    if (allSelectedInClassidArray && allSelectedInBusArray) {
      this.feesCollectionForm.get('select_all').setValue(true);
    } else {
      this.feesCollectionForm.get('select_all').setValue(false);
    }

    const bus = this.feesCollectionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {

      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    const common = this.feesCollectionForm.get('generalFees') as FormArray;
    common.controls.forEach((e) => {

      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  }

  toggleAllCheckboxes(value) {
    debugger;
    let total: number = 0;
    const selectAllValue = this.feesCollectionForm.get('select_all').value;
    const classidArray = this.feesCollectionForm.get('generalFees') as FormArray;
    const busArray = this.feesCollectionForm.get('busFeesList') as FormArray;
    if (value.target.checked) {
      for (let i = 0; i < classidArray.length; i++) {
        classidArray.at(i).get('selected').setValue(selectAllValue);
        const am = classidArray.at(i).get('balance').value;
        classidArray.at(i).get('deduction_amount').setValue(am);
      }

      for (let i = 0; i < busArray.length; i++) {
        busArray.at(i).get('selected').setValue(selectAllValue);
        const am = busArray.at(i).get('balance').value;
        busArray.at(i).get('deduction_amount').setValue(am);
      }
    }
    else {
      for (let i = 0; i < classidArray.length; i++) {
        classidArray.at(i).get('selected').setValue(selectAllValue);
        classidArray.at(i).get('deduction_amount').setValue('0');
      }

      for (let i = 0; i < busArray.length; i++) {
        busArray.at(i).get('selected').setValue(selectAllValue);
        busArray.at(i).get('deduction_amount').setValue('0');
      }
    }
    const common = this.feesCollectionForm.get('generalFees') as FormArray;
    common.controls.forEach((e) => {

      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    const bus = this.feesCollectionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {

      const num = Number(e.value.deduction_amount);
      total = total + num;
    })
    this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  }

  bustotal(i, val) {
    let total: number = 0;
    const busControl = this.feesCollectionForm.get('busFeesList') as FormArray;
    const busam = busControl.at(i).get('balance').value;
    if (Number(busam) < Number(val)) {
      this.notificationSvc.error('Invalid Payable Amount');
      const busControl1 = this.feesCollectionForm.get('busFeesList') as FormArray;
      busControl1.at(i).get('deduction_amount').setValue('0');
    }

    const bus = this.feesCollectionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {

      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    const common = this.feesCollectionForm.get('generalFees') as FormArray;
    common.controls.forEach((e) => {

      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  }

  commontotal(i, val) {

    let total: number = 0;
    const busControl = this.feesCollectionForm.get('generalFees') as FormArray;
    const busam = busControl.at(i).get('balance').value;
    if (Number(busam) < Number(val)) {
      this.notificationSvc.error('Invalid Payable Amount');
      const busControl1 = this.feesCollectionForm.get('generalFees') as FormArray;
      busControl1.at(i).get('deduction_amount').setValue('0');
    }

    const common = this.feesCollectionForm.get('generalFees') as FormArray;
    common.controls.forEach((e) => {

      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    const bus = this.feesCollectionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {

      const num = Number(e.value.deduction_amount);
      total = total + num;
    })
    this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  }


  async FeesDeduction() {
    debugger;
    await this.getMaxId();
    this.feesCollSvc.RecentFeesCollectionList(this.today).subscribe(data => {
      debugger;
      this.FeesCollectionList = data;
      const CheckBillNo = this.FeesCollectionList.filter((e) => { return e.bill_no == this.feesCollectionForm.value.bill_no });
      if(CheckBillNo.length ==0){
        if (this.feesCollectionForm.valid) {
          var feesInsert = (this.feesCollectionForm.value);
          this.DialogSvc.openConfirmDialog('Are you sure want to Save?')
            .afterClosed().subscribe(res => {
              if (res == true) {
                this.feesCollSvc.studentFeesDeduction(feesInsert).subscribe(res => {
                  if (res.status == 'Insert Success') {
                    this.notificationSvc.success("Saved Success");
                    this.getMaxId();
                    this.cancelclick();
                    this.refreshRecentFeesCollectionList(this.today);
                  }
                  else {
                    this.notificationSvc.error("Something error")
                  }
                });
              }
            });
        } else {
          this.feesCollectionForm.markAllAsTouched();
          this.notificationSvc.error("Fill in the mandatory fileds");
        }
      }
      else{
       this.getMaxId()
        this.notificationSvc.error("Already have the bill number so I changed it - please save again");
      }
    });
  }

  async previewClick(value: any): Promise<void> {
    const generalFees = await this.feesCollSvc.getgeneralfeesbybillno(value.bill_no).toPromise();
    this.Listgeneralfeesbybillno = generalFees;
    debugger
    const busFees = await this.feesCollSvc.getbusfeesbybillno(value.bill_no).toPromise();
    this.busfeesbybillnoList = busFees;
    debugger;

    this.pDSvc.openConfirmDialog(this.Listgeneralfeesbybillno, this.busfeesbybillnoList, value)
      .afterClosed().subscribe(res => {
        if (res == true) {
        }
      });
  }

  cancelclick() {
    this.getMaxId();
    this.refreshRecentFeesCollectionList(this.today);
    this.feesCollectionForm.reset();
    this.feesCollectionForm.get('date')?.setValue(this.today);
    this.feesCollectionForm.get('payment_type')?.setValue('cash');

    const control2 = <FormArray>this.feesCollectionForm.controls['busFeesList'];
    while (control2.length !== 0) {
      control2.removeAt(0)
    }

    const control5 = <FormArray>this.feesCollectionForm.controls['generalFees'];
    while (control5.length !== 0) {
      control5.removeAt(0)
    }
  }

}
