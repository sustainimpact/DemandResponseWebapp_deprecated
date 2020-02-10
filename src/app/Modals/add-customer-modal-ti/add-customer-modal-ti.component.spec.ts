import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerModalTIComponent } from './add-customer-modal-ti.component';

describe('AddCustomerModalTIComponent', () => {
  let component: AddCustomerModalTIComponent;
  let fixture: ComponentFixture<AddCustomerModalTIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerModalTIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerModalTIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
