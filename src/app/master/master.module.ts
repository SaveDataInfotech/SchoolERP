import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './class/class.component';
import { masterRoutes } from './master.routes';
import { RouterModule } from '@angular/router';
import { BatchYearComponent } from './batch-year/batch-year.component';
import { FeesMasterComponent } from './fees-master/fees-master.component';
import { SubjectMasterComponent } from './subject-master/subject-master.component';
import { UniformMasterComponent } from './uniform-master/uniform-master.component';
import { StaffTypeComponent } from './staff-type/staff-type.component';
import { LeaveMasterComponent } from './leave-master/leave-master.component';
import { HostelMasterComponent } from './hostel-master/hostel-master.component';
import { VehicleMasterComponent } from './vehicle-master/vehicle-master.component';
import { SupplierMasterComponent } from './supplier-master/supplier-master.component';
import { ReportsComponent } from './reports/reports.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {  ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ResonDialogComponent } from './reson-dialog/reson-dialog.component';



@NgModule({
  declarations: [
    ClassComponent,
    BatchYearComponent,
    FeesMasterComponent,
    SubjectMasterComponent,
    UniformMasterComponent,
    StaffTypeComponent,
    LeaveMasterComponent,
    HostelMasterComponent,
    VehicleMasterComponent,
    SupplierMasterComponent,
    ReportsComponent,
    ConfirmDialogComponent,
    ResonDialogComponent
  ],
  imports: [
    CommonModule,MatTabsModule,MatTableModule,MatTableModule, MatPaginatorModule,MatIconModule,MatTooltipModule,
    RouterModule.forChild(masterRoutes),FormsModule,HttpClientModule,MatCardModule,ReactiveFormsModule,HttpClientTestingModule,
  MatDialogModule,MatButtonModule

  ]
})
export class MasterModule { }
