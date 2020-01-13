import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventHomeComponent } from './create-event-home.component';

describe('CreateEventHomeComponent', () => {
  let component: CreateEventHomeComponent;
  let fixture: ComponentFixture<CreateEventHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
