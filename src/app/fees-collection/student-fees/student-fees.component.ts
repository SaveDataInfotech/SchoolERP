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
  AdmissionFeesesList: any[] = [];
  FeesCollectionList: any[] = [];
  BusFeesesList: any[] = [];
  total: number = 0;
  activeBatchYear: any = [];
  newgetbatch: string;

  generalFeesList: any[] = [];
  constructor(private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private feesCollSvc: FeescollectionService,
    private spinner: NgxSpinnerService,
    private batchSvc: BatechYearService,
    private router: Router) { }


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
    this.refreshStudentList();
    this.GetActiveBatchYear();
    //this.refreshRecentFeesCollectionList(this.today);
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

  refreshStudentList() {
    this.spinner.show();
    this.feesCollSvc.getStudentList().subscribe(data => {
      this.StudentList = data;
      this.spinner.hide();
    });
  }

  // refreshRecentFeesCollectionList(today) {
  //   this.feesCollSvc.RecentFeesCollectionList(today).subscribe(data => {
  //     this.FeesCollectionList = data;
  //   });
  // }

  printbill() {
    print()
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

  getStudent(value) {
    debugger;
    const StudentFillterList = this.StudentList.filter((e) => { return e.admission_no == value });
    if (StudentFillterList.length != 0) {
      this.feesCollectionForm.get('classid')?.setValue(StudentFillterList[0].classid);
      this.feesCollectionForm.get('groupid')?.setValue(StudentFillterList[0].groupid);
      this.feesCollectionForm.get('sectionid')?.setValue(StudentFillterList[0].sectionid);
      this.feesCollectionForm.get('student_name')?.setValue(StudentFillterList[0].student_name);
      this.feesCollectionForm.get('batch_year')?.setValue(StudentFillterList[0].batch_year);
      this.feesCollectionForm.get('cuid')?.setValue(1);

      this.feesCollSvc.getBusFeesList(value).subscribe(data => {
        debugger;
        this.BusFeesesList = data;
        const control3 = <FormArray>this.feesCollectionForm.controls['busFeesList'];
        while (control3.length !== 0) {
          control3.removeAt(0)
        }

        if (control3.length == 0) {
          this.BusFeesesList.forEach(element => {
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
                cuid: new FormControl(this.feesCollectionForm.value.cuid),
              })
            )
          });
        }
      });

      this.feesCollSvc.getGeneralFeesList(value).subscribe(data => {
        debugger;
        this.generalFeesList = data;
        const control3 = <FormArray>this.feesCollectionForm.controls['generalFees'];
        while (control3.length !== 0) {
          control3.removeAt(0)
        }

        if (control3.length == 0) {
          this.generalFeesList.forEach(element => {
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
                cuid: new FormControl(this.feesCollectionForm.value.cuid),
              })
            )
          });
        }
      });
    }
    else {
      this.notificationSvc.error('Invalid Admission Number')
    }

  }
  // adtotal(i, val) {

  //   let total: number = 0;

  //   const bus = this.feesCollectionForm.get('busFeesList') as FormArray;
  //   bus.controls.forEach((e) => {

  //     const num = Number(e.value.deduction_amount);
  //     total = total + num;
  //   })

  //   const common = this.feesCollectionForm.get('generalFees') as FormArray;
  //   common.controls.forEach((e) => {

  //     const num = Number(e.value.deduction_amount);
  //     total = total + num;
  //   })

  //   this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  // }


  updateSelectAllCheckbox() {
    debugger;
    const classidArray = this.feesCollectionForm.get('generalFees') as FormArray;
    const selectAll = classidArray.controls.every((control) => control.get('selected').value === true);
    this.feesCollectionForm.get('select_all').setValue(selectAll);
  }

  toggleAllCheckboxes() {
    debugger;
    const selectAllValue = this.feesCollectionForm.get('select_all').value;
    const classidArray = this.feesCollectionForm.get('generalFees') as FormArray;
    for (let i = 0; i < classidArray.length; i++) {
      classidArray.at(i).get('selected').setValue(selectAllValue);
    }
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


  FeesDeduction() {
    debugger;
    if (this.feesCollectionForm.valid) {
      var feesInsert = (this.feesCollectionForm.value);
      this.feesCollSvc.studentFeesDeduction(feesInsert).subscribe(res => {
        if (res.status == 'Insert Success') {
          this.notificationSvc.success("Saved Success");
          this.cancelclick();
        }
        else {
          this.notificationSvc.error("Something error")
        }
      });
    }
    else {
      this.feesCollectionForm.markAllAsTouched();
      this.notificationSvc.error("Fill in the mandatory fileds");
    }
  }

  cancelclick() {
    this.refreshStudentList();
    this.feesCollectionForm.reset();
    this.feesCollectionForm.get('date')?.setValue(this.today);

    const control2 = <FormArray>this.feesCollectionForm.controls['busFeesList'];
    while (control2.length !== 0) {
      control2.removeAt(0)
    }

    const control3 = <FormArray>this.feesCollectionForm.controls['generalFees'];
    while (control3.length !== 0) {
      control3.removeAt(0)
    }
  }

}
