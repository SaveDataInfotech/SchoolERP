import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './shared/components/login-component/login-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('./schedule/schedule.module').then((m) => m.ScheduleModule),
      },
      {
        path: 'master',
        loadChildren: () =>
          import('./master/master.module').then((m) => m.MasterModule),
      },
      {
        path: 'student',
        loadChildren: () =>
          import('./student/student.module').then((m) => m.StudentModule),
      },

      {
        path: 'staff',
        loadChildren: () =>
          import('./staff/staff.module').then((m) => m.StaffModule),
      },
      {
        path:"hostel",
        loadChildren:()=>import('./hostel/hostel.module').then((m)=>m.HostelModule),
      },
      {
        path:"fees_collection",
        loadChildren:()=>import('./fees-collection/fees-collection.module').then((m)=>m.FeesCollectionModule),
      },

      {
        path: 'purchase_entry',
        loadChildren: () =>
          import('./purchase-entry/purchase-entry.module').then((m) => m.PurchaseEntryModule),
      },
      {
        path: 'vehicle',
        loadChildren: () =>
          import('./vehicle/vehicle.module').then((m) => m.VehicleModule),
      },      
      // {
      //   path: 'admin',
      //   loadChildren: () =>
      //     import('./admin/admin.module').then((m) => m.AdminModule),
      // },
      
      {
        path: 'customer',
        loadChildren: () => 
        import('./customer/customer.module').then((m) => m.CustomerModule),
      },

    ],
  },
];

export const pageComponents = [LoginComponent, LayoutComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
