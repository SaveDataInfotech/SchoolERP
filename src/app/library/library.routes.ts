import { Routes } from '@angular/router';
import { AddDataComponent } from './add-data/add-data.component';
import { BookPurchaseComponent } from './book-purchase/book-purchase.component';
import { NewstockInComponent } from './newstock-in/newstock-in.component';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { StaffEnrollmentComponent } from './staff-enrollment/staff-enrollment.component';
import { BookIssueComponent } from './book-issue/book-issue.component';
import { ReturnBooksComponent } from './return-books/return-books.component';
import { StocksComponent } from './stocks/stocks.component';
export const libraryRoutes: Routes = [

  {
    path: "add_data",
    component: AddDataComponent
  },
  {
    path: "book_purchase",
    component: BookPurchaseComponent
  },
  {
    path: "newstock_in",
    component: NewstockInComponent
  },
  {
    path: "student_enrollment",
    component: StudentEnrollmentComponent
  },
  {
    path: "staff_enrollment",
    component: StaffEnrollmentComponent
  },
  {
    path: "book_issue",
    component: BookIssueComponent
  },
  {
    path: "return_books",
    component: ReturnBooksComponent
  },
  {
    path: "stocks",
    component: StocksComponent
  }

];
