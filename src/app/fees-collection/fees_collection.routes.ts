import { Routes } from '@angular/router';
import { StudentFeesComponent } from './student-fees/student-fees.component';
import { StudentHostelFeesComponent } from './student-hostel-fees/student-hostel-fees.component';
import { ReportsComponent } from './reports/reports.component';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { UniformBillingComponent } from './uniform-billing/uniform-billing.component';
import { TotalbalanceReportComponent } from './totalbalance-report/totalbalance-report.component';
import { FeesTransactionComponent } from './fees-transaction/fees-transaction.component';


export const feescollectionRoutes: Routes = [

  {
    path: 'student_fees',
    component: StudentFeesComponent,
  },
  {
    path: 'uniform_bill',
    component: UniformBillingComponent,
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
    path: "reports",
    component: ReportsComponent,
  },
  {
    path: "totalbalance_reports",
    component: TotalbalanceReportComponent,
  },
  {
    path: "fee_transaction",
    component: FeesTransactionComponent,
  }


];
