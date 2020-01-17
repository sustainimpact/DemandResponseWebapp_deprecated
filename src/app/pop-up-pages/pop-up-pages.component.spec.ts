import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPagesComponent } from './pop-up-pages.component';

describe('PopUpPagesComponent', () => {
  let component: PopUpPagesComponent;
  let fixture: ComponentFixture<PopUpPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
