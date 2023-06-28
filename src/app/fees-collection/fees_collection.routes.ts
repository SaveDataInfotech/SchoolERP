import { Routes } from '@angular/router';
import { StudentFeesComponent } from './student-fees/student-fees.component';
import { StudentHostelFeesComponent } from './student-hostel-fees/student-hostel-fees.component';
import { ReportsComponent } from './reports/reports.component';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';


export const feescollectionRoutes: Routes = [

  {
    path: 'student_fees',
    component: StudentFeesComponent,
  },
  {
    path: 'student_hostel_fees',
    component: StudentHostelFeesComponent,
  },
  {
    path: 'expense-entry',
    component: ExpenseEntryComponent,
  },
  {
    path:"reports",
    component:ReportsComponent,
  },
  

];
