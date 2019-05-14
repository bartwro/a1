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

  entries: string[] = [];
  startHour: number;
  endHour: number;

  constructor(
    // private reservationService: ReservationService,
    // private fb: FormBuilder,
    private modalService: NgbModal) 
  {}

  ngOnInit() {
  }

  // 1st column
  getHours(): string[] {
    const numbers = Array.from(Array(24).keys()); //todo:replace it with more traditional code
    const result: string[] = [];
    numbers.forEach(x => {
      result.push( x<10 ? '0'+x : x.toString());
    });

    return result;
  }
  
  isBusy(hour: string, minutes: string){
    //let value = this.getHourNumber(hour);
    const value = `${hour}:${minutes}`;
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

    const ifAvailable = !this.isBusy(hour, minutes);
    
    if( ifAvailable ) {
      let hourNumber = this.getHourNumber(hour);
      let hourNumberInc = hourNumber+1;
      const startHour = `${hourNumber<10 ? '0'+hourNumber : hourNumber}`;
      const endHour = `${hourNumberInc<10 ? '0'+hourNumberInc : hourNumberInc}`;
      let fromLocal = `${startHour}:${minutes}`;
      let toLocal = `${endHour}:${minutes}`;
      let titleLocal = '';

      const modalRef = this.modalService.open(CalendarNewEntryComponent);     
      modalRef.componentInstance.data = { from: fromLocal, to: toLocal, title: titleLocal };
      modalRef.result.then(
        resultData => {
          this.saveNewCalendarEntry(resultData.from, resultData.to);
        },
        reject => console.log('modal rejected, reason: ' + reject),
      );
    }
  }

  saveNewCalendarEntry(from: string, to: string) {

    const start = from.split(':');
    const end = to.split(':');
    let currentHour = start;

    while(currentHour[0] <= end[0] ) {

      if(currentHour[0] === end[0] && currentHour[1] === end[1]){
        break;
      } else {
        this.entries.push(`${currentHour[0]}:${currentHour[1]}`);
        if(currentHour[1] == '30'){
          const newHour = +currentHour[0]+1;
          currentHour[0] = newHour<10 ? '0'+newHour : newHour.toString();
          currentHour[1] = '00';
        } else{
          currentHour[1] = '30';
        }
      }

    }
  }
}
