import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScheduleRoutes } from './schedule.routes';
import { MaterialModule } from '../shared/material.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ScheduleRoutes),
    MaterialModule,

   
  ]
})


export class ScheduleModule { }
