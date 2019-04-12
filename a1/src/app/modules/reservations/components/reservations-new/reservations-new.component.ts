import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-reservations-new',
  templateUrl: './reservations-new.component.html',
  styleUrls: ['./reservations-new.component.scss']
})
export class ReservationsNewComponent implements OnInit {

  rooms: Room[] = [];
  people: Person[] = [];

  constructor(private roomService: RoomService, private peopleService: PeopleService) { }

  ngOnInit() {
    this.roomService.getAll().subscribe(
      room => this.rooms.push(room)
    );

    this.peopleService.getAll().subscribe(
      person => this.people.push(person)
    );
  }

}
