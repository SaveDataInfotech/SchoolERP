import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { staffSalaryReportService } from 'src/app/api-service/staffSalaryReports.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-staff-salary-reports',
  templateUrl: './staff-salary-reports.component.html',
  styleUrls: ['./staff-salary-reports.component.scss']
})
export class StaffSalaryReportsComponent implements OnInit {
  StaffTypeList: any[] = [];
  StaffTypesalaryList: any[] = [];
  year: string;
  months: any[] = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthName: string;

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
    const monthNumber = month.split("-")[1];
    this.monthName = this.months[Number(monthNumber)];
    this.StaffTypesalaryList = await this.sSSvc.getstaffTypesalaryList(type, month).toPromise();
    this.year = month.slice(0, 4);
  }

  exportDayWiseExcel(): void {
    const element = document.getElementById('Payoutsalary');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const fileName = 'Payoutsalary.xlsx';

    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
  }
}
