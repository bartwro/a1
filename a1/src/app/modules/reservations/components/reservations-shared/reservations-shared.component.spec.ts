import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsSharedComponent } from './reservations-shared.component';

describe('ReservationsSharedComponent', () => {
  let component: ReservationsSharedComponent;
  let fixture: ComponentFixture<ReservationsSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
