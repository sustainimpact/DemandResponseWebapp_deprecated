import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event-details',
  templateUrl: './create-event-details.component.html',
  styleUrls: ['./create-event-details.component.scss']
})
export class CreateEventDetailsComponent implements OnInit {
  innerHeight : any = 0;
  constructor() { }

  ngOnInit() {this.innerHeight = Number(window.innerHeight) - 240;
  }

}
