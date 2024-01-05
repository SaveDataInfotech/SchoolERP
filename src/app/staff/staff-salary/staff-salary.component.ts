import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { DialogService } from 'src/app/api-service/Dialog.service';
import { staffSalaryService } from 'src/app/api-service/staffSalary.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';

@Component({
  selector: 'app-staff-salary',
  templateUrl: './staff-salary.component.html',
  styleUrls: ['./staff-salary.component.scss']
})
export class StaffSalaryComponent implements OnInit {
  StaffTypeList: any[] = [];
  userID: number = Number(localStorage.getItem("userid"));

  constructor(
    private notificationSvc: NotificationsService,
    private DialogSvc: DialogService,
    private SttySvc: staffTypeService,
    private sttySalSvc: staffSalaryService,
    private router: Router
  ) { this.createForm(); }

  ngOnInit(): void {
    this.refreshstaffTypeList();
  }
  backButton() {
    this.router.navigateByUrl('/app/dashboard/dashboard');
  }
  refreshstaffTypeList() {
    this.SttySvc.getstaffTypeList().subscribe(data => {
      this.StaffTypeList = data;
    });
  }

  staffSalaryForm: FormGroup;
  createForm() {
    this.staffSalaryForm = new FormGroup({
      staff_typeid: new FormControl(null),
      sal_month: new FormControl(''),
      working_days: new FormControl(''),
      staffList: new FormArray([])
    })
  }

  getControls() {
    return (this.staffSalaryForm.get('staffList') as FormArray).controls;
  }

  async searchStaff() {
    if (this.staffSalaryForm.valid) {
      this.sttySalSvc.getstaffProfileListBySalary(this.staffSalaryForm.value.sal_month, this.staffSalaryForm.value.staff_typeid).subscribe(data => {
        const control = <FormArray>this.staffSalaryForm.controls['staffList'];
        while (control.length !== 0) {
          control.removeAt(0)
        }
        if (control.length == 0 && data.length) {
          data.forEach(element => {
            let salmonth = ''; salmonth = this.staffSalaryForm.value.sal_month;
            let staffTypeid; staffTypeid = this.staffSalaryForm.value.staff_typeid;
            let workDays = 0; workDays = Number(this.staffSalaryForm.value.working_days);
            let presentDays = 0; presentDays = Number(element.an) / 2
            let leave = 0; leave = Number(element.leave) + (element.l_an / 2);
            let absentDay = 0; absentDay = Number(workDays) - (presentDays + leave);
            let payableDay = 0; payableDay = leave + presentDays;
            let basicPay = 0; basicPay = Number(element.basic_pay);
            let dA = 0; dA = Number(element.da);
            let hRA = 0; hRA = Number(element.hra);
            let allowance = 0; allowance = Number(element.allowance);
            let totalSalary = 0; totalSalary = basicPay + dA + hRA + allowance;
            let grandTotal = 0; grandTotal = Math.round((totalSalary / workDays) * payableDay);
            let eMIAmount = 0; eMIAmount = Number(element.emi_amount);
            let dAmount = 0; dAmount = Number(element.emi_amount);
            let adsentAmount = 0; adsentAmount = Math.round(totalSalary - grandTotal);
            let ePf = 0;
            if (element.epf == 'Yes') {
              ePf = (basicPay * 12) / 100
            }
            else {
              ePf = 0
            }
            let deduction = 0; deduction = dAmount + adsentAmount + ePf;
            let netSalary = 0; netSalary = totalSalary - deduction;

            const control = <FormArray>this.staffSalaryForm.controls['staffList'];
            control.push(
              new FormGroup({
                salary_month: new FormControl(salmonth),
                staff_typeid: new FormControl(staffTypeid),
                staff_no: new FormControl(element.staff_no),
                staff_name: new FormControl(element.staff_name),
                work_days: new FormControl(String(workDays)),
                present_day: new FormControl(String(presentDays)),
                absent_day: new FormControl(String(absentDay)),
                leave: new FormControl(String(leave)),
                payable_days: new FormControl(String(payableDay)),
                basic_pay: new FormControl(String(basicPay)),
                da: new FormControl(String(dA)),
                hra: new FormControl(String(hRA)),
                allowance: new FormControl(String(allowance)),
                total_salary: new FormControl(String(totalSalary)),
                grand_total: new FormControl(String(grandTotal)),
                emi_amount: new FormControl(String(eMIAmount)),
                d_amount: new FormControl(String(dAmount)),
                absent_amount: new FormControl(String(adsentAmount)),
                isepf: new FormControl(element.epf),
                epf_amount: new FormControl(String(ePf)),
                deduction: new FormControl(String(deduction)),
                net_salary: new FormControl(String(netSalary)),
                cuid: new FormControl(this.userID)
              })
            )
          });
        }
      });
    }
    else {
      this.staffSalaryForm.markAllAsTouched();
    }
  }


  PNChange(i, eve) {
    if (eve.target.checked) {
      const busControl = this.staffSalaryForm.get('staffList') as FormArray;
      busControl.at(i).get('d_amount').setValue('0');
    } else {
      const busControl1 = this.staffSalaryForm.get('staffList') as FormArray;
      const am = busControl1.at(i).get('emi_amount').value;
      busControl1.at(i).get('d_amount').setValue(am);
    }

    this.payableDayChange(i);
  }

  payableDayChange(i) {
    const busControl3 = this.staffSalaryForm.get('staffList') as FormArray;
    const payableDays = busControl3.at(i).get('payable_days').value;
    const totalsalary = busControl3.at(i).get('total_salary').value;
    const workdays = busControl3.at(i).get('work_days').value;
    const divedam = (Number(totalsalary) / Number(workdays));
    const Grandtotal = Math.round(divedam * Number(payableDays));
    busControl3.at(i).get('grand_total').setValue(String(Grandtotal));
    const absentAmount = (Number(totalsalary) - Math.round(divedam * Number(payableDays)));
    busControl3.at(i).get('absent_amount').setValue(String(absentAmount));
    const dAmount = busControl3.at(i).get('d_amount').value;
    const Epf = busControl3.at(i).get('epf').value;
    const deduction = (Number(dAmount) + Number(absentAmount) + Number(Epf));
    busControl3.at(i).get('deduction').setValue(String(deduction));
    const netSalary = (Number(totalsalary) - Number(deduction));

    busControl3.at(i).get('net_salary').setValue(String(netSalary));
  }

  async save() {
    if (this.staffSalaryForm.valid) {
      this.DialogSvc.openConfirmDialog('Are you sure want to add this record ?')
        .afterClosed().subscribe(async res => {
          if (res == true) {
            const formvalue = (this.staffSalaryForm.value.staffList);
            const staffCheck = await this.sttySalSvc.staffCheck(this.staffSalaryForm.value.sal_month, this.staffSalaryForm.value.staff_typeid).toPromise();
            if (!staffCheck.length) {
              this.sttySalSvc.addNewstaffSalary(formvalue).subscribe(res => {
                if (res.status == 'Insert Success') {
                  this.notificationSvc.success('Saved Successfully');
                  this.canCelClick();
                }
              });
            }
            else {
              this.notificationSvc.warn('Salary for this Staff type and Month is already entered')
            }
          }
        });
    }
    else {
      this.staffSalaryForm.markAllAsTouched();
    }
  }


  canCelClick() {
    this.staffSalaryForm.reset();
    const control = <FormArray>this.staffSalaryForm.controls['staffList'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
  }
}