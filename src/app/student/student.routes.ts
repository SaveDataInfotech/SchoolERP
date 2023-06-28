import { Routes } from '@angular/router';
import { StudentEnquiryComponent } from './student-enquiry/student-enquiry.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentAssignComponent } from './student-assign/student-assign.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { StudentMarkEntryComponent } from './student-mark-entry/student-mark-entry.component';
import { StudentTcApplieComponent } from './student-tc-applie/student-tc-applie.component';
import { StudentPromoteComponent } from './student-promote/student-promote.component';
import { ReportsComponent } from './reports/reports.component';

export const studentRoutes: Routes = [
  {
    path: 'student_enquiry',
    component: StudentEnquiryComponent,
  },
  {
    path: 'student_profile',
    component: StudentProfileComponent,
  },
  {
    path:"student_assign",
    component:StudentAssignComponent,
  },
  {
    path:"student_attendance",
    component:StudentAttendanceComponent,
  },
  {
    path:"student_mark_entry",
    component:StudentMarkEntryComponent
  },
  {
    path:"student_tc_applie",
    component:StudentTcApplieComponent
  },
  {
    path:"student_promote",
    component:StudentPromoteComponent,
  },
  {
    path:"reports",
    component:ReportsComponent,
  },

];
