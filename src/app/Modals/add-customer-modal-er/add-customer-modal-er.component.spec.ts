import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerModalERComponent } from './add-customer-modal-er.component';

describe('AddCustomerModalERComponent', () => {
  let component: AddCustomerModalERComponent;
  let fixture: ComponentFixture<AddCustomerModalERComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerModalERComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerModalERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
