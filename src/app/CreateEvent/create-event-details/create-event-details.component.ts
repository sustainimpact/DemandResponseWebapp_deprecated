import { Component, ViewEncapsulation, OnInit, EventEmitter, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { EventSetCustomersComponent, PublishEventModalComponent } from 'src/app/pop-up-pages/pop-up-pages.component';
import { AllEventSets } from 'src/app/DataModels/AllEventSets';
import { AllEvents } from 'src/app/DataModels/AllEvents';
import { EventsService } from 'src/app/services/events.service';
import { CustomerService } from 'src/app/services/customer.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';



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

  selectedEvents: any[] = [];

  //events: AllEvents[] = [];
  events: any[] = [];
  eventsBkp: any[] = [];
  eventDetails: any;

  innerHeight: any = 0;
  eventSetName: string;
  eventSetId: number;
  eventType: string;

  totalPlannedQuantity: number = 0.0;
  totalCommitments: number = 0.0;
  totalShortfall: number = 0.0;
  totalActualQuantity: number = 0;
  totalPrice: number = 0;
  totalCustomers: number = 0;

  isRowSelected: boolean = false;
  isExcludedZeroSelected: boolean = false;

  resFromServer: any;
  response: any;
  isPublishable = false;
  isCustomerEditable = false;
  tooltipText = "No Selected Events";
  customerTooltipText = "No Selected Events";
  noEventsSelected = true;
  constructor(private modalService: NgbModal
    , private router: Router
    , private route: ActivatedRoute
    , private eventsService: EventsService
    , private customerService: CustomerService) { }

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
      this.eventSetName = params['eventSetName'];
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
    this.eventsService.getEvents(+this.eventSetId).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null) {
        this.response = this.resFromServer.response;
        if (this.response != null) {
          this.eventDetails = this.response.response;
          if (this.eventDetails != null) {
            this.events = this.eventDetails.events;
            this.eventsService.events = this.events;
            console.log('events : ', this.events);
            this.calculateEventDetails();
          }
        }
      }
    });

    // this.eventDetails = this.eventsService.getEventsFromLocal(this.eventType, this.eventSetId);
    // console.log('Event Details : ' , this.eventDetails);
    // if(this.eventDetails != null) {
    //   this.eventSetName = this.eventDetails.eventSetName;
    //   this.events = this.eventDetails.events;
    // }
  }

  calculateEventDetails() {
    this.totalPlannedQuantity = 0.0;
    this.totalCommitments = 0;
    this.totalShortfall = 0;
    this.totalActualQuantity = 0;
    this.totalPrice = 0;
    this.totalCustomers = 0;
    this.events.forEach(event => {
      this.totalPlannedQuantity += +event.plannedPower;
      this.totalCommitments += +event.committedPower;
      //this.totalShortfall+=((+event.plannedPower)-(+event.committedPower));
      this.totalShortfall += +event.shortfall;
      this.totalActualQuantity += +event.actualPower;
      this.totalPrice = +event.price;
      this.totalCustomers = +event.numberOfCustomers;
    });
  }

  openEventsOverview() {
    this.getSelectedEvents();
    const modalRef = this.modalService.open(EventOverviewComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.eventSetId = this.eventSetId;
    modalRef.componentInstance.eventType = this.eventType;
    modalRef.componentInstance.selectedEvents = this.selectedEvents;
  }

  openEventDetails(event: any) {
    console.log("Edit customers : ", event);
    this.router.navigate(['/main/selecteventcustomers'], {
      queryParams: {
        event: event,
        eventId: event.eventId,
        eventName: event.eventName,
        eventSetId: this.eventSetId,
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
    this.getSelectedEvents();
    const modalRef = this.modalService.open(EventSetCustomersComponent, { centered: true });
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.eventSetId = this.eventSetId;
    modalRef.componentInstance.eventType = this.eventType;
    modalRef.componentInstance.selectedEvents = this.selectedEvents;
  }

  publishEvents() {
    this.getSelectedEvents();
    const modalRef = this.modalService.open(PublishEventModalComponent, { centered: true });
    modalRef.componentInstance.eventSetId = this.eventSetId;
    modalRef.componentInstance.eventType = this.eventType;
    modalRef.componentInstance.selectedEvents = this.selectedEvents;
  }
  checkForPublished() {
    let i, count = 0;
    for (i = 0; i < this.events.length; i++) {
      if (this.events[i].isSelected)
        count++;
      if (this.events[i].eventStatus != "Created" && this.events[i].isSelected) {
        this.isPublishable = false;
        this.tooltipText = "Selection contains published events";
        break;
      }
    } if (count == 0) {
      this.isPublishable = false;
      this.tooltipText = "No Selected Events";
    }
    else if (i == this.events.length) {
      this.isPublishable = true;
      this.tooltipText = "";
    }
  }

  checkCustomerEditable() {
    let i, count = 0;
    for (i = 0; i < this.events.length; i++) {
      if (this.events[i].isSelected) {
        this.noEventsSelected = false;
        count++;
      }

      if (!(this.events[i].eventStatus == "Created" || this.events[i].eventStatus == "Published") && this.events[i].isSelected) {
        this.isCustomerEditable = false;
        this.customerTooltipText = "Customers cannot be updated for one or more of selected events";
        break;
      }
    } if (count == 0) {
      this.noEventsSelected = true;
      this.isCustomerEditable = false;
      this.customerTooltipText = "No Selected Events";
    }
    else if (i == this.events.length) {
      this.isCustomerEditable = true;
      this.customerTooltipText = "";
    }

  }

  getShortfall(plannedPower: number, committedPower: number) {
    return plannedPower - committedPower;
  }

  formatTime(ts, type) {
    if (ts != null) {
      ts = ts.substring(0, 10) + ' ' + ts.substring(11, 16) + ':00';
      //console.log('date : ', ts);
      if (type == 't')
        return moment(ts).format("HH:mm");
      else if (type == 'd')
        return moment(ts).format("Do MMM, YYYY");
    }
  }

  changeAllEventSelection(value) {
    if (this.events && this.events.length > 0) {
      if (value) {
        this.events.map((e) => e.isSelected = true);
        this.isRowSelected = true;
      } else {
        this.events.map((e) => e.isSelected = false);
        this.isRowSelected = false;
      }
    }
  }

  selectEvent(eventId) {
    this.events.forEach(event => {
      if (event.eventId == eventId) {
        event.isSelected = (event.isSelected) ? false : true;
      }
    });
    const selectedEvent = this.events.find((e) => e.isSelected === true);
    this.isRowSelected = (selectedEvent) ? true : false;
    this.eventsService.events = this.events;
    this.checkForPublished();
    this.checkCustomerEditable();
  }

  getSelectedEvents() {
    this.selectedEvents = [];
    this.events.forEach(event => {
      if (event.isSelected) {
        this.selectedEvents.push(event.eventId);
      }
    });
  }

  excludeZero() {
    if (this.isExcludedZeroSelected) {
      this.eventsBkp = this.events;
      this.events = this.events.filter(event => +event.plannedPower != 0);
    }
    else {
      this.events = this.eventsBkp;
      this.eventsBkp = [];
    }
    this.calculateEventDetails();
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
    , private eventsService: EventsService
    , private toastr: ToastrService) { }

  @Input() public eventSetId;
  @Input() public eventType;
  @Input() public selectedEvents;
  eventOverviewList: any[];
  events: AllEvents[] = [];
  eventDetails: any;
  numberOfEvents: number;
  //selectedEvents: any[] = [];
  selectedCustomers: any[];
  customerList: any[];
  resFromServer: any;
  response: any;

  ngOnInit() {
    // this.eventDetails = this.eventsService.getEvents(this.eventType, this.eventSetId);
    // if(this.eventDetails != null) {
    //   this.events = this.eventDetails.events;
    //   this.events = this.events.filter(event => event.isSelected);
    //   this.numberOfEvents = this.events.length;
    //   this.events.forEach(event => {
    //     if (event.isSelected) {
    //       this.selectedEvents.push(event.eventId);
    //     }
    //   });
    // }
    this.getEventOverview();
  }

  getEventOverview() {
    this.eventsService.getEventOverview(this.selectedEvents, this.eventSetId).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null) {
        if (this.resFromServer.response != null) {
          if (this.resFromServer.response.responseStatus == 1) {
            this.eventOverviewList = this.resFromServer.response.response;
            console.log('Event Overview : ', this.eventOverviewList);
          }
        }
      }
    });
  }

  formatTime(ts, type) {
    ts = ts.substring(0, 10) + ' ' + ts.substring(11, 16) + ':00';
    //console.log('date : ', ts);
    if (type == 't')
      return moment(ts).format("hh:mm");
    else if (type == 'd')
      return moment(ts).format("Do MMM, YYYY");
  }


  upcomingFunctionality() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">This is an upcoming functionality</span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-info alert-with-icon",
        positionClass: "toast-bottom-right"
      }
    );
  }
}
