import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';
import { ReservationsMyComponent } from './components/reservations-my/reservations-my.component';
import { ReservationsNewComponent } from './components/reservations-new/reservations-new.component';
import { RouterModule } from '@angular/router';
import { ReservationsSharedComponent } from './components/reservations-shared/reservations-shared.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [ReservationsListComponent, ReservationsMyComponent, ReservationsNewComponent, ReservationsSharedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'reservations',
        //loadChildren: './modules/reservations/reservations.module#ReservationsModule',
        // canActivate: [AuthGuard],
        // data: {preload: false}
        //canLoad: [AuthGuard],
        component: ReservationsSharedComponent,
        children: [
          { path: '', component: ReservationsListComponent },
          { path: 'new', component: ReservationsNewComponent },
          { path: 'my', component: ReservationsMyComponent },
        ]
      },
    ]),
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ReservationsModule { }
