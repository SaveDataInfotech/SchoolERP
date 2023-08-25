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
    path:"subject_master",
    component:SubjectMasterComponent,
  },
  {
    path: 'subject_assign',
    component: SubjectAssignComponent,
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
