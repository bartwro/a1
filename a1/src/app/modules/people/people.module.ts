import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PeopleSharedComponent } from './components/people-shared/people-shared.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../user/auth.guard';

@NgModule({
  declarations: [PeopleListComponent, PeopleSharedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'people',
        component: PeopleSharedComponent,
        children: [
          { path: '', component: PeopleListComponent }
        ],
        canActivate: [AuthGuard]
      }
    ])
  ]
})
export class PeopleModule { }
