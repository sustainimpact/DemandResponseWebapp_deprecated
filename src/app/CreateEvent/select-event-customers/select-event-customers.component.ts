import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-event-customers',
  templateUrl: './select-event-customers.component.html',
  styleUrls: ['./select-event-customers.component.scss']
})
export class SelectEventCustomersComponent implements OnInit {

  innerHeight : any = 0;

  constructor() { }

  ngOnInit() {this.innerHeight = Number(window.innerHeight) - 210;
  }

}
