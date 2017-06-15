import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './projects/home/home.component';
import { ErrorComponent } from './error/error.component';
import { ClockComponent } from './projects/clock/clock.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch:'full'},
  {path: 'clock', component: ClockComponent},
  {path: '**', component: ErrorComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
