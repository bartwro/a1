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

  getAll(): Room[] {
    return this.rooms;
  }

  update(room: Room){
    const toUpdate = this.rooms.filter(x => x.id === room.id);
    if(toUpdate.length>0){
      toUpdate[0] = room;
    } else{
      throw new Error("Room to update don't exist.");
    }
  }
}
