import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  create(name: string) {  
    if(name){

      let max = -1;
      this.rooms.forEach(r => {
        if(r.id > max){
          max = r.id;
        }
      });

      const room = { id: max+1, name: name } as Room;
      this.rooms.push(room);
    }
  }

  delete(id: number) {
    
    let index = -1;

    for(let i=0; i<=this.rooms.length; i++){
      if(this.rooms[i].id === id){
        index = i;
        break;
      }
    }

    if(index > -1){
      this.rooms.splice(index, 1);
    }
  }

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
