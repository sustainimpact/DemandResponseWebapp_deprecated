import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-event-sets',
  templateUrl: './all-event-sets.component.html',
  styleUrls: ['./all-event-sets.component.scss']
})
export class AllEventSetsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openEventSetDetails() {
    this.router.navigateByUrl('/main/createeventdetails');
  }

  scheduleDrEvent() {
    console.log("Start DR event schedule");
    this.router.navigateByUrl('/main/uploadspreadsheet');
  }
}
