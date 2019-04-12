import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private rooms: Room[] = [
    {id: 1, name: 'Odra'},
    {id: 2, name: 'Optimus'},
    {id: 3, name: 'T-1000'}];

  constructor() { }

  getAll(): Observable<Room> {
    return from(this.rooms);
  }
}
