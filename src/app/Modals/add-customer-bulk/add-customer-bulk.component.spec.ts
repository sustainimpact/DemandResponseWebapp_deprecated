import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerBulkComponent } from './add-customer-bulk.component';

describe('AddCustomerBulkComponent', () => {
  let component: AddCustomerBulkComponent;
  let fixture: ComponentFixture<AddCustomerBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
