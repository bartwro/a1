import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/modules/reservations/models/room';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomDetailsComponent } from '../room-details/room-details.component';

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

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  openNewRoomModal() {
    const modalRef = this.modalService.open(RoomDetailsComponent);    
    modalRef.componentInstance.data = { isNew: true, name: 'new' };
      // modalRef.result.then(
      //   resultData => {
      //     this.saveNewCalendarEntry(resultData.from, resultData.to);
      //   },
      //   reject => console.log('modal rejected, reason: ' + reject),
      // );
  }
}
