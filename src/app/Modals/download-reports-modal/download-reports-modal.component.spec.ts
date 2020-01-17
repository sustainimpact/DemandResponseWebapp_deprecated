import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadReportsModalComponent } from './download-reports-modal.component';

describe('DownloadReportsModalComponent', () => {
  let component: DownloadReportsModalComponent;
  let fixture: ComponentFixture<DownloadReportsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadReportsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadReportsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
