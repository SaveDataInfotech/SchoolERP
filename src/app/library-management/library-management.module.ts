import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDataComponent } from './add-data/add-data.component';
import { RouterModule } from '@angular/router';
import { libraryRoutes } from './library-management.routes';
import { MaterialModule } from '../shared/material.module';
import { BookPurchaseComponent } from './book-purchase/book-purchase.component';
import { NewstockInComponent } from './newstock-in/newstock-in.component';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { StaffEnrollmentComponent } from './staff-enrollment/staff-enrollment.component';
import { BookIssueComponent } from './book-issue/book-issue.component';
import { ReturnBooksComponent } from './return-books/return-books.component';
import { StockComponent } from './stock/stock.component';




@NgModule({
  declarations: [
    AddDataComponent,
    BookPurchaseComponent,
    NewstockInComponent,
    StudentEnrollmentComponent,
    StaffEnrollmentComponent,
    BookIssueComponent,
    ReturnBooksComponent,
    StockComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(libraryRoutes),MaterialModule
    
  ]
})
export class LibraryManagementModule { }
