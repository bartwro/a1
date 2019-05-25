import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Component, OnInit} from '@angular/core';
import { CalendarNewEntryComponent } from '../calendar-new-entry/calendar-new-entry.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarNewEntryData } from '../../models/calendar-new-entry-data';
import { Router } from '@angular/router';
import { Reservation } from '../../models/reservation';

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
  addedEntries: {from: string, to: string}[] = [];
  entries: string[] = [];
  startHour: number;
  endHour: number;

  constructor(
    private roomService: RoomService,
    private peopleService: PeopleService,
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private modalService: NgbModal,
    private router: Router) { }

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
    const month = +parts[1]-1;
    const day = +parts[2];
    const reservations = this.reservationService.getByDate(new Date(year, month, day));

    reservations
      .sort( (a, b) => a.from<b.from ? -1 : 1 )
      .forEach(x => this.populateEntriesOnRefresh(x.from, x.to));
  }
  populateEntriesOnRefresh(from: Date, to: Date): void {
    console.log(from.getHours() + ':' + to.getMinutes());
    let start: string[] = [];
    let end: string[] = [];
    const fHour = from.getHours().toString();
    const fMinute = from.getMinutes().toString();
    const tHour = to.getHours().toString();  
    const tMinute = to.getMinutes().toString();  
    start[0] = fHour.length<2 ? '0'+fHour : fHour;
    start[1] = fMinute.length<2 ? '0'+fMinute : fMinute;
    end[0] = tHour.length<2 ? '0'+tHour : tHour;
    end[1] = tMinute.length<2 ? '0'+tMinute : tMinute;    
    this.populateEntries(start, end);
  }

  save(){
   
    this.addedEntries.forEach(added => {
      let fromStr = this.newReservationForm.get('day').value + 'T' + added.from + ':00';
      let toStr = this.newReservationForm.get('day').value + 'T' + added.to + ':00';
      let reservation: Reservation = {
        id: 0,
        description: '',
        from: new Date(fromStr),
        to: new Date(toStr),
        who: this.newReservationForm.get('who').value,
        roomName: this.newReservationForm.get('room').value
      };
      this.reservationService.save(reservation);
    });

    this.router.navigate(['/reservations']);
  }

    // 1st column
    getHours(): string[] {
      const result: string[] = [];

      for( let i=0; i< 24; i++ ){
        let hour = i+8;
        if(hour>24){
          hour = hour - 24;
        }
        result.push( (hour<10 ? '0' + hour : hour.toString()) + ':00' );
      }
  
      return result;
    }
    
    isBusy(hour: string, minutes: string){
      const hourL = hour.split(':')[0];
      const value = `${hourL}:${minutes}`;
      return this.entries.indexOf(value) > -1;
    }
  
    private getHourNumber(hour: string) {
      let hString = hour.split(':')[0];
      if(hString.startsWith('0')){
        hString = hString.slice(1);
      }
      let value = +hString;
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
      this.addedEntries.push( {from: from, to: to} );

      const start = from.split(':');
      const end = to.split(':');
      this.populateEntries(start, end);
    }

    populateEntries(start: string[], end: string[]) {
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
