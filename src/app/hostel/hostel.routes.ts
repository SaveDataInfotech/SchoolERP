import { Routes } from '@angular/router';
import { RoomAllotmentComponent } from './room-allotment/room-allotment.component';
import { RoomAssignComponent } from './room-assign/room-assign.component';
import { ReportsComponent } from './reports/reports.component';


export const hostelRoutes: Routes = [

  {
    path: 'room_allotment',
    component: RoomAllotmentComponent,
  },
  {
    path: 'room_assign',
    component: RoomAssignComponent,
  },
  {
    path:"reports",
    component:ReportsComponent,
  },
  

];
