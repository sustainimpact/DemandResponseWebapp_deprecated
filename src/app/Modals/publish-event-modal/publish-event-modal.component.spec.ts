import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishEventModalComponent } from './publish-event-modal.component';

describe('PublishEventModalComponent', () => {
  let component: PublishEventModalComponent;
  let fixture: ComponentFixture<PublishEventModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishEventModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
