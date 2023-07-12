import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule, pageComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerModule } from './customer/customer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MaterialModule } from './shared/material.module';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [AppComponent, ...pageComponents,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    DashboardModule, 
    MatSlideToggleModule,
    FormsModule ,
    AdminModule,
    MatTableModule,
    CustomerModule,
    NgxDropzoneModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CommonModule,
    MatMenuModule,
    MatChipsModule,
    HttpClientModule
    
  ],
  exports: [NgxDropzoneModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
