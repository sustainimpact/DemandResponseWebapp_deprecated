import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSetCustomersComponent } from './event-set-customers.component';

describe('EventSetCustomersComponent', () => {
  let component: EventSetCustomersComponent;
  let fixture: ComponentFixture<EventSetCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSetCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSetCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
