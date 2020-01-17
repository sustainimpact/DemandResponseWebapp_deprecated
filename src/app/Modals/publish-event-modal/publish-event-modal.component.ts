import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publish-event-modal',
  templateUrl: './publish-event-modal.component.html',
  styleUrls: ['./publish-event-modal.component.scss']
})
export class PublishEventModalComponent implements OnInit {
  cancelAddUser:Boolean= true;

  constructor() { }

  ngOnInit() {
  }

  hidePublish()
  {
    this.cancelAddUser=false;
  }
}
