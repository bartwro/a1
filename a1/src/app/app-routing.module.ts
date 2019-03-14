import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationsListComponent } from './modules/reservations/components/reservations-list/reservations-list.component';
import { PageNotFoundComponent } from './modules/shared/components/page-not-found/page-not-found.component';
import { RoomsListComponent } from './modules/rooms/components/rooms-list/rooms-list.component';
import { LoginComponent } from './modules/user/components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'reservations', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
