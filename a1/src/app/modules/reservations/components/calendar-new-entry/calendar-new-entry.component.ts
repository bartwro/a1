import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CalendarNewEntryData } from '../../models/calendar-new-entry-data';

@Component({
  selector: 'app-calendar-new-entry',
  templateUrl: './calendar-new-entry.component.html',
  styleUrls: ['./calendar-new-entry.component.scss']
})
export class CalendarNewEntryComponent {

  constructor(
    public dialogRef: MatDialogRef<CalendarNewEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarNewEntryData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
