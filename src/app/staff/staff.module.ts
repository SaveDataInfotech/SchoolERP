import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { StaffAssignComponent } from './staff-assign/staff-assign.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { StaffPermissionComponent } from './staff-permission/staff-permission.component';
import { StaffLoanComponent } from './staff-loan/staff-loan.component';
import { StaffSalaryComponent } from './staff-salary/staff-salary.component';
import { staffRoutes } from './staff.routes';
import { RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    StaffProfileComponent,
    StaffAssignComponent,
    StaffAttendanceComponent,
    StaffPermissionComponent,
    StaffLoanComponent,
    StaffSalaryComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(staffRoutes),MatIconModule,MatCardModule,MatTooltipModule,FormsModule, ReactiveFormsModule,
    MatFormFieldModule,MatInputModule,MatTabsModule,NgxDropzoneModule
  ]
})
export class StaffModule { }
