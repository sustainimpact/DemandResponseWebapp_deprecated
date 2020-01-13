import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEventCustomersComponent } from './select-event-customers.component';

describe('SelectEventCustomersComponent', () => {
  let component: SelectEventCustomersComponent;
  let fixture: ComponentFixture<SelectEventCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectEventCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEventCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
