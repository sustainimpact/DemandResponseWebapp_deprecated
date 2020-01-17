import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-set-customers',
  templateUrl: './event-set-customers.component.html',
  styleUrls: ['./event-set-customers.component.scss']
})
export class EventSetCustomersComponent implements OnInit {

  innerHeight : any = 0;

  constructor() { }

  ngOnInit() {this.innerHeight = Number(window.innerHeight) - 229;
  }

}
