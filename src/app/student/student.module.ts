import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { studentRoutes } from './student.routes';
import { RouterModule } from '@angular/router';
import { StudentEnquiryComponent } from './student-enquiry/student-enquiry.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentAssignComponent } from './student-assign/student-assign.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { StudentMarkEntryComponent } from './student-mark-entry/student-mark-entry.component';
import { StudentTcApplieComponent } from './student-tc-applie/student-tc-applie.component';
import { StudentPromoteComponent } from './student-promote/student-promote.component';
import { ReportsComponent } from './reports/reports.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { EnquiryDashbordComponent } from './enquiry-dashbord/enquiry-dashbord.component';
import {MatChipsModule} from '@angular/material/chips';

import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgFor} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    StudentEnquiryComponent,
    StudentProfileComponent,
    StudentAssignComponent,
    StudentAttendanceComponent,
    StudentMarkEntryComponent,
    StudentTcApplieComponent,
    StudentPromoteComponent,
    ReportsComponent,
    EnquiryDashbordComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(studentRoutes),MatIconModule,MatCardModule,MatTooltipModule,FormsModule,ReactiveFormsModule,
    MatFormFieldModule,MatInputModule,MatTabsModule,MatChipsModule,NgFor,MatCheckboxModule,
    NgxDropzoneModule,MatProgressSpinnerModule
  ],
  providers:[DatePipe],
  bootstrap:[StudentEnquiryComponent]
})
export class StudentModule { }
