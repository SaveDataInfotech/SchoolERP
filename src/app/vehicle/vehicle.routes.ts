import { Routes } from '@angular/router';
import { VehicleDeatilsComponent } from './vehicle-deatils/vehicle-deatils.component';
import { VehicleAssignComponent } from './vehicle-assign/vehicle-assign.component';
import { VehicleAttendanceComponent } from './vehicle-attendance/vehicle-attendance.component';
import { VehicleExpenseComponent } from './vehicle-expense/vehicle-expense.component';
import { ReportsComponent } from './reports/reports.component';
import { DistanceComponent } from './distance/distance.component';


export const VehicleRoutes: Routes = [

  {
    path: 'vehicle-details',
    component: VehicleDeatilsComponent,
  },
  {
    path: 'vehicle-assign',
    component: VehicleAssignComponent,
  },
  {
    path: 'vehicle-attendance',
    component: VehicleAttendanceComponent,
  },
  {
    path: 'vehicle-expense',
    component: VehicleExpenseComponent,
  },
  {
    path: 'vehicle-distance',
    component: DistanceComponent,
  },
  {
    path:"reports",
    component:ReportsComponent,
  },
  

];
