import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNewEntryComponent } from './calendar-new-entry.component';

describe('CalendarNewEntryComponent', () => {
  let component: CalendarNewEntryComponent;
  let fixture: ComponentFixture<CalendarNewEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarNewEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarNewEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
