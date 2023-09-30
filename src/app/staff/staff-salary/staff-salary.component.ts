import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { staffSalaryService } from 'src/app/api-service/staffSalary.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';

@Component({
  selector: 'app-staff-salary',
  templateUrl: './staff-salary.component.html',
  styleUrls: ['./staff-salary.component.scss']
})
export class StaffSalaryComponent implements OnInit {
  StaffTypeList: any[] = [];
  staffList: any[] = [];
  staffListSalaryAll: any[] = [];


  constructor(
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
      staff_type: new FormControl(''),
      sal_month: new FormControl(''),
      working_days: new FormControl(''),
      staffList: new FormArray([

      ]),
      cuid: new FormControl(1),
    })
  }

  getControls() {
    return (this.staffSalaryForm.get('staffList') as FormArray).controls;
  }

  searchStaff() {
    debugger;
    if (this.staffSalaryForm.valid) {

      this.sttySalSvc.getstaffProfileListBySalary(this.staffSalaryForm.value.sal_month).subscribe(data => {
        this.staffListSalaryAll = data;
        this.staffList = this.staffListSalaryAll.filter((e) => { return e.activestatus == 1 })

        const control = <FormArray>this.staffSalaryForm.controls['staffList'];
        while (control.length !== 0) {
          control.removeAt(0)
        }
        const newStaffList = this.staffList.filter((e) => { return e.staff_type == this.staffSalaryForm.value.staff_type });
        newStaffList.forEach(element => {
          const control = <FormArray>this.staffSalaryForm.controls['staffList'];
          control.push(
            new FormGroup({
              staff_no: new FormControl(element.staff_no),
              staff_name: new FormControl(element.staff_name),
              work_days: new FormControl(this.staffSalaryForm.value.working_days),
              present_day: new FormControl((element.an) / 2),
              absent_day: new FormControl(String(Number(this.staffSalaryForm.value.working_days) - (Number(element.leave) + Number((element.an) / 2) + (element.l_an / 2)))),
              leave: new FormControl(String(Number(element.leave) + (element.l_an / 2))),
              payable_days: new FormControl(''),
              basic_pay: new FormControl(element.basic_pay),
              da: new FormControl(element.da),
              hra: new FormControl(element.hra),
              allowance: new FormControl(element.allowance),
              total_salary: new FormControl(element.total_salary),
              grand_total: new FormControl(''),
              emi_amount: new FormControl(element.emi_amount),
              d_amount: new FormControl(element.emi_amount),
              absent_amount: new FormControl(''),
              isepf: new FormControl(element.epf),
              epf: new FormControl(String(Number(element.basic_pay) * 12 / 100)),
              deduction: new FormControl(''),
              net_salary: new FormControl('')
            })
          )
        });
      });

    }
    else {
      this.staffSalaryForm.markAllAsTouched();
    }
  }


  PNChange(i, value) {
    if (value.target.checked) {
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
    const Grandtotal = String(divedam * Number(payableDays));
    busControl3.at(i).get('grand_total').setValue(Grandtotal);
    const absentAmount = String(Number(totalsalary) - divedam * Number(payableDays));
    busControl3.at(i).get('absent_amount').setValue(absentAmount);
    const dAmount = busControl3.at(i).get('d_amount').value;
    const Epf = busControl3.at(i).get('epf').value;
    // busControl3.at(i).get('basic_pay').setValue(Epf);
    const deduction = String(Number(dAmount) + Number(absentAmount) + Number(Epf));
    busControl3.at(i).get('deduction').setValue(deduction);
    const netSalary = String(Number(totalsalary) - Number(deduction));

    busControl3.at(i).get('net_salary').setValue(netSalary);
  }

  save() {
    console.log(this.staffSalaryForm)
  }

}
