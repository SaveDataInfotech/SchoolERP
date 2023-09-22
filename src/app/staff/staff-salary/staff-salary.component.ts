import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { staffProfileService } from 'src/app/api-service/staffProfile.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';

@Component({
  selector: 'app-staff-salary',
  templateUrl: './staff-salary.component.html',
  styleUrls: ['./staff-salary.component.scss']
})
export class StaffSalaryComponent implements OnInit {
  StaffTypeList: any[] = [];
  staffList: any[] = [];
  staffListAll: any[] = [];


  constructor(
    private staffSvc: staffProfileService,
    private SttySvc: staffTypeService,
  ) { this.createForm(); }

  ngOnInit(): void {
    this.refreshStaffList();
    this.refreshstaffTypeList();
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
    const control = <FormArray>this.staffSalaryForm.controls['staffList'];
    while (control.length !== 0) {
      control.removeAt(0)
    }
    const newStaffList = this.staffList.filter((e) => { return e.staff_type == this.staffSalaryForm.value.staff_type });
    console.log(newStaffList)

    newStaffList.forEach(element => {
      const control = <FormArray>this.staffSalaryForm.controls['staffList'];
      control.push(
        new FormGroup({
          staff_no: new FormControl(element.staff_no),
          staff_name: new FormControl(element.staff_name),
          work_days: new FormControl(this.staffSalaryForm.value.working_days),
          present_day: new FormControl(''),
          absent_day: new FormControl(''),
          leave: new FormControl(''),
          payable_days: new FormControl(''),
          basic_pay: new FormControl(element.basic_pay),
          da: new FormControl(element.da),
          hra: new FormControl(element.hra),
          allowance: new FormControl(element.allowance),
          total_salary: new FormControl(element.total_salary),
          emi_amount: new FormControl(element.emi_amount),
          d_amount: new FormControl(element.emi_amount),
          absent_amount: new FormControl(''),
          epf: new FormControl(''),
          deduction: new FormControl(''),
          net_salary: new FormControl('')
        })
      )
    });
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
  }

  save() {
    console.log(this.staffSalaryForm)
  }

}
