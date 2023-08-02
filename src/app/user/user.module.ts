import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {UserRoutes} from '../user/user.routes'


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,RouterModule.forChild(UserRoutes),
  ]
})
export class UserModule { }
