import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventSetsComponent } from './all-event-sets.component';

describe('AllEventSetsComponent', () => {
  let component: AllEventSetsComponent;
  let fixture: ComponentFixture<AllEventSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEventSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEventSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
