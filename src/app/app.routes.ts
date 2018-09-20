import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MemberComponent } from './member/member.component';
import { CanActivateAuthGuardService } from './services/can-activate-auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ElectorsTableComponent } from './electors-table/electors-table.component';
import { Test2Component } from './test2/test2.component';
import { AdminComponent } from './admin/admin.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { EmployeeListComponent } from './member/employee-list/employee-list.component';

export const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuardService],
    children: [
      { path: '', component: AddUserComponent },
      { path: 'users', component: ManageUsersComponent }
    ]
  },
  {
    path: 'member',
    component: MemberComponent,
    canActivate: [ CanActivateAuthGuardService ],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'electors', component: ElectorsTableComponent },
      { path: 'עובדים', component: EmployeeListComponent },
    ]
  },
  { path: '**', redirectTo: 'member' }
];
