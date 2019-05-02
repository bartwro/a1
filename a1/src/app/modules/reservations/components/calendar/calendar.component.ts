import { Component, OnInit} from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CalendarNewEntryComponent } from '../calendar-new-entry/calendar-new-entry.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  day: Date = new Date(Date.now());
  newReservationForm: FormGroup;
  entries: number[] = [];
  startHour: number;
  endHour: number;

  constructor(
    private reservationService: ReservationService,
    private fb: FormBuilder,
    public dialog: MatDialog) 
  {}

  ngOnInit() {
    const date = new Date();
    let m = date.getMonth()+1;
    let month = m < 10 ? '0' + m : m;
    this.newReservationForm = this.fb.group({
      day: [`${date.getFullYear()}-${month}-${date.getDate()}`],
      from: [''],
      to: ['']
    })

    this.newReservationForm.get('day').valueChanges.subscribe(
      selectedDay => this.refreshCalendar(selectedDay)
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
    const numbers = Array.from(Array(24).keys());
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
    const parts = hour.split(' ');
    let value = +parts[0];
    if(parts[1] == 'PM'){
      value += 12;
    }
    return this.entries.indexOf(value) > -1;
  }

  onHourDblClick(){
    let fromLocal = new Date();
    let toLocal = new Date();
    let titleLocal = '';
    let newEntryData = {};
    const dialogRef = this.dialog.open(CalendarNewEntryComponent, {
      width: '250px',
      data: { from: fromLocal, to: toLocal, title: titleLocal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('new entry dialog was closed');
      newEntryData = result;
    });

    console.log('dbl click works');
  }

  // 2nd column
  // getReservations()

}
