import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsMyComponent } from './reservations-my.component';

describe('ReservationsMyComponent', () => {
  let component: ReservationsMyComponent;
  let fixture: ComponentFixture<ReservationsMyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsMyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
