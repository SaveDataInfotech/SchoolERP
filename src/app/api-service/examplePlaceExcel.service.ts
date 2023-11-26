import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExcelPlaceService {
  constructor() {}

  async generateExcel() {
    // Excel Title, Header, Data

    const header = ['root_no', 'places'];
    const data = [
      [1, 'A'],
      [1, 'B'],
      [1, 'C'],
      [1, 'D'],
      [2, 'A'],
      [2, 'C'],
      [2, 'G'],
      [2, 'F'],
      [2, 'T'],
      [3, 'Z'],
      [3, 'Y'],
      [3, 'X'],
    ];

    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sharing Data');

    // Add Row and formatting

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Add Data and Conditional Formatting
    data.forEach((d) => {
      const row = worksheet.addRow(d);
    });

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'SaveData_Places.xlsx');
    });
  }
}
