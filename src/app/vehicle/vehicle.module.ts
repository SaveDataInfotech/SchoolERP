import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDeatilsComponent } from './vehicle-deatils/vehicle-deatils.component';
import { VehicleAssignComponent } from './vehicle-assign/vehicle-assign.component';
import { VehicleAttendanceComponent } from './vehicle-attendance/vehicle-attendance.component';
import { VehicleExpenseComponent } from './vehicle-expense/vehicle-expense.component';
import { DistanceComponent } from './distance/distance.component';
import { ReportsComponent } from './reports/reports.component';
import { VehicleRoutes } from './vehicle.routes';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [
    VehicleDeatilsComponent,
    VehicleAssignComponent,
    VehicleAttendanceComponent,
    VehicleExpenseComponent,
    ReportsComponent,
    DistanceComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(VehicleRoutes),MatIconModule,MatCardModule,MatTooltipModule,FormsModule, ReactiveFormsModule,
    MatFormFieldModule,MatInputModule,MatTabsModule
  ]
})
export class VehicleModule { }
