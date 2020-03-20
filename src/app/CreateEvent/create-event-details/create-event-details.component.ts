import { Component, ViewEncapsulation, OnInit, EventEmitter, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { EventSetCustomersComponent, PublishEventModalComponent } from 'src/app/pop-up-pages/pop-up-pages.component';
import { AllEventSets } from 'src/app/DataModels/AllEventSets';
import { AllEvents } from 'src/app/DataModels/AllEvents';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';



@Component({
  selector: 'app-create-event-details',
  templateUrl: './create-event-details.component.html',
  styleUrls: ['./create-event-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateEventDetailsComponent implements OnInit {
  upcomingEventSets: AllEventSets[];
  curWeekEventSets: AllEventSets[];
  curMonthEventSets: AllEventSets[];

  selectedEvents: any[];

  events: AllEvents[] = [];
  eventDetails: any;

  innerHeight: any = 0;
  eventSetName: string;
  eventSetId: number;
  eventType: string;

  totalPlannedQuantity: number=0;
  totalCommitments: number=0;
  totalShortfall: number=0;
  totalActualQuantity: number=0;

  isRowSelected: boolean=false;

  constructor(private modalService: NgbModal
    , private router: Router
    , private route: ActivatedRoute
    , private eventsService: EventsService) { }

  ngOnInit() {
    this.innerHeight = Number(window.innerHeight) - 240;
    // this.upcomingEventSets = this.eventsService.upcomingEventSets;
    // this.curWeekEventSets = this.eventsService.curWeekEventSets;
    // this.curMonthEventSets = this.eventsService.curMonthEventSets;

    this.upcomingEventSets = this.eventsService.upcomingEvents;
    this.curWeekEventSets = this.eventsService.lastWeek;
    this.curMonthEventSets = this.eventsService.lastMonth;

    this.route.queryParams.subscribe(params => {
      this.eventSetId = params['eventSetId'];
      this.eventType = params['eventType'];
    });
    this.getEvents();
  }

  // getEvents() {
  //   if(this.eventType=='upcoming') {
  //     this.upcomingEventSets.forEach(eventSet => {
  //       if(eventSet.eventSetId==this.eventSetId) {
  //         this.eventSetName=eventSet.name;
  //         this.events=eventSet.events;
  //       }
  //     });
  //   }
  //   if(this.eventType=='curWeek') {
  //     this.curWeekEventSets.forEach(eventSet => {
  //       if(eventSet.eventSetId==this.eventSetId) {
  //         this.eventSetName=eventSet.name;
  //         this.events=eventSet.events;
  //       }
  //     });
  //   }
  //   if(this.eventType=='curMonth') {
  //     this.curMonthEventSets.forEach(eventSet => {
  //       if(eventSet.eventSetId==this.eventSetId) {
  //         this.eventSetName=eventSet.name;
  //         this.events=eventSet.events;
  //       }
  //     });
  //   }
  //   this.calculateEventDetails();
  // }

  getEvents() {
    this.eventDetails = this.eventsService.getEvents(this.eventType, this.eventSetId);
    if(this.eventDetails != null) {
      this.eventSetName = this.eventDetails.eventSetName;
      this.events = this.eventDetails.events;
    }
    this.calculateEventDetails();
  }

  calculateEventDetails() {
    this.events.forEach(event => {
      this.totalPlannedQuantity+=event.plannedPower;
      this.totalCommitments+=event.committedPower;
      this.totalShortfall+=(event.plannedPower-event.committedPower);
      this.totalActualQuantity+=event.actualPower;
    });
  }

  openEventsOverview() {
    const modalRef = this.modalService.open(EventOverviewComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.name = 'World';
  }
  
  openEventDetails(event: any) {
    console.log("Edit customers");
    this.router.navigate(['/main/selecteventcustomers'], {
      queryParams: {
        eventId: event.eventId,
        eventName: event.eventName,
        eventSetId: event.eventSetId,
        startTime: event.startTime,
        endTime: event.endTime,
        plannedPower: event.plannedPower,
        committedPower: event.committedPower,
        actualPower: event.actualPower,
        shortfall: event.shortfall,
        price: event.price,
        numberOfCustomers: event.numberOfCustomers,
        status: event.status
      }
    });
  }

  editCustomers() {
    const modalRef = this.modalService.open(EventSetCustomersComponent, { centered: true });
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.eventSetId = this.eventSetId;
    modalRef.componentInstance.eventType = this.eventType;
  }

  publishEvents() {
    this.getSelectedEvents();
    const modalRef = this.modalService.open(PublishEventModalComponent ,{centered: true });
    modalRef.componentInstance.eventSetId = this.eventSetId;
    modalRef.componentInstance.eventType = this.eventType;
    modalRef.componentInstance.eventsToPublish = this.selectedEvents;
  }

  getShortfall(plannedPower: number, committedPower: number) {
    return plannedPower-committedPower;
  }

  formatTime(ts, type) {
    ts=ts.substring(0, 10) + ' ' + ts.substring(11, 16) + ':00';
    //console.log('date : ', ts);
    if (type == 't')
      return moment(ts).format("hh:mm");
    else if (type == 'd')
      return moment(ts).format("Do MMM, YYYY");
  }

  selectEvent(eventId) {
    this.events.forEach(event => {
        if(event.eventId==eventId) {
          if(event.isSelected) {
            event.isSelected=false;
          }
          else {
            event.isSelected=true;
          }
        }
    });
  }

  getSelectedEvents() {
    this.events.forEach(event => {
      if (event.isSelected) {
        this.selectedEvents.push(event.eventId);
      }
    });
  }
}

@Component({
  selector: 'app-event-overview',
  templateUrl: '../event-overview/event-overview.component.html',
  styleUrls: ['../event-overview/event-overview.component.scss']
})
export class EventOverviewComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal
    , private router: Router
    , private route: ActivatedRoute
    , private eventsService: EventsService) { }

  @Input() public eventSetId;
  @Input() public eventType;
  eventOverviewList: any[];
  events: AllEvents[]=[];
  eventDetails: any;
  numberOfEvents: number;
  selectedEvents: any[];
  selectedCustomers: any[];
  customerList: any[];
  resFromServer: any;
  response: any;

  ngOnInit() {
    this.eventDetails = this.eventsService.getEvents(this.eventType, this.eventSetId);
    if(this.eventDetails != null) {
      this.events = this.eventDetails.events;
      this.events = this.events.filter(event => event.isSelected);
      this.numberOfEvents = this.events.length;
      this.events.forEach(event => {
        if (event.isSelected) {
          this.selectedEvents.push(event.eventId);
        }
      });
    }
  }

  getEventOverview() {
    this.eventsService.getEventOverview(this.selectedEvents, this.eventSetId).subscribe((res) => {
      this.resFromServer = res;
      if(this.resFromServer != null) {
        if(this.resFromServer.responseStatus==1) {
          this.response = this.resFromServer.response;
          if(this.response!=null) {
            this.eventOverviewList=this.response;
          }
        }
      }
    });
  }

  formatTime(ts, type) {
    ts=ts.substring(0, 10) + ' ' + ts.substring(11, 16) + ':00';
    //console.log('date : ', ts);
    if (type == 't')
      return moment(ts).format("hh:mm");
    else if (type == 'd')
      return moment(ts).format("Do MMM, YYYY");
  }
}
