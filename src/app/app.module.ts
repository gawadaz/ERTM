import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TestTableComponent } from './test-table/test-table.component';
import { HeaderComponent } from './header/header.component';
import { Test2Component } from './test2/test2.component';
import { Test1Component } from './test1/test1.component';

const appRoutes: Routes = [
  { path: '', component: Test1Component },
  { path: 'test1', component: Test2Component },
  { path: 'test2', component: Test2Component }
];

@NgModule({
  declarations: [
    AppComponent,
    TestTableComponent,
    HeaderComponent,
    Test2Component,
    Test1Component
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
