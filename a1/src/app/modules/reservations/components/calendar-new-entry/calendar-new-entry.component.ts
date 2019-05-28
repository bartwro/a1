import { Component, OnInit, Input } from '@angular/core';
import { CalendarNewEntryData } from '../../models/calendar-new-entry-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-new-entry',
  templateUrl: './calendar-new-entry.component.html',
  styleUrls: ['./calendar-new-entry.component.scss']
})
export class CalendarNewEntryComponent implements OnInit {
  
  componentFormGroup: FormGroup;

  @Input()
  data: CalendarNewEntryData;
  
  constructor(
    private fb: FormBuilder,
    private modal: NgbActiveModal ) {}

  onNoClick(): void {
  }

  ngOnInit(): void {
    this.componentFormGroup = this.fb.group({
      from: [ this.data.from ],
      to: [ this.data.to ],
      title: [this.data.title]
    });    
  }

  save(){
    console.log(  this.componentFormGroup.get('to').value );
    
    this.data.from = this.componentFormGroup.get('from').value;
    this.data.to = this.componentFormGroup.get('to').value;
    this.data.title = this.componentFormGroup.get('title').value;
    this.modal.close(this.data);
  }

  close() {
    this.modal.dismiss('cross click');
  }
}
