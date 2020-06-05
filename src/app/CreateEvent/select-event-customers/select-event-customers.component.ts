import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { EventSetCustomersComponent, PublishEventModalComponent } from 'src/app/pop-up-pages/pop-up-pages.component';
import { AllEventSets } from 'src/app/DataModels/AllEventSets';
import { AllEvents } from 'src/app/DataModels/AllEvents';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { CustomerService } from 'src/app/services/customer.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-select-event-customers',
  templateUrl: './select-event-customers.component.html',
  styleUrls: ['./select-event-customers.component.scss']
})
export class SelectEventCustomersComponent implements OnInit {

  eventOverviewList: any[];
  //eventOverview = { invitedCustomers: "", participatedCustomers: "", counterBidCustomers: "", noResponseCustomers: "" };
  eventOverview: any;
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
  eventStatus: any;
  eventDetails: any;
  numberOfEvents: number;
  selectedEvents: any[] = [];
  selectedCustomers: any[] = [];
  selectedCustomer: any;
  customerList: any[];
  customerListBkp: any[];
  resFromServer: any;
  response: any;
  searchCustomer: any;
  totalCommittedPower: number = 0;
  totalActualPower: number = 0;
  timerDisplay;
  interval;

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
              if (this.eventOverview != null) {
                this.eventStatus = this.eventOverview.eventStatus;
                console.log("Event Status : ", this.eventStatus);
              }
            }
            console.log('Event Overview : ', this.eventOverviewList);
          }
        }
      }


      //timer code
      var start = moment(this.eventOverview.endTime);
      var seconds = start.minutes() * 60;
      this.interval = setInterval(() => {
        this.timerDisplay = start.subtract(1, "second").format("hh:mm:ss");
        seconds--;
        if (seconds === 0) clearInterval(this.interval);
      }, 1000);
    });
  }

  getCustomers() {
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
              console.log('Get Customers : ', this.customerList);
              this.customerListBkp = this.customerList;
            }
          }
        }
      }
      this.calculateEventDetails();
    });
  }

  calculateEventDetails() {
    this.customerList.forEach(customer => {
      this.totalCommittedPower += +customer.commitments;
      this.totalActualPower += +customer.actualPower;
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
    //console.log('date : ', ts);
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if (type == 'd')
      return moment(ts).format("Do MMM, YYYY");
  }

  cancelEvent() {
    this.eventsService.cancelEvent(this.eventId, this.eventSetId).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null) {
        if (this.resFromServer.responseStatus == 1) {
          console.log('Event Cancelled');
        }
      }
    });
  }

  rejectCustomer(customerId) {
    this.customerService.rejectCustomer(this.eventId, this.eventSetId, customerId).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null) {
        if (this.resFromServer.responseStatus == 1) {
          console.log('Customer Rejected');
        }
      }
    });
  }

  /* below function is just for testing - to be removed once counter bid buttons are available */

  acceptCounterBid(customerId) {
    this.customerService.acceptCounterBid(this.eventId, this.eventSetId, customerId).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null) {
        if (this.resFromServer.responseStatus == 1) {
          console.log('Counter Bid Accepted');
        }
      }
    });
  }

  btnToggle(i, flag) {
    if (!flag)
      document.getElementById("dd" + i).classList.toggle("show");
  }

  onConfirm(i, status) {
    document.getElementById("dd" + i).classList.remove("show");
    this.selectedCustomer = this.customerList[i];
    console.log(i, status);
    if (status == '0') {
      if (this.selectedCustomer != null) {
        this.rejectCustomer(this.selectedCustomer.userId);
      }
    }
    if (status == '1') {
      //No acion needed since customer is already in Participated state
    }
  }

  searchCustomers() {
    if (this.searchCustomer == '') {
      this.customerList = this.customerListBkp;
    }
    else {
      this.customerList = this.customerList.filter(customer =>
        this.searchMatchesWithCustomerName(customer.userName, this.searchCustomer));
    }
  }

  searchMatchesWithCustomerName(customerName: string, expression: string) {
    if (customerName.includes(expression)) {
      return true;
    }
    else {
      return false;
    }
  }

  exportExcel() {
    /* table id is passed over here */
    let element = document.getElementById('dr-events-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Summary of DR event set');

    /* save to file */
    XLSX.writeFile(wb, this.eventName + ".xlsx");
  }
}
