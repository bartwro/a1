import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { SharedModule } from './modules/shared/shared.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { PeopleModule } from './modules/people/people.module';
import { UserModule } from './modules/user/user.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReservationsModule,
    RoomsModule,
    PeopleModule,
    SharedModule,
    UserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
