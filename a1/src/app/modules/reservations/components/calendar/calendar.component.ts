import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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

}
