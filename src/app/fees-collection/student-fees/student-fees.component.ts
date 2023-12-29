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
import { ViewChild, ElementRef } from '@angular/core';
import { SchoolfeeEditDialogService } from 'src/app/api-service/schoolFeeEditDialog.service';
import { FeesTypeService } from 'src/app/api-service/FeesType.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-student-fees',
  templateUrl: './student-fees.component.html',
  styleUrls: ['./student-fees.component.scss']
})
export class StudentFeesComponent implements OnInit {


  @ViewChild('csid') classSelect!: ElementRef;
  @ViewChild('dtv') dateInputRef!: ElementRef;

  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  StudentList: any[] = [];
  FeesCollectionList: any[] = [];
  BusFeesesList: any[] = [];
  activeBatchYear: any = [];
  newgetbatch: string;
  maxIDList: any[] = [];
  generalFeesList: any[] = [];
  arrearFeesList: any[] = [];
  Listgeneralfeesbybillno: any[] = [];
  busfeesbybillnoList: any[] = [];
  maxnumber: number;
  billno: string;
  arrearfeesbybillnoList: any[] = [];
  studentName: any[] = [];
  suggestions: any[] = [];
  FeesDetailList: any[] = [];
  FeesList: any[] = [];
  table1: boolean = false;
  table2: boolean = false;

