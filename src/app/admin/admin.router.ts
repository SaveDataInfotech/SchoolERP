import { Routes } from '@angular/router';
import { CompanyDetailsComponent } from './company-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserRightsComponent } from './user-rights/user-rights.component';

export const adminRoutes: Routes = [
  {
    path: 'company-details',
    component: CompanyDetailsComponent,
  },
  {
    path: 'user-details',
    component: UserDetailsComponent
  },
  {
    path: 'user-group',
    component: UserGroupComponent
  },
  {
    path: 'user-rights',
    component: UserRightsComponent
  }
];
