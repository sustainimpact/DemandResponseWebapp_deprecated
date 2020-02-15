import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-create-event-home',
  templateUrl: './create-event-home.component.html',
  styleUrls: ['./create-event-home.component.scss']
})
export class CreateEventHomeComponent implements OnInit {

  @ViewChild('fileInput', {static:false}) fileInput: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  selectFile() {
    this.fileInput.nativeElement.click();
  }
}
