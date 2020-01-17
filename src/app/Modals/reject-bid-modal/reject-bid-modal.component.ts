import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reject-bid-modal',
  templateUrl: './reject-bid-modal.component.html',
  styleUrls: ['./reject-bid-modal.component.scss']
})
export class RejectBidModalComponent implements OnInit {
  cancelAddUser:Boolean= true;

  constructor() { }

  ngOnInit() {
  }

  hidePublish()
  {
    this.cancelAddUser=false;
  }
}
