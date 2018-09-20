import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TestTableComponent } from './test-table/test-table.component';
import { Test2Component } from './test2/test2.component';
import { Test1Component } from './test1/test1.component';
import { ElectorsTableComponent } from './electors-table/electors-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule, AlertModule, BsDropdownModule, ProgressbarModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PiChartComponent } from './pi-chart/pi-chart.component';
import { CounterComponent } from './counter/counter.component';
import { LoginComponent } from './login/login.component';
import { MemberComponent } from './member/member.component';
import { AuthService } from './services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { CanActivateAuthGuardService } from './services/can-activate-auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { HeaderComponent } from './header/header.component';
import { CookieService } from 'ngx-cookie-service';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { APP_ROUTES } from './app.routes';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { EmployeeListComponent } from './member/employee-list/employee-list.component';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { FirebaseService } from './services/firebase.service';
import { MemberService } from './services/member.service';

@NgModule({
  declarations: [
    AppComponent,
    TestTableComponent,
    HeaderComponent,
    Test2Component,
    Test1Component,
    ElectorsTableComponent,
    DashboardComponent,
    PiChartComponent,
    CounterComponent,
    LoginComponent,
    MemberComponent,
    AdminComponent,
    AdminHeaderComponent,
    AddUserComponent,
    ManageUsersComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxPaginationModule,
    AlertModule,
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ChartsModule,
    RouterModule.forRoot(
      APP_ROUTES,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [ AuthService, CanActivateAuthGuardService, AdminAuthGuardService, FirebaseService, CookieService,
    MemberService, HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
