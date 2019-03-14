import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { RoomsSharedComponent } from './components/rooms-shared/rooms-shared.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RoomsListComponent, RoomsSharedComponent],
  imports: [
    CommonModule,
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
