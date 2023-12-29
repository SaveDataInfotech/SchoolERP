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
import { studentProfileService } from 'src/app/api-service/studentProfile.service';
import { ViewChild, ElementRef } from '@angular/core';
import { FeesConcessionService } from 'src/app/api-service/feesConcession.service';
import { concessionPreviewDialogService } from 'src/app/api-service/concessionPreview.service';


@Component({
  selector: 'app-fee-concession',
  templateUrl: './fee-concession.component.html',
  styleUrls: ['./fee-concession.component.scss']
})
export class FeeConcessionComponent implements OnInit {

  @ViewChild('csid') classSelect!: ElementRef;
  @ViewChild('dtv') dateInputRef!: ElementRef;

  ClassList: any = [];
  GroupList: any = [];
  SectionList: any = [];
  StudentList: any[] = [];
  BusFeesesList: any[] = [];
  activeBatchYear: any = [];
  newgetbatch: string;
  generalFeesList: any[] = [];
  arrearFeesList: any[] = [];
  studentName: any[] = [];
  suggestions: any[] = [];
  maxIDList: any[] = [];
  maxnumber: number;
  billno: string;

  FeesConcesseionList: any[] = [];
  ListgeneralConcessionbybillno: any[] = [];
  busConcessionbybillnoList: any[] = [];
  arrearConcessionbybillnoList: any[] = [];
  constructor(private ClassSvc: studentClassService,
    private GroupSvc: studentGroupService,
    private ScSvc: studentSectionService,
    private DialogSvc: DialogService,
    private notificationSvc: NotificationsService,
    private feesCollSvc: FeescollectionService,
    private spinner: NgxSpinnerService,
    private batchSvc: BatechYearService,
    private router: Router,
    private studProSvc: studentProfileService,
    private feesConSvc: FeesConcessionService,
    private cDSvc: concessionPreviewDialogService
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
    this.feesConcessionForm.get('date').setValue(this.today);
    /////////////
    this.refreshClassList();
    this.refreshGroupList();
    this.refreshSectionList();
    this.GetActiveBatchYear();
    this.getMaxId();
    this.refreshRecentConncessionList(this.today);
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
    const max = await this.feesConSvc.getMaxId().toPromise();
    this.maxIDList = max;
    this.maxnumber = this.maxIDList[this.maxIDList.length - 1].g_concessionid + 1;

    const maxnum: string = String(this.maxnumber).padStart(4, '0');
    this.billno = maxnum;
    this.feesConcessionForm.get('bill_no')?.setValue(maxnum);
  }

  refreshRecentConncessionList(today) {
    this.feesConSvc.RecentConcessionList(today).subscribe(data => {
      this.FeesConcesseionList = data;
    });
  }

  feesConcessionForm = new FormGroup({
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
    cuid: new FormControl(1),
    busFeesList: new FormArray([
    ]),
    generalFees: new FormArray([
    ]),
    arrearFees: new FormArray([
    ])
  });
  getCommonControls() {
    return (this.feesConcessionForm.get('generalFees') as FormArray).controls;
  }

  getBusControls() {
    return (this.feesConcessionForm.get('busFeesList') as FormArray).controls;
  }

  getArrearControls() {
    return (this.feesConcessionForm.get('arrearFees') as FormArray).controls;
  }

