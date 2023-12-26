import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentRoutes } from './student.routes';
import { RouterModule } from '@angular/router';
import { StudentEnquiryComponent } from './student-enquiry/student-enquiry.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { StudentMarkEntryComponent } from './student-mark-entry/student-mark-entry.component';
import { StudentTcApplieComponent } from './student-tc-applie/student-tc-applie.component';
import { StudentPromoteComponent } from './student-promote/student-promote.component';
import { ReportsComponent } from './reports/reports.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { EnquiryDashbordComponent } from './enquiry-dashbord/enquiry-dashbord.component';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgFor } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MarkEntryGradeComponent } from './mark-entry-grade/mark-entry-grade.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { UpdateMarkRankComponent } from './update-mark-rank/update-mark-rank.component';
import { SmsPageComponent } from './sms-page/sms-page.component';
import { UpdateMarkEntryGradeComponent } from './update-mark-entry-grade/update-mark-entry-grade.component';
import { MarkEntryReportsComponent } from './mark-entry-reports/mark-entry-reports.component';
import { NgxPrintModule } from 'ngx-print';
import { MarkEntryGradeReportComponent } from './mark-entry-grade-report/mark-entry-grade-report.component';

@NgModule({
  declarations: [
    StudentEnquiryComponent,
    StudentProfileComponent,
    StudentAttendanceComponent,
    StudentMarkEntryComponent,
    StudentTcApplieComponent,
    StudentPromoteComponent,
    ReportsComponent,
    EnquiryDashbordComponent,
    MarkEntryGradeComponent,
    StudentUpdateComponent,
    UpdateMarkRankComponent,
    SmsPageComponent,
    UpdateMarkEntryGradeComponent,
    MarkEntryReportsComponent,
    MarkEntryGradeReportComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(studentRoutes), MatIconModule, MatCardModule, MatTooltipModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatTabsModule, MatChipsModule, NgFor, MatCheckboxModule,
    NgxDropzoneModule, MatProgressSpinnerModule, MatDatepickerModule, NgxPrintModule
  ],
  providers: [DatePipe],
  bootstrap: [StudentEnquiryComponent]
})
export class StudentModule { }
