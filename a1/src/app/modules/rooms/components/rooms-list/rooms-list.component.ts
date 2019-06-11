import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/modules/reservations/models/room';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {

  rooms: Room[] = [
    {
      id: 1,
      name: 'Odra'
    },
    {
      id: 2,
      name: 'T-1'
    },
    {
      id: 3,
      name: 'T-2'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  newFunction() {
    this.rooms.push({
      id: 4,
      name: 'new'
    });
  }
}
