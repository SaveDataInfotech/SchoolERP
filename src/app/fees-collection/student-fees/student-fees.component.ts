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
  BusFeesesList: any[] = [];
  CommonFeesesList: any[] = [];
  total: number = 0;
  activeBatchYear: any = [];
  newgetbatch: string;
  constructor(private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private feesCollSvc: FeescollectionService,
    private spinner: NgxSpinnerService,
    private batchSvc: BatechYearService) { }

  ngOnInit(): void {
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.refreshStudentList();
    this.refreshAdmissionFeesList();
    this.refreshBusFeesList();
    this.refreshCommonFeesList();
    this.GetActiveBatchYear();
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

  refreshAdmissionFeesList() {
    this.feesCollSvc.getAdmissionFeesList().subscribe(data => {
      this.AdmissionFeesesList = data;
    });
  }

  refreshBusFeesList() {
    this.feesCollSvc.getBusFeesList().subscribe(data => {
      this.BusFeesesList = data;
    });
  }

  refreshCommonFeesList() {
    this.feesCollSvc.getCommonFeesList().subscribe(data => {
      this.CommonFeesesList = data;
    });
  }


  printbill() {
    print()
  }

  feesCollectionForm = new FormGroup({
    admission_no: new FormControl(''),
    classid: new FormControl(),
    groupid: new FormControl(),
    sectionid: new FormControl(),
    student_name: new FormControl(''),
    batch_year: new FormControl(''),
    date: new FormControl(''),
    total_amount: new FormControl(''),
    cuid: new FormControl(1),
    admissionFeesList: new FormArray([
    ]),
    busFeesList: new FormArray([
    ]),
    commonFeesList: new FormArray([
    ])
  });
  getFeesControls() {
    return (this.feesCollectionForm.get('admissionFeesList') as FormArray).controls;
  }
  getBusControls() {
    return (this.feesCollectionForm.get('busFeesList') as FormArray).controls;
  }
  getCommonControls() {
    return (this.feesCollectionForm.get('commonFeesList') as FormArray).controls;
  }

  getStudent(value) {
    debugger;
    const control1 = <FormArray>this.feesCollectionForm.controls['admissionFeesList'];
    while (control1.length !== 0) {
      control1.removeAt(0)
    }

    const control2 = <FormArray>this.feesCollectionForm.controls['busFeesList'];
    while (control2.length !== 0) {
      control2.removeAt(0)
    }

    const control3 = <FormArray>this.feesCollectionForm.controls['commonFeesList'];
    while (control3.length !== 0) {
      control3.removeAt(0)
    }



    //////////Student List
    const StudentFillterList = this.StudentList.filter((e) => { return e.admission_no == value })
    // this.feesCollectionForm.patchValue(StudentFillterList[0]);
    this.feesCollectionForm.get('classid')?.setValue(StudentFillterList[0].classid);
    this.feesCollectionForm.get('groupid')?.setValue(StudentFillterList[0].groupid);
    this.feesCollectionForm.get('sectionid')?.setValue(StudentFillterList[0].sectionid);
    this.feesCollectionForm.get('student_name')?.setValue(StudentFillterList[0].student_name);
    this.feesCollectionForm.get('batch_year')?.setValue(StudentFillterList[0].batch_year);
    this.feesCollectionForm.get('cuid')?.setValue(1);

    //////////Admission List
    const StudentAdmissionFeesFillterList = this.AdmissionFeesesList.filter((e) => { return e.admission_no == value })
    StudentAdmissionFeesFillterList.forEach(element => {
      const control = <FormArray>this.feesCollectionForm.controls['admissionFeesList'];
      control.push(
        new FormGroup({
          admissionfeesid: new FormControl(element.admissionfeesid),
          admission_no: new FormControl(this.feesCollectionForm.value.admission_no),
          classid: new FormControl(element.classid),
          groupid: new FormControl(element.groupid),
          sectionid: new FormControl(element.sectionid),
          gender: new FormControl(element.gender),
          date: new FormControl(this.feesCollectionForm.value.date),
          batch_year: new FormControl(element.batch_year),
          studentfeestype: new FormControl(element.studentfeestype),
          type_name: new FormControl(element.type_name),
          type_assign_name: new FormControl(element.type_assign_name),
          less_type: new FormControl(element.less_type),
          amount: new FormControl(element.amount),
          balance_amount: new FormControl(element.balance_amount),
          d_amount: new FormControl(''),
          cuid: new FormControl(this.feesCollectionForm.value.cuid),
        })
      )
    });


    //////Bus List
    const StudentBusFeesFillterList = this.BusFeesesList.filter((e) => { return e.admission_no == value })
    StudentBusFeesFillterList.forEach(element => {
      debugger;
      const control = <FormArray>this.feesCollectionForm.controls['busFeesList'];
      control.push(
        new FormGroup({
          busfeesid: new FormControl(element.busfeesid),
          admission_no: new FormControl(this.feesCollectionForm.value.admission_no),
          classid: new FormControl(element.classid),
          groupid: new FormControl(element.groupid),
          sectionid: new FormControl(element.sectionid),
          gender: new FormControl(element.gender),
          date: new FormControl(this.feesCollectionForm.value.date),
          batch_year: new FormControl(element.batch_year),
          studentfeestype: new FormControl(element.studentfeestype),
          type_name: new FormControl(element.type_name),
          type_assign_name: new FormControl(element.type_assign_name),
          less_type: new FormControl(element.less_type),
          amount: new FormControl(element.amount),
          balance_amount: new FormControl(element.balance_amount),
          d_amount: new FormControl(''),
          cuid: new FormControl(this.feesCollectionForm.value.cuid),
        })
      )
    });

    //////Common List
    const StudentCommonFeesFillterList = this.CommonFeesesList.filter((e) => { return e.admission_no == value })
    StudentCommonFeesFillterList.forEach(element => {
      debugger;
      const control = <FormArray>this.feesCollectionForm.controls['commonFeesList'];
      control.push(
        new FormGroup({
          commonfeesid: new FormControl(element.commonfeesid),
          admission_no: new FormControl(this.feesCollectionForm.value.admission_no),
          classid: new FormControl(element.classid),
          groupid: new FormControl(element.groupid),
          sectionid: new FormControl(element.sectionid),
          gender: new FormControl(element.gender),
          date: new FormControl(this.feesCollectionForm.value.date),
          batch_year: new FormControl(element.batch_year),
          studentfeestype: new FormControl(element.studentfeestype),
          type_name: new FormControl(element.type_name),
          type_assign_name: new FormControl(element.type_assign_name),
          less_type: new FormControl(element.less_type),
          amount: new FormControl(element.amount),
          balance_amount: new FormControl(element.balance_amount),
          d_amount: new FormControl(''),
          cuid: new FormControl(this.feesCollectionForm.value.cuid),
        })
      )
    });
  }



  adtotal(i, val) {
    debugger;
    let total: number = 0;
    const busControl = this.feesCollectionForm.get('admissionFeesList') as FormArray;
    const busam = busControl.at(i).get('balance_amount').value;
    if (Number(busam) < Number(val)) {
      this.notificationSvc.error('Invalid Payable Amount');
      const busControl1 = this.feesCollectionForm.get('admissionFeesList') as FormArray;
      busControl1.at(i).get('d_amount').setValue('0');
    }

    const admiss = this.feesCollectionForm.get('admissionFeesList') as FormArray;
    admiss.controls.forEach((e) => {
      debugger;
      const num = Number(e.value.d_amount);
      total = total + num;
    })

    const bus = this.feesCollectionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {
      debugger;
      const num = Number(e.value.d_amount);
      total = total + num;
    })

    const common = this.feesCollectionForm.get('commonFeesList') as FormArray;
    common.controls.forEach((e) => {
      debugger;
      const num = Number(e.value.d_amount);
      total = total + num;
    })

    this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  }

  bustotal(i, val) {
    debugger;
    let total: number = 0;
    const busControl = this.feesCollectionForm.get('busFeesList') as FormArray;
    const busam = busControl.at(i).get('balance_amount').value;
    if (Number(busam) < Number(val)) {
      this.notificationSvc.error('Invalid Payable Amount');
      const busControl1 = this.feesCollectionForm.get('busFeesList') as FormArray;
      busControl1.at(i).get('d_amount').setValue('0');
    }

    const bus = this.feesCollectionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {
      debugger;
      const num = Number(e.value.d_amount);
      total = total + num;
    })
    const admiss = this.feesCollectionForm.get('admissionFeesList') as FormArray;
    admiss.controls.forEach((e) => {
      debugger;
      const num = Number(e.value.d_amount);
      total = total + num;
    })

    const common = this.feesCollectionForm.get('commonFeesList') as FormArray;
    common.controls.forEach((e) => {
      debugger;
      const num = Number(e.value.d_amount);
      total = total + num;
    })

    this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  }

  commontotal(i, val) {
    debugger;
    let total: number = 0;
    const busControl = this.feesCollectionForm.get('commonFeesList') as FormArray;
    const busam = busControl.at(i).get('balance_amount').value;
    if (Number(busam) < Number(val)) {
      this.notificationSvc.error('Invalid Payable Amount');
      const busControl1 = this.feesCollectionForm.get('commonFeesList') as FormArray;
      busControl1.at(i).get('d_amount').setValue('0');
    }

    const common = this.feesCollectionForm.get('commonFeesList') as FormArray;
    common.controls.forEach((e) => {
      debugger;
      const num = Number(e.value.d_amount);
      total = total + num;
    })

    const bus = this.feesCollectionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {
      debugger;
      const num = Number(e.value.d_amount);
      total = total + num;
    })
    const admiss = this.feesCollectionForm.get('admissionFeesList') as FormArray;
    admiss.controls.forEach((e) => {
      debugger;
      const num = Number(e.value.d_amount);
      total = total + num;
    })
    this.feesCollectionForm.get('total_amount')?.setValue(String(total))
  }


  FeesDeduction() {
    debugger;
    console.log(this.feesCollectionForm.value)
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

  cancelclick() {
    //this.refreshStudentList();
    this.refreshAdmissionFeesList();
    this.refreshBusFeesList();
    this.refreshCommonFeesList();
    this.feesCollectionForm.reset();
    this.feesCollectionForm.get('date')?.setValue('');
    const control1 = <FormArray>this.feesCollectionForm.controls['admissionFeesList'];
    while (control1.length !== 0) {
      control1.removeAt(0)
    }

    const control2 = <FormArray>this.feesCollectionForm.controls['busFeesList'];
    while (control2.length !== 0) {
      control2.removeAt(0)
    }

    const control3 = <FormArray>this.feesCollectionForm.controls['commonFeesList'];
    while (control3.length !== 0) {
      control3.removeAt(0)
    }
  }

}
