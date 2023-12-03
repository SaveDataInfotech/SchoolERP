import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFeesComponent } from './student-fees/student-fees.component';
import { StudentHostelFeesComponent } from './student-hostel-fees/student-hostel-fees.component';
import { ReportsComponent } from './reports/reports.component';
import { feescollectionRoutes } from './fees_collection.routes';
import { RouterModule } from '@angular/router';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { DatePipe } from '@angular/common';
import { UniformBillingComponent } from './uniform-billing/uniform-billing.component';
import { NgxPrintModule } from 'ngx-print';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TotalbalanceReportComponent } from './totalbalance-report/totalbalance-report.component';
@NgModule({
  declarations: [
    StudentFeesComponent,
    StudentHostelFeesComponent,
    ReportsComponent,
    ExpenseEntryComponent,
    UniformBillingComponent,
    TotalbalanceReportComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(feescollectionRoutes),MatIconModule,MatCardModule,MatTooltipModule,FormsModule, ReactiveFormsModule,
    MatFormFieldModule,MatInputModule,MatTabsModule,NgxDropzoneModule,NgxPrintModule,MatAutocompleteModule,
    MatSelectModule
  ],
  providers:[DatePipe]
})
export class FeesCollectionModule { }
