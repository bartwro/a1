import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss']
})
export class ReservationsListComponent implements OnInit {

  reservations: Reservation[];

  displayedColumns: string[] = ['who', 'from', 'to'];

  constructor() { }

  ngOnInit() {
    this.reservations = [
      {
        id: 1,
        roomName: 'Odra',
        from: new Date(2019, 4, 1, 9, 30),
        to: new Date(2019, 4, 1, 12, 0),
        who: 'Jan Kochanowski',
        description: 'L&L Angular'
      },
      {
        id: 2,
        roomName: 'Alto',
        from: new Date(2019, 4, 2, 9, 0),
        to: new Date(2019, 4, 2, 12, 0),
        who: 'Adam Mickiewicz',
        description: 'Wielka Improwizacja'
      }
    ];
  }
}
