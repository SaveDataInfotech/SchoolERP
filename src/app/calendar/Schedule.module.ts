import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ScheduleComponent } from './schedule/schedule.component';


@NgModule({
  declarations: [ScheduleComponent],
  imports: [RouterModule, MaterialModule],
  exports: [RouterModule],
  providers: [],
})
export class ScheduleModule {
  constructor(){
    console.log('module loded');
    
  }
}
