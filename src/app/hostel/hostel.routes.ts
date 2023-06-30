import { Routes } from '@angular/router';
import { RoomAllotmentComponent } from './room-allotment/room-allotment.component';
import { RoomAssignComponent } from './room-assign/room-assign.component';
import { ReportsComponent } from './reports/reports.component';
import { AttendanceComponent } from './attendance/attendance.component';


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
    path: 'hostel_attendance',
    component: AttendanceComponent,
  },
  {
    path:"reports",
    component:ReportsComponent,
  },
  

];
