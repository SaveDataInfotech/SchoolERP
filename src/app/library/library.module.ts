import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDataComponent } from './add-data/add-data.component';
import { BookPurchaseComponent } from './book-purchase/book-purchase.component';
import { NewstockInComponent } from './newstock-in/newstock-in.component';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { StaffEnrollmentComponent } from './staff-enrollment/staff-enrollment.component';
import { BookIssueComponent } from './book-issue/book-issue.component';
import { ReturnBooksComponent } from './return-books/return-books.component';
import { StocksComponent } from './stocks/stocks.component';
import { RouterModule } from '@angular/router';
import { libraryRoutes } from './library.routes'
import { MaterialModule } from '../shared/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgFor } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [
    AddDataComponent,
    BookPurchaseComponent,
    NewstockInComponent,
    StudentEnrollmentComponent,
    StaffEnrollmentComponent,
    BookIssueComponent,
    ReturnBooksComponent,
    StocksComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(libraryRoutes), MaterialModule, MatTabsModule,
    MatIconModule, MatCardModule, MatTooltipModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatChipsModule, DatePipe, FormsModule, MatProgressSpinnerModule, NgFor, MatCheckboxModule, NgxDropzoneModule, MatDatepickerModule
  ]
})
export class LibraryModule { }
