import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllEventSets } from 'src/app/DataModels/AllEventSets';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';

@Component({
  selector: 'app-all-event-sets',
  templateUrl: './all-event-sets.component.html',
  styleUrls: ['./all-event-sets.component.scss']
})
export class AllEventSetsComponent implements OnInit {

  upcomingEventSets: AllEventSets[];
  curWeekEventSets: AllEventSets[];
  curMonthEventSets: AllEventSets[];

  constructor(private router: Router
    , private eventsService: EventsService) { }

  ngOnInit() {
    this.upcomingEventSets = this.eventsService.upcomingEventSets;
    this.curWeekEventSets = this.eventsService.curWeekEventSets;
    this.curMonthEventSets = this.eventsService.curMonthEventSets;
  }

  openEventSetDetails(eventSet, eventType) {
    this.router.navigate(['/main/createeventdetails'], {
      queryParams: {
        eventType: eventType,
        eventSetId: eventSet.eventSetId,
      }
    });
  }

  scheduleDrEvent() {
    this.router.navigateByUrl('/main/uploadspreadsheet');
  }

  formatTime(ts, type) {
    ts=ts.substring(0, 10) + ' ' + ts.substring(11, 16) + ':00';
    console.log('date : ', ts);
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if (type == 'd')
      return moment(ts).format("Do MMM, YYYY");
  }

  getStatus(statusId) {
    if(statusId == 1) {
      return 'Published';
    }
    if(statusId == 2) {
      return 'Partially Published';
    }
  }
}
