import { Routes } from '@angular/router';
import { StudentFeesComponent } from './student-fees/student-fees.component';
import { StudentHostelFeesComponent } from './student-hostel-fees/student-hostel-fees.component';
import { ReportsComponent } from './reports/reports.component';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { UniformBillingComponent } from './uniform-billing/uniform-billing.component';
import { TotalbalanceReportComponent } from './totalbalance-report/totalbalance-report.component';
import { FeesTransactionComponent } from './fees-transaction/fees-transaction.component';
import { DatewiseFeecollectionComponent } from './datewise-feecollection/datewise-feecollection.component';
import { FeeConcessionReportsComponent } from './fee-concession-reports/fee-concession-reports.component';
import { FeeConcessionComponent } from './fee-concession/fee-concession.component';


export const feescollectionRoutes: Routes = [

  {
    path: 'student_fees',
    component: StudentFeesComponent,
  },
  {
    path: "fee_transaction",
    component: FeesTransactionComponent,
  },
  {
    path: "reports",
    component: ReportsComponent,
  },
  {
    path: "day_wise_collection",
    component: DatewiseFeecollectionComponent,
  },
  {
    path: "totalbalance_reports",
    component: TotalbalanceReportComponent,
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
    path: 'fee_con_report',
    component: FeeConcessionReportsComponent,
  },
  {
    path: 'fee_concession',
    component: FeeConcessionComponent,
  }
];
