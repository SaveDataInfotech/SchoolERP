import { Routes } from '@angular/router';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { StaffAssignComponent } from './staff-assign/staff-assign.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';
import { StaffPermissionComponent } from './staff-permission/staff-permission.component';
import { StaffLoanComponent } from './staff-loan/staff-loan.component';
import { StaffSalaryComponent } from './staff-salary/staff-salary.component';
import { ReportsComponent } from './reports/reports.component';

export const staffRoutes: Routes = [

  {
    path: 'staff_profile',
    component: StaffProfileComponent,
  },
  {
    path: 'staff_assign',
    component: StaffAssignComponent,
  },
  {
    path:"staff_attendance",
    component:StaffAttendanceComponent,
  },
  {
    path:"staff_permission",
    component:StaffPermissionComponent,
  },
  {
    path:"staff_loan",
    component:StaffLoanComponent
  },
  {
    path:"staff_salary",
    component:StaffSalaryComponent
  },
  {
    path:"reports",
    component:ReportsComponent
  }

];
