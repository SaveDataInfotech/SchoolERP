import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GRNEntryComponent } from './grn-entry/grn-entry.component';
import { PaymentEntryComponent } from './payment-entry/payment-entry.component';
import { ReportsComponent } from './reports/reports.component';
import { PurchaseEntryRoutes } from './purchase-entry.routes';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    GRNEntryComponent,
    PaymentEntryComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(PurchaseEntryRoutes),
  ]
})
export class PurchaseEntryModule { }
