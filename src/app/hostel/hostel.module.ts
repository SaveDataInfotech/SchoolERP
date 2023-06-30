import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hostelRoutes } from './hostel.routes';
import { RouterModule } from '@angular/router';
import { RoomAllotmentComponent } from './room-allotment/room-allotment.component';
import { RoomAssignComponent } from './room-assign/room-assign.component';
import { ReportsComponent } from './reports/reports.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { AttendanceComponent } from './attendance/attendance.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RoomAllotmentComponent,
    RoomAssignComponent,
    ReportsComponent,
    AttendanceComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(hostelRoutes),MatTabsModule, MatPaginatorModule, MatTableModule,MatIconModule,MatTooltipModule,
    FormsModule,HttpClientModule,MatCardModule
  ]
})
export class HostelModule { }
