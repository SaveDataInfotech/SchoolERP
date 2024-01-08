import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScheduleRoutes } from './schedule.routes';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgFor} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,RouterModule.forChild(ScheduleRoutes),ReactiveFormsModule,
    CommonModule,MatIconModule,MatCardModule,MatTooltipModule,FormsModule,ReactiveFormsModule,
    MatFormFieldModule,MatInputModule,MatTabsModule,MatChipsModule,NgFor,MatCheckboxModule,
    NgxDropzoneModule,MatProgressSpinnerModule,MatDatepickerModule,
    FullCalendarModule
  ]
})
export class ScheduleModule { }
