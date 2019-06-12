import { Component, OnInit, Input } from '@angular/core';
import { NewRoomData } from '../../models/new-room-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {

  @Input()
  data: NewRoomData;
  componentFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.componentFormGroup = this.fb.group({
      name: [ this.data.name ]
    });   
  }

  close(){    
  }

  save(){    
  }
  

}
