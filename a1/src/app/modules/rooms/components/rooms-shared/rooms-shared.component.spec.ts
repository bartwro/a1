import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsSharedComponent } from './rooms-shared.component';

describe('RoomsSharedComponent', () => {
  let component: RoomsSharedComponent;
  let fixture: ComponentFixture<RoomsSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
