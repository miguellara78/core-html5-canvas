import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './projects/home/home.component';
import { ErrorComponent } from './error/error.component';
import { ClockComponent } from './projects/clock/clock.component';
import { RubberbandZoomComponent } from './projects/rubberband-zoom/rubberband-zoom.component';
import { MouseCoordinatesComponent } from './projects/mouse-coordinates/mouse-coordinates.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch:'full'},
  {path: 'clock', component: ClockComponent},
  {path: 'mousecoordinates', component: MouseCoordinatesComponent},
  {path: 'rubberbandzoom', component: RubberbandZoomComponent},
  {path: '**', component: ErrorComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    ClockComponent,
    RubberbandZoomComponent,
    MouseCoordinatesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
