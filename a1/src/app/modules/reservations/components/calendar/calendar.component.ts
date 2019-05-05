import { Component, OnInit} from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CalendarNewEntryComponent } from '../calendar-new-entry/calendar-new-entry.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarNewEntryData } from '../../models/calendar-new-entry-data';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  selectedDay: Date = new Date();
  newReservationForm: FormGroup;
  entries: number[] = [];
  startHour: number;
  endHour: number;

  constructor(
    private reservationService: ReservationService,
    private fb: FormBuilder,
    private modalService: NgbModal) 
  {}

  ngOnInit() {
    let m = this.selectedDay.getMonth()+1;
    let month = m < 10 ? '0' + m : m;
    let d = this.selectedDay.getDate();
    let day = d < 10 ? '0' + d : d;
    this.newReservationForm = this.fb.group({
      day: [`${this.selectedDay.getFullYear()}-${month}-${day}`],
      from: [''],
      to: ['']
    })  

    this.newReservationForm.get('day').valueChanges.subscribe(
      selectedDay => {
        this.refreshCalendar(selectedDay);
      }
    );
  }

  refreshCalendar(selectedDay: string){
    const parts = selectedDay.split('-');
    const year = +parts[0];
    const month = +parts[1];
    const day = +parts[2];
    const reservations = this.reservationService.getByDate(new Date(year, month, day));

    reservations
      .sort( (a, b) => a.from<b.from ? -1 : 1 )
      .forEach(x => this.entries.push(x.from.getHours()));    
  }

  // 1st column
  getHours(): string[] {
    const numbers = Array.from(Array(24).keys()); //todo:replace it with more traditional code
    const result: string[] = [];
    numbers.forEach(x => {
      let hour = x;
      let entry = `${hour} AM`;
      if (x > 12) {
        hour -= 12;
        entry = `${hour} PM`;
      }
      result.push( entry );
    });

    return result;
  }

  save(){
    console.log(this.entries);
  }

  markHour(hourString: string){
    const parts = hourString.split(' ');
    let hour = +parts[0];
    if(parts[1] == 'PM'){
      hour += 12;
    }
    const idx = this.entries.indexOf(hour);
    if(idx > -1){
      this.entries.splice(idx);
    }else{
      this.entries.push(hour);
    }
  }

  isBusy(hour: string){
    let value = this.getHourNumber(hour);
    return this.entries.indexOf(value) > -1;
  }

  private getHourNumber(hour: string) {
    const parts = hour.split(' ');
    let value = +parts[0];
    if (parts[1] == 'PM') {
      value += 12;
    }
    return value;
  }

  openModal(hour: string, minutes: string) {

    const ifAvailable = !this.isBusy(hour);
    
    if( ifAvailable ) {
      let hourNumber = this.getHourNumber(hour);
      let hourNumberInc = hourNumber+1;
      const startHour = `${hourNumber<10 ? '0'+hourNumber : hourNumber}`;
      const endHour = `${hourNumberInc<10 ? '0'+hourNumberInc : hourNumberInc}`;
      let fromLocal = `${startHour}:${minutes}`;
      let toLocal = `${endHour}:${minutes}`;
      let titleLocal = '';
      let newEntryData = {to: '', from: '', title: ''};

      const modalRef = this.modalService.open(CalendarNewEntryComponent);     
      modalRef.componentInstance.data = { from: fromLocal, to: toLocal, title: titleLocal };
      modalRef.result.then(
        resultData => {
          newEntryData = resultData;
          this.saveNewCalendarEntry(resultData.from, resultData.to);
        },
        reject => console.log('modal rejected, reason: ' + reject),
      );
    }
  }

  saveNewCalendarEntry(from: string, to: string) {
    const start = +from.split(':')[0];
    const end = +to.split(':')[0];

    for (let _i = start; _i < end ; _i++) {
      this.entries.push(_i);
    }
  }

}
