import { Routes } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';


export const customerRoutes: Routes = [
  {
    path: 'create_customer',
    component: CreateCustomerComponent,
  },
  {
    path: 'customer_details',
    component: CustomerDetailsComponent
  },
  {
    path: 'customer_report',
    component: CustomerReportComponent
  }
 
];
