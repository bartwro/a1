import { Component, OnInit, Input } from '@angular/core';
import { NewRoomData } from '../../models/new-room-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from 'src/app/modules/shared/services/room.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {

  @Input()
  data: NewRoomData;
  componentFormGroup: FormGroup;
  isNew = false;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal,
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.componentFormGroup = this.fb.group({
      name: [ this.data.roomData.name ]
    });
    this.isNew = this.data.isNew;
    this.isEdit = !this.isNew;
  }

  close(reason: string){
    this.modal.dismiss(reason);
  }

  save(){
    this.data.roomData.name = this.componentFormGroup.get('name').value;
    this.roomService
      .createNew(this.data.roomData)
      .subscribe(x => {
        this.modal.close(this.data);
        console.log('saved');
      });
  }
  

}
