import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { RoomsSharedComponent } from './components/rooms-shared/rooms-shared.component';
import { RouterModule } from '@angular/router';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RoomsListComponent, RoomsSharedComponent, RoomDetailsComponent],
  entryComponents: [RoomDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'rooms',
        component: RoomsSharedComponent,
        children: [
          {path: '', component: RoomsListComponent}
        ]
      },
    ])
  ]
})
export class RoomsModule { }
