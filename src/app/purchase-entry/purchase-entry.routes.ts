import { Routes } from '@angular/router';
import { GRNEntryComponent } from './grn-entry/grn-entry.component';
import { PaymentEntryComponent } from './payment-entry/payment-entry.component';
import { ReportsComponent } from './reports/reports.component';


export const PurchaseEntryRoutes: Routes = [

  {
    path: 'grn-entry',
    component: GRNEntryComponent,
  },
  {
    path: 'payment-entry',
    component: PaymentEntryComponent,
  },
  {
    path:"reports",
    component:ReportsComponent,
  },
  

];
