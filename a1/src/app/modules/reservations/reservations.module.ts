import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';
import { ReservationsMyComponent } from './components/reservations-my/reservations-my.component';
import { ReservationsNewComponent } from './components/reservations-new/reservations-new.component';
import { RouterModule } from '@angular/router';
import { ReservationsSharedComponent } from './components/reservations-shared/reservations-shared.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarNewEntryComponent } from './components/calendar-new-entry/calendar-new-entry.component';
import { MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ReservationsListComponent, ReservationsMyComponent, ReservationsNewComponent, ReservationsSharedComponent, CalendarComponent, CalendarNewEntryComponent],
  entryComponents: [CalendarNewEntryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    MatPaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule
  ]
})
export class ReservationsModule { }
