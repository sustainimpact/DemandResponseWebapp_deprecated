import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerModalGIComponent } from './add-customer-modal-gi.component';

describe('AddCustomerModalGIComponent', () => {
  let component: AddCustomerModalGIComponent;
  let fixture: ComponentFixture<AddCustomerModalGIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerModalGIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerModalGIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
