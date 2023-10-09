import { Routes } from '@angular/router';
import { ClassComponent } from './class/class.component';
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
import { RoleComponent } from './role/role.component';
import { SubjectAssignComponent } from './subject-assign/subject-assign.component';
import { LibraryBookMasterComponent } from './library-book-master/library-book-master.component';
import { GeneralFeesComponent } from './general-fees/general-fees.component';
import { SpecialFeesComponent } from './special-fees/special-fees.component';
import { BusFeesComponent } from './bus-fees/bus-fees.component';
import { SpecialBusFeesComponent } from './special-bus-fees/special-bus-fees.component';


export const masterRoutes: Routes = [
  {
    path: 'class',
    component: ClassComponent,
  },
  {
    path: 'batch_year',
    component: BatchYearComponent,
  },
  {
    path:"fees_master",
    component:FeesMasterComponent,
  },
  {
    path:"general_fees",
    component:GeneralFeesComponent,
  },
  {
    path:"special_fees",
    component:SpecialFeesComponent,
  },
  {
    path:"bus_fees",
    component:BusFeesComponent,
  },
  {
    path:"special_bus_fees",
    component:SpecialBusFeesComponent,
  },
  {
    path:"subject_master",
    component:SubjectMasterComponent,
  },
  {
    path: 'subject_assign',
    component: SubjectAssignComponent,
  },
  {
    path: 'library_book_master',
    component: LibraryBookMasterComponent,
  },
  {
    path:"uniform_master",
    component:UniformMasterComponent
  },
  {
    path:"staff_type",
    component:StaffTypeComponent
  },
  {
    path:"leave_master",
    component:LeaveMasterComponent,
  },
  {
    path:"hostel_master",
    component:HostelMasterComponent,
  },
  {
    path:"vehicle_master",
    component:VehicleMasterComponent,
  },
  {
    path:"supplier_master",
    component:SupplierMasterComponent
  },
  {
    path:"role",
    component:RoleComponent
  },
  {
    path:"reports",
    component:ReportsComponent
  }

];
