import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TestTableComponent } from './test-table/test-table.component';
import { HeaderComponent } from './header/header.component';
import { Test2Component } from './test2/test2.component';
import { Test1Component } from './test1/test1.component';
import { ElectorsTableComponent } from './electors-table/electors-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule, AlertModule, BsDropdownModule, ProgressbarModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PiChartComponent } from './pi-chart/pi-chart.component';
import { CounterComponent } from './counter/counter.component';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'electors', component: ElectorsTableComponent },
  { path: 'test2', component: Test2Component }
];

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
    CounterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgxPaginationModule,
    AlertModule,
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ChartsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
