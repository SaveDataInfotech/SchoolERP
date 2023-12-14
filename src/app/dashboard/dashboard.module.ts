import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.route';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed


@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterModule.forChild(dashboardRoutes), MaterialModule, CommonModule,
    FormsModule,],
  exports: [RouterModule],
  providers: [],
})
export class DashboardModule {
  constructor() {
  }
}
