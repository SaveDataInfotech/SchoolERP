import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { RouterModule } from '@angular/router';
import { customerRoutes } from './customer.router';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';



@NgModule({
  declarations: [CreateCustomerComponent, CustomerDetailsComponent, CustomerReportComponent],
  imports: [
    RouterModule.forChild(customerRoutes),
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ],
  exports: [RouterModule],
})
export class CustomerModule { }
