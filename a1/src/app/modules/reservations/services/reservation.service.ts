import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [
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
      from: new Date(2019, 4, 2, 12, 0),
      to: new Date(2019, 4, 2, 14, 0),
      who: 'Adam Mickiewicz',
      description: 'Wielka Improwizacja'
    },
    {
      id: 3,
      roomName: 'T-1000',
      from: new Date(2019, 4, 2, 9, 0),
      to: new Date(2019, 4, 2, 12, 0),
      who: 'James Cameroon',
      description: 'How to boost startup?'
    },
    {
      id: 4,
      roomName: 'Apple2',
      from: new Date(98, 3),
      to: new Date(2019, 4, 2, 12, 0),
      who: 'Tim Cook',
      description: 'How to make money in IT?'
    },
    {
      id: 5,
      roomName: 'Gameboy',
      from: new Date(2019, 4, 2, 9, 0, 0, 0),
      to: new Date(2019, 4, 2, 12, 0, 0, 0),
      who: 'Tony Hawk',
      description: 'How to skate?'
    },
  ];

  constructor() { }

  getAll() {
    return new Promise<Reservation[]>(
      (resolveFn) => {
        resolveFn(this.reservations);
      }
    );
  }

  getByDate(date: Date) {
    return this.reservations.filter(x => x.from.toLocaleDateString() === date.toLocaleDateString());
  }

  save(reservation: Reservation){
    console.log(reservation);
    this.reservations.push(reservation);
  }
}
