import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { EventSetCustomersComponent, PublishEventModalComponent } from 'src/app/pop-up-pages/pop-up-pages.component';
import { AllEventSets } from 'src/app/DataModels/AllEventSets';
import { AllEvents } from 'src/app/DataModels/AllEvents';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-select-event-customers',
  templateUrl: './select-event-customers.component.html',
  styleUrls: ['./select-event-customers.component.scss']
})
export class SelectEventCustomersComponent implements OnInit {

  eventOverviewList: any[];
  eventOverview: any = {};

  event: any;
  eventId: any[] = [];
  eventName;
  eventSetId;
  startTime;
  endTime;
  plannedPower;
  committedPower;
  actualPower;
  shortfall;
  price;
  numberOfCustomers;
  status;

  innerHeight: any = 0;

  events: AllEvents[] = [];
  eventDetails: any;
  numberOfEvents: number;
  selectedEvents: any[] = [];
  selectedCustomers: any[] = [];
  customerList: any[];
  resFromServer: any;
  response: any;

  totalCommittedPower: number;
  totalActualPower: number;

  constructor(private modalService: NgbModal
    , private router: Router
    , private route: ActivatedRoute
    , private eventsService: EventsService
    , private customerService: CustomerService) { }

  ngOnInit() {
    this.innerHeight = Number(window.innerHeight) - 210;
    this.route.queryParams.subscribe(params => {
      this.event = params['event'];
      this.eventSetId = params['eventSetId'];
      this.eventId = params['eventId'];
      this.eventName = params['eventName'];
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
      this.plannedPower = params['plannedPower'];
      this.committedPower = params['committedPower'];
      this.actualPower = params['actualPower'];
      this.shortfall = params['shortfall'];
      this.price = params['price'];
      this.numberOfCustomers = params['numberOfCustomers'];
      this.status = params['status'];

      this.selectedEvents.push(+this.eventId);
      this.getEventOverview();
      this.getCustomers();
    });
  }

  getEventOverview() {
    this.eventsService.getEventOverview(this.selectedEvents, this.eventSetId).subscribe((res) => {
      this.resFromServer = res;
      console.log('Overview Response : ', this.resFromServer);
      if (this.resFromServer != null) {
        if (this.resFromServer.response != null) {
          if (this.resFromServer.response.responseStatus == 1) {
            this.eventOverviewList = this.resFromServer.response.response;
            if (this.eventOverviewList != null) {
              this.eventOverview = this.eventOverviewList[0];
            }
            console.log('Event Overview : ', this.eventOverviewList);
          }
        }
      }
    });
  }

  getCustomers() {
    console.log('Get Customers');
    this.customerService.getCustomers(this.selectedEvents).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null) {
        if (this.resFromServer.response != null) {
          if (this.resFromServer.response.responseStatus == 1) {
            if (this.resFromServer.response.response != null) {
              this.customerList = this.resFromServer.response.response.customers;
              this.customerList.forEach(customer => {
                customer.isSelected = false;
              })
            }
          }
        }
      }
    });
  }

  calculateEventDetails() {
    this.customerList.forEach(customer => {
      this.totalCommittedPower += customer.commitments;
      this.totalActualPower += customer.totalActualPower;
    });
  }

  selectCustomer(customerId) {
    this.customerList.forEach(customer => {
      if (customer.customerId == customerId) {
        if (customer.isSelected) {
          customer.isSelected = false;
        }
        else {
          customer.isSelected = true;
        }
      }
    });
  }

  getSelectedCustomers() {
    this.customerList.forEach(customer => {
      if (customer.isSelected) {
        this.selectedCustomers.push(customer.customerId);
      }
    });
  }

  async updateCustomers() {
    this.getSelectedCustomers();
    this.customerService.updateCustomers(this.selectedEvents, this.selectedCustomers).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null) {
        if (this.resFromServer.responseStatus == 1) {
          console.log('Customers Updated');
        }
      }
    });
  }

  publishEvents() {
    this.updateCustomers().then((res) => {
      this.eventsService.publishEvents(this.selectedEvents, this.eventSetId).subscribe((res) => {
        this.resFromServer = res;
        if (this.resFromServer != null) {
          if (this.resFromServer.responseStatus == 1) {
            console.log('Events Published');
          }
        }
      });
    });
  }

  formatTime(ts, type) {
    ts = ts.substring(0, 10) + ' ' + ts.substring(11, 16) + ':00';
    console.log('date : ', ts);
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if (type == 'd')
      return moment(ts).format("Do MMM, YYYY");
  }

  btnToggle(i, flag) {
    if (!flag)
      document.getElementById("dd" + i).classList.toggle("show");
  }

  onConfirm(i, status) {
    document.getElementById("dd" + i).classList.remove("show");
    console.log(i, status);

  }
}
