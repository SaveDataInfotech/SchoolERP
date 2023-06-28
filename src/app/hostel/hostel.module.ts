import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hostelRoutes } from './hostel.routes';
import { RouterModule } from '@angular/router';
import { RoomAllotmentComponent } from './room-allotment/room-allotment.component';
import { RoomAssignComponent } from './room-assign/room-assign.component';
import { ReportsComponent } from './reports/reports.component';



@NgModule({
  declarations: [
    RoomAllotmentComponent,
    RoomAssignComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(hostelRoutes),
  ]
})
export class HostelModule { }
