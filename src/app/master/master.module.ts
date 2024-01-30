import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './class/class.component';
import { masterRoutes } from './master.routes';
import { RouterModule } from '@angular/router';
import { BatchYearComponent } from './batch-year/batch-year.component';
import { SubjectMasterComponent } from './subject-master/subject-master.component';
import { UniformMasterComponent } from './uniform-master/uniform-master.component';
import { StaffTypeComponent } from './staff-type/staff-type.component';
import { LeaveMasterComponent } from './leave-master/leave-master.component';
import { HostelMasterComponent } from './hostel-master/hostel-master.component';
import { VehicleMasterComponent } from './vehicle-master/vehicle-master.component';
import { SupplierMasterComponent } from './supplier-master/supplier-master.component';
import { ReportsComponent } from './reports/reports.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ResonDialogComponent } from './reson-dialog/reson-dialog.component';
import { RoleComponent } from './role/role.component';
import { SubjectAssignComponent } from './subject-assign/subject-assign.component';
import { GeneralFeesComponent } from './general-fees/general-fees.component';
import { SpecialFeesComponent } from './special-fees/special-fees.component';
import { BusFeesComponent } from './bus-fees/bus-fees.component';
import { SpecialBusFeesComponent } from './special-bus-fees/special-bus-fees.component';
import { StaffCategoryComponent } from './staff-category/staff-category.component';
import { PreviewFeesDialogComponentComponent } from './preview-fees-dialog-component/preview-fees-dialog-component.component';
import { NgxPrintModule } from 'ngx-print';
import { SchoolfeeEditComponent } from './schoolfee-edit/schoolfee-edit.component';
import { ConcessionPreviewComponent } from './concession-preview/concession-preview.component';
import { CalendarDialogComponent } from './calendar-dialog/calendar-dialog.component';
import { CalendarEventAssignComponent } from './calendar-event-assign/calendar-event-assign.component';
import { StaffLoginMenusComponent } from './staff-login-menus/staff-login-menus.component';


@NgModule({
  declarations: [
    ClassComponent,
    BatchYearComponent,
    SubjectMasterComponent,
    UniformMasterComponent,
    StaffTypeComponent,
    LeaveMasterComponent,
    HostelMasterComponent,
    VehicleMasterComponent,
    SupplierMasterComponent,
    ReportsComponent,
    ConfirmDialogComponent,
    ResonDialogComponent,
    RoleComponent,
    SubjectAssignComponent,
    GeneralFeesComponent,
    SpecialFeesComponent,
    BusFeesComponent,
    SpecialBusFeesComponent,
    StaffCategoryComponent,
    PreviewFeesDialogComponentComponent,
    SchoolfeeEditComponent,
    ConcessionPreviewComponent,
    CalendarDialogComponent,
    CalendarEventAssignComponent,
    StaffLoginMenusComponent,
  ],
  imports: [
    CommonModule,MatTabsModule,MatTableModule,MatTableModule, MatPaginatorModule,MatIconModule,MatTooltipModule,
    RouterModule.forChild(masterRoutes),FormsModule,HttpClientModule,MatCardModule,ReactiveFormsModule,HttpClientTestingModule,
  MatDialogModule,MatButtonModule,NgxPrintModule

  ]
})
export class MasterModule { }