  userID: number = Number(localStorage.getItem("userid"));
  roleName: string = localStorage.getItem("rolename");
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
    private studProSvc: studentProfileService,
    private eDSvc: SchoolfeeEditDialogService,
    private FtySvc: FeesTypeService) { }


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
    this.refreshFeesTypeList();
  }

  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }

  //// Number Only Event
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
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

  async refreshFeesTypeList() {
    const feeList = await this.FtySvc.getfeesTypeList().toPromise();
    this.FeesList = feeList;
  };

  refreshRecentFeesCollectionList(today) {
    this.table1 = true;
    this.table2 = false;
    this.feesCollSvc.RecentFeesCollectionList(today, this.userID, this.roleName).subscribe(data => {
      this.FeesCollectionList = data;
    });
  }

  async refreshRecentFeesDetailList(today) {
    this.table2 = true;
    this.table1 = false;
    const data = await this.feesCollSvc.RecentFeesDetailList(today, this.userID, this.roleName).toPromise();
    this.FeesDetailList = data
  }

  getCommonFees(value: any, i) {

    let newClass = [];
    let newAmount = [];
    let index: any;
    let getAmount: any;
    newClass = this.FeesDetailList[i].type_name.split(",");
    newAmount = this.FeesDetailList[i].deduction_amount.split(",");

    if (newClass.length == newAmount.length) {
      index = newClass.indexOf(value);
      if (index >= 0) {
        getAmount = newAmount[index];
      }
      else {
        getAmount = '0';
      }
    }

    if (getAmount) {
      return getAmount;
    }
    else {
      return '0'
    }
  }

  exportDayWiseTotalExcel(): void {
    const element = document.getElementById('detail_collection_print');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = 'FeeDetails.xlsx';

    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
  }


  feesCollectionForm = new FormGroup({
    select_all: new FormControl(false),
    admission_no: new FormControl(''),
    classid: new FormControl(),
    groupid: new FormControl(),
    sectionid: new FormControl(),
    student_name: new FormControl(''),
    father_name: new FormControl(''),
    batch_year: new FormControl(''),
    date: new FormControl(''),
    total_amount: new FormControl(''),
    bill_no: new FormControl(''),
    payment_type: new FormControl('cash'),
    cuid: new FormControl(this.userID),
    busFeesList: new FormArray([
    ]),
    generalFees: new FormArray([
    ]),
    arrearFees: new FormArray([
    ])
  });
  getCommonControls() {
    return (this.feesCollectionForm.get('generalFees') as FormArray).controls;
  }

  getBusControls() {
    return (this.feesCollectionForm.get('busFeesList') as FormArray).controls;
  }

  getArrearControls() {
    return (this.feesCollectionForm.get('arrearFees') as FormArray).controls;
  }

  async getStudent(value) {

    this.spinner.show();
    const studentDetails = await this.studProSvc.searchstudentDetails(value).toPromise();
    this.StudentList = studentDetails;

    if (this.StudentList.length != 0) {
      this.feesCollectionForm.get('classid')?.setValue(this.StudentList[0].classid);
      this.feesCollectionForm.get('groupid')?.setValue(this.StudentList[0].groupid);
      this.feesCollectionForm.get('sectionid')?.setValue(this.StudentList[0].sectionid);
      this.feesCollectionForm.get('student_name')?.setValue(this.StudentList[0].student_name);
      this.feesCollectionForm.get('father_name')?.setValue(this.StudentList[0].father_name);
      this.feesCollectionForm.get('batch_year')?.setValue(this.StudentList[0].batch_year);
      this.feesCollectionForm.get('admission_no')?.setValue(this.StudentList[0].admission_no);
      this.feesCollectionForm.get('cuid')?.setValue(this.userID);

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
                cuid: new FormControl(this.userID),
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
                cuid: new FormControl(this.userID),
              })
            )
          }
        });
      }


      const arrearFee = await this.feesCollSvc.getArrearFeesList(value).toPromise();
      this.arrearFeesList = arrearFee;

      const control5 = <FormArray>this.feesCollectionForm.controls['arrearFees'];
      while (control5.length !== 0) {
        control5.removeAt(0)
      }

      if (control5.length == 0) {

        this.arrearFeesList.forEach(element => {
          if (element.balance != 0) {

            const control = <FormArray>this.feesCollectionForm.controls['arrearFees'];
            control.push(
              new FormGroup({
                selected: new FormControl(false),
                arrear_feesid: new FormControl(element.arrear_feesid),
                admission_no: new FormControl(this.feesCollectionForm.value.admission_no),
                classid: new FormControl(element.classid),
                groupid: new FormControl(element.groupid),
                sectionid: new FormControl(element.sectionid),
                date: new FormControl(this.feesCollectionForm.value.date),
                batch_year: new FormControl(element.batch_year),
                type_name: new FormControl('Arrear Fees'),
                amount: new FormControl(element.amount),
                balance: new FormControl(element.balance),
                deduction_amount: new FormControl(''),
                bill_no: new FormControl(this.feesCollectionForm.value.bill_no),
                payment_type: new FormControl(this.feesCollectionForm.value.payment_type),
                cuid: new FormControl(this.userID),
              })
            )
          }
        });
      }

    }
    else {
      this.spinner.hide();
      this.notificationSvc.error('Invalid Admission Number')
    }
    this.spinner.hide();
  }

  updateSelectAllCheckbox(i, value) {

    let total: number = 0;
    const classidArray = this.feesCollectionForm.get('generalFees') as FormArray;
    const busArray = this.feesCollectionForm.get('busFeesList') as FormArray;
    const arrearArray = this.feesCollectionForm.get('arrearFees') as FormArray;
    if (value.target.checked) {
      const am = classidArray.at(i).get('balance').value;
      classidArray.at(i).get('deduction_amount').setValue(am);
    }
    else {
      classidArray.at(i).get('deduction_amount').setValue('0');
    }
    const allSelectedInClassidArray = classidArray.controls.every(control => control.get('selected').value === true);
    const allSelectedInBusArray = busArray.controls.every(control => control.get('selected').value === true);
    const allSelectedInArraearArray = arrearArray.controls.every(control => control.get('selected').value === true);
    if (allSelectedInClassidArray && allSelectedInBusArray && allSelectedInArraearArray) {
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

    const arrear = this.feesCollectionForm.get('arrearFees') as FormArray;
    arrear.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  }

  updateSelectAllCheckboxArraer(i, value) {

    let total: number = 0;
    const classidArray = this.feesCollectionForm.get('generalFees') as FormArray;
    const busArray = this.feesCollectionForm.get('busFeesList') as FormArray;
    const arrearArray = this.feesCollectionForm.get('arrearFees') as FormArray;
    if (value.target.checked) {
      const am = arrearArray.at(i).get('balance').value;
      arrearArray.at(i).get('deduction_amount').setValue(am);
    }
    else {
      arrearArray.at(i).get('deduction_amount').setValue('0');
    }
    const allSelectedInClassidArray = classidArray.controls.every(control => control.get('selected').value === true);
    const allSelectedInBusArray = busArray.controls.every(control => control.get('selected').value === true);
    const allSelectedInArraearArray = arrearArray.controls.every(control => control.get('selected').value === true);
    if (allSelectedInClassidArray && allSelectedInBusArray && allSelectedInArraearArray) {
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

    const arrear = this.feesCollectionForm.get('arrearFees') as FormArray;
    arrear.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  }


  updateSelectAllCheckboxByBus(i, value) {

    let total: number = 0;
    const classidArray = this.feesCollectionForm.get('generalFees') as FormArray;
    const busArray = this.feesCollectionForm.get('busFeesList') as FormArray;
    const arrearArray = this.feesCollectionForm.get('arrearFees') as FormArray;
    if (value.target.checked) {
      const am = busArray.at(i).get('balance').value;
      busArray.at(i).get('deduction_amount').setValue(am);
    }
    else {
      busArray.at(i).get('deduction_amount').setValue('0');
    }
    const allSelectedInClassidArray = classidArray.controls.every(control => control.get('selected').value === true);
    const allSelectedInBusArray = busArray.controls.every(control => control.get('selected').value === true);
    const allSelectedInArraearArray = arrearArray.controls.every(control => control.get('selected').value === true);
    if (allSelectedInClassidArray && allSelectedInBusArray && allSelectedInArraearArray) {
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

    const arrear = this.feesCollectionForm.get('arrearFees') as FormArray;
    arrear.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  }

  toggleAllCheckboxes(value) {

    let total: number = 0;
    const selectAllValue = this.feesCollectionForm.get('select_all').value;
    const classidArray = this.feesCollectionForm.get('generalFees') as FormArray;
    const busArray = this.feesCollectionForm.get('busFeesList') as FormArray;
    const arrearArray = this.feesCollectionForm.get('arrearFees') as FormArray;
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

      for (let i = 0; i < arrearArray.length; i++) {
        arrearArray.at(i).get('selected').setValue(selectAllValue);
        const aa = arrearArray.at(i).get('balance').value;
        arrearArray.at(i).get('deduction_amount').setValue(aa);
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

      for (let i = 0; i < arrearArray.length; i++) {
        arrearArray.at(i).get('selected').setValue(selectAllValue);
        arrearArray.at(i).get('deduction_amount').setValue('0');
      }
    }
    const common = this.feesCollectionForm.get('generalFees') as FormArray;
    common.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    });


    const bus = this.feesCollectionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    });

    const arrear = this.feesCollectionForm.get('arrearFees') as FormArray;
    arrear.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    });

    this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  }

  bustotal(i, val) {
    if (!isNaN(Number(val))) {
      if (/^\d+$/.test(val)) {
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
        });

        const common = this.feesCollectionForm.get('generalFees') as FormArray;
        common.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        const arrear = this.feesCollectionForm.get('arrearFees') as FormArray;
        arrear.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        this.feesCollectionForm.get('total_amount')?.setValue(String(total))

      } else {

        const busControl1 = this.feesCollectionForm.get('busFeesList') as FormArray;
        busControl1.at(i).get('deduction_amount').setValue('');
      }
    } else {
      this.notificationSvc.error('Entered value is not a number.');
      const busControl1 = this.feesCollectionForm.get('busFeesList') as FormArray;
      busControl1.at(i).get('deduction_amount').setValue('');
    }
  }

  commontotal(i, val) {
    if (!isNaN(Number(val))) {
      if (/^\d+$/.test(val)) {
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
        });

        const arrear = this.feesCollectionForm.get('arrearFees') as FormArray;
        arrear.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        this.feesCollectionForm.get('total_amount')?.setValue(String(total))
      } else {

        const busControl1 = this.feesCollectionForm.get('generalFees') as FormArray;
        busControl1.at(i).get('deduction_amount').setValue('');
      }
    } else {
      const busControl1 = this.feesCollectionForm.get('generalFees') as FormArray;
      busControl1.at(i).get('deduction_amount').setValue('');
      this.notificationSvc.error('Entered value is not a number.');
    }
  }

  arreartotal(i, val) {
    if (!isNaN(Number(val))) {
      if (/^\d+$/.test(val)) {
        let total: number = 0;
        const arrearControl = this.feesCollectionForm.get('arrearFees') as FormArray;
        const aram = arrearControl.at(i).get('balance').value;
        if (Number(aram) < Number(val)) {
          this.notificationSvc.error('Invalid Payable Amount');
          const arrearControl = this.feesCollectionForm.get('arrearFees') as FormArray;
          arrearControl.at(i).get('deduction_amount').setValue('0');
        }

        const common = this.feesCollectionForm.get('generalFees') as FormArray;
        common.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        const bus = this.feesCollectionForm.get('busFeesList') as FormArray;
        bus.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        const arrear = this.feesCollectionForm.get('arrearFees') as FormArray;
        arrear.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        this.feesCollectionForm.get('total_amount')?.setValue(String(total))
      } else {
        const arrearControl = this.feesCollectionForm.get('arrearFees') as FormArray;
        arrearControl.at(i).get('deduction_amount').setValue('');

      }
    } else {
      const arrearControl = this.feesCollectionForm.get('arrearFees') as FormArray;
      arrearControl.at(i).get('deduction_amount').setValue('');
      this.notificationSvc.error('Entered value is not a number.');
    }
  }


  checkTotal() {
    let total: number = 0;
    const common = this.feesCollectionForm.get('generalFees') as FormArray;
    common.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    });

    const bus = this.feesCollectionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    });

    const arrear = this.feesCollectionForm.get('arrearFees') as FormArray;
    arrear.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    });

    this.feesCollectionForm.get('total_amount')?.setValue(String(total));
  }


  async FeesDeduction() {
    await this.checkTotal();
    try {
      if (this.feesCollectionForm.valid) {
        const confirmDialog = await this.DialogSvc.openConfirmDialog('Are you sure want to Save?').afterClosed().toPromise();
        if (confirmDialog === true) {
          await this.getMaxId();
          const data = await this.feesCollSvc.checkBillNo(this.feesCollectionForm.value.bill_no).toPromise();
          if (data.length == 0) {
            const feesInsert = this.feesCollectionForm.value;
            const res = await this.feesCollSvc.studentFeesDeduction(feesInsert).toPromise();
            if (res.status === 'Insert Success') {
              this.notificationSvc.success("Saved Success");
              const admissionNo = this.feesCollectionForm.value.admission_no;
              const billNo = this.feesCollectionForm.value.bill_no;
              await this.getMaxId();
              await this.cancelclick();
              const data = await this.feesCollSvc.RecentFeesCollectionList(this.today, this.userID, this.roleName).toPromise();
              const billData = data.filter((e) => e.admission_no === admissionNo && e.bill_no === billNo);
              if (billData) {
                this.previewClick(billData[0]);
              }
            } else {
              this.notificationSvc.error("Something error");
            }
          } else {
            this.getMaxId();
            this.notificationSvc.error("Already have the bill number so I changed it - please save again");
          }
        }
      } else {
        this.feesCollectionForm.markAllAsTouched();
        this.notificationSvc.error("Fill in the mandatory fields");
      }
    } catch (error) {
      this.notificationSvc.error("Error occurred:", error);
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

  async cancelclick() {
    this.feesCollectionForm.reset();
    this.feesCollectionForm.get('date')?.setValue(this.today);
    this.feesCollectionForm.get('payment_type')?.setValue('cash');

    const control2 = <FormArray>this.feesCollectionForm.controls['busFeesList'];
    while (control2.length !== 0) {
      control2.removeAt(0)
    }

    const control3 = <FormArray>this.feesCollectionForm.controls['generalFees'];
    while (control3.length !== 0) {
      control3.removeAt(0)
    }

    const control4 = <FormArray>this.feesCollectionForm.controls['arrearFees'];
    while (control4.length !== 0) {
      control4.removeAt(0)
    }

    if (this.classSelect) {
      (this.classSelect.nativeElement as HTMLSelectElement).selectedIndex = 0;
    }
    this.dateInputRef.nativeElement.value = this.today;

    this.suggestions = [];
    this.getMaxId();
    this.refreshRecentFeesCollectionList(this.today);
  }

  async findName(value) {
    const studentDetails = await this.studProSvc.searchnameByclassid(value).toPromise();
    this.studentName = studentDetails;
    this.suggestions = studentDetails
  }

  suggest(value) {
    this.suggestions = this.studentName.filter(item =>
      item.student_name.toLowerCase().includes(value.toLowerCase())
    );
  }

  editClick(value) {
    this.eDSvc.openConfirmDialog(value)
      .afterClosed().subscribe(res => {
        if (res) {
          this.feesCollSvc.studentFeesEdit(res).subscribe(res => {
            if (res.status == 'Saved successfully') {
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
  }
}