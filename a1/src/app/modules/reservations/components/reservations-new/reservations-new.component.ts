import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { CalendarNewEntryComponent } from '../calendar-new-entry/calendar-new-entry.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarNewEntryData } from '../../models/calendar-new-entry-data';

@Component({
  selector: 'app-reservations-new',
  templateUrl: './reservations-new.component.html',
  styleUrls: ['./reservations-new.component.scss']
})
export class ReservationsNewComponent implements OnInit {

  newReservationForm: FormGroup;
  rooms: Room[] = [];
  people: Person[] = [];
  selectedDay: Date = new Date();

  entries: string[] = [];
  startHour: number;
  endHour: number;

  constructor(
    private roomService: RoomService,
    private peopleService: PeopleService,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private modalService: NgbModal) { }

  ngOnInit() {

    let m = this.selectedDay.getMonth()+1;
    let month = m < 10 ? '0' + m : m;
    let d = this.selectedDay.getDate();
    let day = d < 10 ? '0' + d : d;
    this.newReservationForm = this.fb.group({
      day: [`${this.selectedDay.getFullYear()}-${month}-${day}`],
      from: [''],
      to: [''],
      room: [''],
      who: ['']
    })  

    this.newReservationForm.get('day').valueChanges.subscribe(
      selectedDay => {
        this.refreshCalendar(selectedDay);
      }
    );

    this.roomService.getAll().subscribe(
      room => this.rooms.push(room)
    );

    this.peopleService.getAll().subscribe(
      person => this.people.push(person)
    );
  }

  refreshCalendar(selectedDay: string){
    const parts = selectedDay.split('-');
    const year = +parts[0];
    const month = +parts[1];
    const day = +parts[2];
    const reservations = this.reservationService.getByDate(new Date(year, month, day));

    // reservations
    //   .sort( (a, b) => a.from<b.from ? -1 : 1 )
    //   .forEach(x => this.entries.push(x.from.getHours()));    
  }

  save(){
    console.log(this.newReservationForm.get('day'));
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
