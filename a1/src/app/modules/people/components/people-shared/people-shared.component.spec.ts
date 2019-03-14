import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleSharedComponent } from './people-shared.component';

describe('PeopleSharedComponent', () => {
  let component: PeopleSharedComponent;
  let fixture: ComponentFixture<PeopleSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
