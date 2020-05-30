import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllEventSets } from 'src/app/DataModels/AllEventSets';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEventHomeComponent } from '../create-event-home/create-event-home.component';

@Component({
  selector: 'app-all-event-sets',
  templateUrl: './all-event-sets.component.html',
  styleUrls: ['./all-event-sets.component.scss']
})
export class AllEventSetsComponent implements OnInit {

  upcomingEventSets: any[];
  curWeekEventSets: any[];
  curMonthEventSets: any[];

  constructor(private router: Router
    , private modalService: NgbModal
    , private eventsService: EventsService) { }

  ngOnInit() {
    this.upcomingEventSets = this.eventsService.upcomingEvents;
    this.curWeekEventSets = this.eventsService.lastWeek;
    this.curMonthEventSets = this.eventsService.lastMonth;
    console.log('Upcoming Event Sets : ', this.upcomingEventSets);
    console.log('Last Week Event Sets : ', this.curWeekEventSets);
    console.log('Last Month Event Sets : ', this.curMonthEventSets);
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
    const modalRef = this.modalService.open(CreateEventHomeComponent, { centered: true, windowClass: 'create-event-modal' });
    modalRef.componentInstance.name = 'World';
  }

  formatTime(ts, type) {
    if (ts != null) {
      ts = ts.substring(0, 10) + ' ' + ts.substring(11, 16) + ':00';
      console.log('date : ', ts);
      if (type == 't')
        return moment(ts).format("hh:mm A");
      else if (type == 'd')
        return moment(ts).format("Do MMM, YYYY");
    }
  }

  getStatus(statusId) {
    console.log('status : ', statusId);
    if (statusId == 'Created') {
      return 'Published';
    }
    if (statusId == 'Partially Published') {
      return 'Partially Published';
    }
  }
}