  async getStudent(value) {
    
    this.spinner.show();
    const studentDetails = await this.studProSvc.searchstudentDetails(value).toPromise();
    this.StudentList = studentDetails;
    
    if (this.StudentList.length != 0) {
      this.feesConcessionForm.get('classid')?.setValue(this.StudentList[0].classid);
      this.feesConcessionForm.get('groupid')?.setValue(this.StudentList[0].groupid);
      this.feesConcessionForm.get('sectionid')?.setValue(this.StudentList[0].sectionid);
      this.feesConcessionForm.get('student_name')?.setValue(this.StudentList[0].student_name);
      this.feesConcessionForm.get('father_name')?.setValue(this.StudentList[0].father_name);
      this.feesConcessionForm.get('batch_year')?.setValue(this.StudentList[0].batch_year);
      this.feesConcessionForm.get('admission_no')?.setValue(this.StudentList[0].admission_no);
      this.feesConcessionForm.get('cuid')?.setValue(1);

      const busFee = await this.feesCollSvc.getBusFeesList(value).toPromise();
      this.BusFeesesList = busFee;

      const control3 = <FormArray>this.feesConcessionForm.controls['busFeesList'];
      while (control3.length !== 0) {
        control3.removeAt(0)
      }

      if (control3.length == 0) {
        this.BusFeesesList.forEach(element => {
          if (element.balance != 0) {
            const control = <FormArray>this.feesConcessionForm.controls['busFeesList'];
            control.push(
              new FormGroup({
                selected: new FormControl(false),
                feesid: new FormControl(element.feesid),
                admission_no: new FormControl(this.feesConcessionForm.value.admission_no),
                classid: new FormControl(element.classid),
                groupid: new FormControl(element.groupid),
                sectionid: new FormControl(element.sectionid),
                gender: new FormControl(element.gender),
                date: new FormControl(this.feesConcessionForm.value.date),
                batch_year: new FormControl(element.batch_year),
                typeid: new FormControl(element.typeid),
                vehicle_name: new FormControl(element.vehicle_name),
                kmrange: new FormControl(element.kmrange),
                fees_lessid: new FormControl(element.fees_lessid),
                amount: new FormControl(element.amount),
                balance: new FormControl(element.balance),
                deduction_amount: new FormControl(''),
                bill_no: new FormControl(this.feesConcessionForm.value.bill_no),
                remarks: new FormControl(''),
                cuid: new FormControl(this.feesConcessionForm.value.cuid),
              })
            )
          }
        });
      }

      const generalFee = await this.feesCollSvc.getGeneralFeesList(value).toPromise();
      this.generalFeesList = generalFee;

      const control4 = <FormArray>this.feesConcessionForm.controls['generalFees'];
      while (control4.length !== 0) {
        control4.removeAt(0)
      }

      if (control4.length == 0) {
        this.generalFeesList.forEach(element => {
          if (element.balance != 0) {
            const control = <FormArray>this.feesConcessionForm.controls['generalFees'];
            control.push(
              new FormGroup({
                selected: new FormControl(false),
                feesid: new FormControl(element.feesid),
                admission_no: new FormControl(this.feesConcessionForm.value.admission_no),
                classid: new FormControl(element.classid),
                groupid: new FormControl(element.groupid),
                sectionid: new FormControl(element.sectionid),
                gender: new FormControl(element.gender),
                date: new FormControl(this.feesConcessionForm.value.date),
                batch_year: new FormControl(element.batch_year),
                typeid: new FormControl(element.typeid),
                type_name: new FormControl(element.type_name),
                fees_lessid: new FormControl(element.fees_lessid),
                amount: new FormControl(element.amount),
                balance: new FormControl(element.balance),
                deduction_amount: new FormControl(''),
                bill_no: new FormControl(this.feesConcessionForm.value.bill_no),
                remarks: new FormControl(''),
                cuid: new FormControl(this.feesConcessionForm.value.cuid),
              })
            )
          }
        });
      }

      
      const arrearFee = await this.feesCollSvc.getArrearFeesList(value).toPromise();
      this.arrearFeesList = arrearFee;

      const control5 = <FormArray>this.feesConcessionForm.controls['arrearFees'];
      while (control5.length !== 0) {
        control5.removeAt(0)
      }

      if (control5.length == 0) {
        
        this.arrearFeesList.forEach(element => {
          if (element.balance != 0) {
            
            const control = <FormArray>this.feesConcessionForm.controls['arrearFees'];
            control.push(
              new FormGroup({
                selected: new FormControl(false),
                arrear_feesid: new FormControl(element.arrear_feesid),
                admission_no: new FormControl(this.feesConcessionForm.value.admission_no),
                classid: new FormControl(element.classid),
                groupid: new FormControl(element.groupid),
                sectionid: new FormControl(element.sectionid),
                date: new FormControl(this.feesConcessionForm.value.date),
                batch_year: new FormControl(element.batch_year),
                type_name: new FormControl('Arrear Fees'),
                amount: new FormControl(element.amount),
                balance: new FormControl(element.balance),
                deduction_amount: new FormControl(''),
                bill_no: new FormControl(this.feesConcessionForm.value.bill_no),
                remarks: new FormControl(''),
                cuid: new FormControl(this.feesConcessionForm.value.cuid),
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
    const classidArray = this.feesConcessionForm.get('generalFees') as FormArray;
    if (value.target.checked) {
      const am = classidArray.at(i).get('balance').value;
      classidArray.at(i).get('deduction_amount').setValue(am);
    }
    else {
      classidArray.at(i).get('deduction_amount').setValue('0');
    }

    const bus = this.feesConcessionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    const common = this.feesConcessionForm.get('generalFees') as FormArray;
    common.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    const arrear = this.feesConcessionForm.get('arrearFees') as FormArray;
    arrear.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    this.feesConcessionForm.get('total_amount')?.setValue(String(total))
  }

  updateSelectAllCheckboxArraer(i, value) {
    
    let total: number = 0;

    const arrearArray = this.feesConcessionForm.get('arrearFees') as FormArray;
    if (value.target.checked) {
      const am = arrearArray.at(i).get('balance').value;
      arrearArray.at(i).get('deduction_amount').setValue(am);
    }
    else {
      arrearArray.at(i).get('deduction_amount').setValue('0');
    }

    const bus = this.feesConcessionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    const common = this.feesConcessionForm.get('generalFees') as FormArray;
    common.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    const arrear = this.feesConcessionForm.get('arrearFees') as FormArray;
    arrear.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    this.feesConcessionForm.get('total_amount')?.setValue(String(total))
  }


  updateSelectAllCheckboxByBus(i, value) {
    
    let total: number = 0;

    const busArray = this.feesConcessionForm.get('busFeesList') as FormArray;

    if (value.target.checked) {
      const am = busArray.at(i).get('balance').value;
      busArray.at(i).get('deduction_amount').setValue(am);
    }
    else {
      busArray.at(i).get('deduction_amount').setValue('0');
    }


    const bus = this.feesConcessionForm.get('busFeesList') as FormArray;
    bus.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    const common = this.feesConcessionForm.get('generalFees') as FormArray;
    common.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    const arrear = this.feesConcessionForm.get('arrearFees') as FormArray;
    arrear.controls.forEach((e) => {
      const num = Number(e.value.deduction_amount);
      total = total + num;
    })

    this.feesConcessionForm.get('total_amount')?.setValue(String(total))
  }

  bustotal(i, val) {
    if (!isNaN(Number(val))) {
      if (/^\d+$/.test(val)) {
        let total: number = 0;
        const busControl = this.feesConcessionForm.get('busFeesList') as FormArray;
        const busam = busControl.at(i).get('balance').value;
        if (Number(busam) < Number(val)) {
          this.notificationSvc.error('Invalid Payable Amount');
          const busControl1 = this.feesConcessionForm.get('busFeesList') as FormArray;
          busControl1.at(i).get('deduction_amount').setValue('0');
        }

        const bus = this.feesConcessionForm.get('busFeesList') as FormArray;
        bus.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        const common = this.feesConcessionForm.get('generalFees') as FormArray;
        common.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        const arrear = this.feesConcessionForm.get('arrearFees') as FormArray;
        arrear.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        this.feesConcessionForm.get('total_amount')?.setValue(String(total))

      } else {

        const busControl1 = this.feesConcessionForm.get('busFeesList') as FormArray;
        busControl1.at(i).get('deduction_amount').setValue('');
      }
    } else {
      this.notificationSvc.error('Entered value is not a number.');
      const busControl1 = this.feesConcessionForm.get('busFeesList') as FormArray;
      busControl1.at(i).get('deduction_amount').setValue('');
    }
  }

  commontotal(i, val) {
    debugger
    if (!isNaN(Number(val))) {
      if (/^\d+$/.test(val)) {
        let total: number = 0;
        const commonControl = this.feesConcessionForm.get('generalFees') as FormArray;
        const busam = commonControl.at(i).get('balance').value;
        if (Number(busam) < Number(val)) {
          this.notificationSvc.error('Invalid Payable Amount');
          const commonControl = this.feesConcessionForm.get('generalFees') as FormArray;
          commonControl.at(i).get('deduction_amount').setValue('0');
        }

        const common = this.feesConcessionForm.get('generalFees') as FormArray;
        common.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        })

        const bus = this.feesConcessionForm.get('busFeesList') as FormArray;
        bus.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        const arrear = this.feesConcessionForm.get('arrearFees') as FormArray;
        arrear.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        this.feesConcessionForm.get('total_amount')?.setValue(String(total))
      } else {

        const commonControl = this.feesConcessionForm.get('generalFees') as FormArray;
        commonControl.at(i).get('deduction_amount').setValue('');
      }
    } else {
      this.notificationSvc.error('Entered value is not a number.');
      const commonControl = this.feesConcessionForm.get('generalFees') as FormArray;
      commonControl.at(i).get('deduction_amount').setValue('');
    }
  }

  arreartotal(i, val) {
    if (!isNaN(Number(val))) {
      if (/^\d+$/.test(val)) {
        let total: number = 0;
        const arrearControl = this.feesConcessionForm.get('arrearFees') as FormArray;
        const aram = arrearControl.at(i).get('balance').value;
        if (Number(aram) < Number(val)) {
          this.notificationSvc.error('Invalid Payable Amount');
          const arrearControl = this.feesConcessionForm.get('arrearFees') as FormArray;
          arrearControl.at(i).get('deduction_amount').setValue('0');
        }

        const common = this.feesConcessionForm.get('generalFees') as FormArray;
        common.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        const bus = this.feesConcessionForm.get('busFeesList') as FormArray;
        bus.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        const arrear = this.feesConcessionForm.get('arrearFees') as FormArray;
        arrear.controls.forEach((e) => {
          const num = Number(e.value.deduction_amount);
          total = total + num;
        });

        this.feesConcessionForm.get('total_amount')?.setValue(String(total))

      } else {

        const arrearControl = this.feesConcessionForm.get('arrearFees') as FormArray;
        arrearControl.at(i).get('deduction_amount').setValue('');
      }
    } else {
      this.notificationSvc.error('Entered value is not a number.');
      const arrearControl = this.feesConcessionForm.get('arrearFees') as FormArray;
      arrearControl.at(i).get('deduction_amount').setValue('');
    }
  }


  async FeesDeduction() {
    
    await this.getMaxId();
    this.feesConSvc.RecentConcessionList(this.today).subscribe(data => {
      
      this.FeesConcesseionList = data;
      const CheckBillNo = this.FeesConcesseionList.filter((e) => { return e.bill_no == this.feesConcessionForm.value.bill_no });
      if (CheckBillNo.length == 0) {
        if (this.feesConcessionForm.valid) {
          var feesInsert = (this.feesConcessionForm.value);
          this.DialogSvc.openConfirmDialog('Are you sure want to Save?')
            .afterClosed().subscribe(res => {
              if (res == true) {
                console.log(feesInsert, 'eee')
                this.feesConSvc.studentFeesConcession(feesInsert).subscribe(res => {
                  if (res.status == 'Insert Success') {
                    this.notificationSvc.success("Saved Success");
                    this.getMaxId();
                    this.cancelclick();
                    this.refreshRecentConncessionList(this.today);
                  }
                  else {
                    this.getMaxId();
                    this.notificationSvc.error("Something error")
                  }
                });
              }
            });
        } else {
          this.feesConcessionForm.markAllAsTouched();
          this.getMaxId();
          this.notificationSvc.error("Fill in the mandatory fileds");
        }
      }
      else {
        this.getMaxId()
        this.notificationSvc.error("Already have the bill number so I changed it - please save again");
      }
    });
  }

  cancelclick(): void {

    this.feesConcessionForm.reset();
    this.feesConcessionForm.get('date')?.setValue(this.today);

    const control2 = <FormArray>this.feesConcessionForm.controls['busFeesList'];
    while (control2.length !== 0) {
      control2.removeAt(0)
    }

    const control3 = <FormArray>this.feesConcessionForm.controls['generalFees'];
    while (control3.length !== 0) {
      control3.removeAt(0)
    }

    const control4 = <FormArray>this.feesConcessionForm.controls['arrearFees'];
    while (control4.length !== 0) {
      control4.removeAt(0)
    }

    if (this.classSelect) {
      (this.classSelect.nativeElement as HTMLSelectElement).selectedIndex = 0;
    }
    this.dateInputRef.nativeElement.value = this.today;

    this.suggestions = [];
    this.refreshRecentConncessionList(this.today);
    this.getMaxId();
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


  async previewClick(value: any): Promise<void> {
    const generalFees = await this.feesConSvc.getgeneralConcessionbybillno(value.bill_no, value.admission_no).toPromise();
    this.ListgeneralConcessionbybillno = generalFees;
    

    const busFees = await this.feesConSvc.getbusConcessionbybillno(value.bill_no, value.admission_no).toPromise();
    
    this.busConcessionbybillnoList = busFees;

    const arrearFees = await this.feesConSvc.getArrearConcessionbybillno(value.bill_no, value.admission_no).toPromise();
    this.arrearConcessionbybillnoList = arrearFees;
    

    this.cDSvc.openConfirmDialog(this.ListgeneralConcessionbybillno, this.busConcessionbybillnoList, this.arrearConcessionbybillnoList, value)
      .afterClosed().subscribe(res => {
        if (res == true) {
        }
      });
  }
}