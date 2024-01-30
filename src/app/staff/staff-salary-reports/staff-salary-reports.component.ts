import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { staffSalaryReportService } from 'src/app/api-service/staffSalaryReports.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';

@Component({
  selector: 'app-staff-salary-reports',
  templateUrl: './staff-salary-reports.component.html',
  styleUrls: ['./staff-salary-reports.component.scss']
})
export class StaffSalaryReportsComponent implements OnInit {
  StaffTypeList: any[] = [];
  StaffTypesalaryList: any[] = [];
  year: string;
  constructor(private sSSvc: staffSalaryReportService,
    private SttySvc: staffTypeService,) { }

  ngOnInit(): void {

  }

  staffsalaryStafftypereports = new FormGroup({
    staff_typeid: new FormControl(0),
    sal_month: new FormControl('')
  });

  refreshstaffTypeList() {
    this.SttySvc.getstaffTypeList().subscribe(data => {
      this.StaffTypeList = data;
    });
  }

  async searchReport() {
    const type = this.staffsalaryStafftypereports.value.staff_typeid;
    const month = this.staffsalaryStafftypereports.value.sal_month;

    this.StaffTypesalaryList = await this.sSSvc.getstaffTypesalaryList(type, month).toPromise();
    this.year = month.slice(0, 4);
  }
}
