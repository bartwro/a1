import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/modules/reservations/models/room';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomDetailsComponent } from '../room-details/room-details.component';
import { RoomService } from 'src/app/modules/reservations/services/room.service';
import { Subject, merge } from 'rxjs';
import {
  catchError, scan
} from 'rxjs/operators';
import { NewRoomData } from '../../models/new-room-data';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {

  activeEditIcon = '../../../../../assets/icons/edit_icon.svg';
  inactiveEditIcon = '../../../../../assets/icons/edit_icon_inactive.svg';
  activeDeleteIcon = '../../../../../assets/icons/delete_active.svg';
  inactiveDeleteIcon = '../../../../../assets/icons/delete_inactive.svg';

  activeIdEdit: number = 0;
  activeIdDelete: number = 0;
  rooms: Room[] = [];

  constructor(
    private modalService: NgbModal,
    private roomsService: RoomService
  ) { }  

  productInsertSource = new Subject<Room>();
  productInserts$ = this.productInsertSource.asObservable();
  
  addOne() {
    
    this.productInserts$.pipe(
      scan( (acc: Room[], value: Room) => [...acc, value] )
    );

    this.productInsertSource.next({
      id: 42,
      name: 'Another One'
    });
  }

  ngOnInit() {
    this.rooms = this.roomsService.getAll();
  }

  openNewRoomModal() {
    const modalRef = this.modalService.open(RoomDetailsComponent);    
    modalRef.componentInstance.data = { isNew: true, roomData: {name: ''} };
    modalRef.result.then(
      (resultData: NewRoomData) => {
        this.roomsService.create(resultData.roomData.name);
      },
      reject => console.log('modal rejected, reason: ' + reject),
    );
  }

  openEditRoomModal(roomId: number){
    const modalRef = this.modalService.open(RoomDetailsComponent);    
    modalRef.componentInstance.data = { isNew: false, roomData: this.rooms.filter(x => x.id === roomId)[0] };

    modalRef.result.then(      
      (resultData : NewRoomData) => {
        this.roomsService.update(resultData.roomData);
      },
      reject => console.log('modal rejected, reason: ' + reject),
    );
  }

  deleteRoom(id: number){
    this.roomsService.delete(id);
  }
  
  onMouseOutEdit(id: number){
    this.activeIdEdit = -1;
  }

  onMouseOverEdit(id: number){
    this.activeIdEdit = id;
  }
  
  onMouseOutDelete(id: number){
    this.activeIdDelete = -1;
  }

  onMouseOverDelete(id: number){
    this.activeIdDelete = id;
  }
}
