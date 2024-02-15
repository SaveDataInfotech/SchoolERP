import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { staffSalaryReportService } from 'src/app/api-service/staffSalaryReports.service';
import { staffTypeService } from 'src/app/api-service/staffType.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  StaffTypeList: any[] = [];
  StaffsalaryList: any[] = [];
  year: string;
  StaffsalaryBankList: any[] = [];
  StaffsalaryStaffTypeList: any[] = [];
  banktotal: number = 0;
  stafftotal: number = 0;
  months: any[] = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthName: string;
  constructor(private SttySvc: staffTypeService,
    private sSSvc: staffSalaryReportService) { }

  ngOnInit(): void {
    this.refreshstaffTypeList();
  }

  refreshstaffTypeList() {
    this.SttySvc.getstaffTypeList().subscribe(data => {
      this.StaffTypeList = data;
    });
  }

  staffsalaryreports = new FormGroup({
    staff_typeid: new FormControl(0),
    sal_month: new FormControl('')
  });


  async searchReport() {
    debugger;
    const id = this.staffsalaryreports.value.staff_typeid;
    const month = this.staffsalaryreports.value.sal_month;
    const monthNumber = month.split("-")[1];
    this.monthName = this.months[Number(monthNumber)]
    debugger;
    this.StaffsalaryList = await this.sSSvc.getstaffsalaryList(id, month).toPromise();
    this.year = this.StaffsalaryList[0].salary_month.slice(0, 4);

    this.StaffsalaryBankList = await this.sSSvc.getstaffsalaryBankList(id, month).toPromise();
    this.banktotal = this.StaffsalaryBankList.reduce((e, val) => e += Number(val.net_salary), 0);

    this.StaffsalaryStaffTypeList = await this.sSSvc.getstaffsalaryStaffTypeList(id, month).toPromise();
    this.stafftotal = this.StaffsalaryStaffTypeList.reduce((e, val) => e += Number(val.net_salary), 0)
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
