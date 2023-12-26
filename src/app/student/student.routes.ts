import { Routes } from '@angular/router';
import { StudentEnquiryComponent } from './student-enquiry/student-enquiry.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { StudentMarkEntryComponent } from './student-mark-entry/student-mark-entry.component';
import { StudentTcApplieComponent } from './student-tc-applie/student-tc-applie.component';
import { StudentPromoteComponent } from './student-promote/student-promote.component';
import { ReportsComponent } from './reports/reports.component';
import { EnquiryDashbordComponent } from './enquiry-dashbord/enquiry-dashbord.component';
import { MarkEntryGradeComponent } from './mark-entry-grade/mark-entry-grade.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { UpdateMarkRankComponent } from './update-mark-rank/update-mark-rank.component';
import { SmsPageComponent } from './sms-page/sms-page.component';
import { MarkEntryReportsComponent } from './mark-entry-reports/mark-entry-reports.component';

export const studentRoutes: Routes = [
  {
    path: 'student_enquiry',
    component: StudentEnquiryComponent,
  },
  {
    path: 'enquiry_dashboard',
    component: EnquiryDashbordComponent,
  },
  {
    path: 'student_profile',
    component: StudentProfileComponent,
  },
  {
    path: "student_update",
    component: StudentUpdateComponent,
  },
  {
    path: "student_attendance",
    component: StudentAttendanceComponent,
  },
  {
    path: "student_mark_entry",
    component: StudentMarkEntryComponent
  },
  {
    path: "update_mark_rank",
    component: UpdateMarkRankComponent
  },
  {
    path: "mark_entry_grade",
    component: MarkEntryGradeComponent
  },
  {
    path: "student_tc_applie",
    component: StudentTcApplieComponent
  },
  {
    path: "student_promote",
    component: StudentPromoteComponent,
  },
  {
    path: "sms",
    component: SmsPageComponent,
  },
  {
    path: "reports",
    component: ReportsComponent,
  },
  {
    path: "mark_entry_reports",
    component: MarkEntryReportsComponent,
  },
];
