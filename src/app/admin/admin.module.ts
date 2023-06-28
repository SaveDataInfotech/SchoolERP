import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MaterialModule } from '../shared/material.module';
import { adminRoutes } from './admin.router';
import { CompanyDetailsComponent } from './company-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserRightsComponent } from './user-rights/user-rights.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@NgModule({
  
 
  declarations: [CompanyDetailsComponent,UserDetailsComponent, UserGroupComponent, UserRightsComponent],
  imports: [
    RouterModule.forChild(adminRoutes),
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatPaginatorModule,
    CommonModule
  ],
  exports: [RouterModule],
  providers: [],
})
export class AdminModule {}
