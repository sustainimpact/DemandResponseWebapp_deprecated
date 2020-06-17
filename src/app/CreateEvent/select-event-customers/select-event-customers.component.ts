import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import {
  EventSetCustomersComponent, PublishEventModalComponent,
  RejectBidModalComponent
} from 'src/app/pop-up-pages/pop-up-pages.component';
import { AllEventSets } from 'src/app/DataModels/AllEventSets';
import { AllEvents } from 'src/app/DataModels/AllEvents';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { CustomerService } from 'src/app/services/customer.service';
import * as XLSX from 'xlsx'
import { BreadcrumbItem } from 'src/app/common/breadcrumb/breadcrumb.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-select-event-customers',
  templateUrl: './select-event-customers.component.html',
  styleUrls: ['./select-event-customers.component.scss']
})
export class SelectEventCustomersComponent implements OnInit {

  breadcrumbItems: BreadcrumbItem[] = [];

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
  reportTable = [];
  totalSuccIndex = 0;
  leftTime = 0;

  constructor(private modalService: NgbModal
    , private router: Router
    , private route: ActivatedRoute
    , private eventsService: EventsService
    , private customerService: CustomerService
    , private location: Location) { }

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
      this.buildBreadcrumb();
      this.getEventOverview();
      this.getCustomers();
    });
  }

  buildBreadcrumb() {
    this.breadcrumbItems.push(new BreadcrumbItem('Event Sets', '../../main'));
    this.breadcrumbItems.push(new BreadcrumbItem('Events', '../../createeventdetails'));
    this.breadcrumbItems.push(new BreadcrumbItem('Event Details', ''));
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


      // //timer code
      this.leftTime = moment(this.eventOverview.endTime).diff(moment(), 'seconds');

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
    this.reportTable = [];
    let reportTabEl = { sucessIndex: "", effCost: 0, cost: 0, penalty: 0, userName: "", commitments: 0, actualPower: 0, shortfall: 0, incentive: 0 };
    this.customerList.forEach(customer => {
      let reportTabEl = { sucessIndex: "", effCost: 0, cost: 0, penalty: 0, userName: "", commitments: 0, actualPower: 0, shortfall: 0, incentive: 0 };
      reportTabEl.userName = customer.userName;
      reportTabEl.commitments = customer.commitments;
      reportTabEl.actualPower = customer.actualPower;
      reportTabEl.shortfall = customer.commitments - customer.actualPower;
      reportTabEl.incentive = customer.price;
      reportTabEl.cost = (customer.price * customer.actualPower) / 4;
      reportTabEl.penalty = (reportTabEl.shortfall * (customer.price) * 1.2) / 4;
      reportTabEl.effCost = reportTabEl.cost - reportTabEl.penalty;
      this.totalCommittedPower += +customer.commitments;
      this.totalActualPower += +customer.actualPower;
      if (customer.actualPower >= customer.commitments) {
        reportTabEl.sucessIndex = "TRUE";
      } else {
        reportTabEl.sucessIndex = "FALSE";
      }
      this.reportTable.push(reportTabEl);
    });
    this.totalSuccIndex = this.getTotalSuccessIndex();
  }

  getTotalCost() {
    let totCost = 0;
    this.reportTable.forEach((el) => {
      totCost += el.cost;
    })
  }

  getTotalPenalty() {
    let totCost = 0;
    this.reportTable.forEach((el) => {
      totCost += el.penalty;
    })
  }


  getTotalEffCost() {
    let totCost = 0;
    this.reportTable.forEach((el) => {
      totCost += el.effCost;
    })
  }
  getTotalSuccessIndex() {
    let trueCount = 0;
    let totalCount = 0;
    this.reportTable.forEach((el) => {
      if (el.sucessIndex == "TRUE")
        trueCount++
      totalCount++;
    });
    return trueCount / totalCount;
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

  // publishEvents() {
  //   this.updateCustomers().then((res) => {
  //     this.eventsService.publishEvents(this.selectedEvents, this.eventSetId).subscribe((res) => {
  //       this.resFromServer = res;
  //       if (this.resFromServer != null) {
  //         if (this.resFromServer.responseStatus == 1) {
  //           console.log('Events Published');
  //         }
  //       }
  //     });
  //   });
  // }

  formatTime(ts, type) {
    ts = ts.substring(0, 10) + ' ' + ts.substring(11, 16) + ':00';
    //console.log('date : ', ts);
    if (type == 't')
      return moment(ts).format("hh:mm A");
    else if (type == 'd')
      return moment(ts).format("Do MMM, YYYY");
  }

  cancelEvent() {
    const modalRef = this.modalService.open(RejectBidModalComponent, { centered: true });
    modalRef.componentInstance.eventId = this.eventId;
    modalRef.componentInstance.eventName = this.eventName;
    modalRef.componentInstance.eventSetId = this.eventSetId;
    modalRef.result.then((result) => { },
      (reason) => {
        console.log('reason : ', reason);
        if (reason == 1) {
          //this.refreshCustomerDetails();
          this.location.back();
        }
      });
  }

  rejectCustomer(customerId) {
    this.customerService.rejectCustomer(this.eventId, this.eventSetId, customerId).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null) {
        this.response = this.resFromServer.response;
        if (this.response != null) {
          if (this.response.responseStatus == 1) {
            this.refreshCustomerDetails();
          }
        }
      }
    });
  }

  /* below function is just for testing - to be removed once counter bid buttons are available */

  acceptCounterBid(customerId) {
    this.customerService.acceptCounterBid(this.eventId, this.eventSetId, customerId).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null) {
        if (this.response = this.resFromServer.response) {
          if (this.response != null) {
            if (this.response.responseStatus == 1) {
              this.refreshCustomerDetails();
            }
          }
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
        //this.rejectCustomer(this.selectedCustomer.userId);
        this.customerService.rejectCustomer(this.eventId, this.eventSetId, this.selectedCustomer.userId)
          .subscribe((res) => {
            this.resFromServer = res;
            if (this.resFromServer != null) {
              this.response = this.resFromServer.response;
              if (this.response != null) {
                if (this.response.responseStatus == 1) {
                  this.refreshCustomerDetails();
                }
              }
            }
          });
      }
    }
    else if (status == '1') {
      //No acion needed since customer is already in Participated state
    }
  }

  searchCustomers() {
    this.customerList = this.customerListBkp;
    if (this.searchCustomer == '') {
      this.customerList = this.customerListBkp;
    }
    else {
      this.customerList = this.customerList.filter(customer =>
        this.searchMatchesWithCustomerName(customer.userName, this.searchCustomer));
    }
  }

  searchMatchesWithCustomerName(customerName: string, expression: string) {
    if (customerName.toLowerCase().includes(expression.toLowerCase())) {
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

  refreshCustomerDetails() {
    this.getEventOverview();
    this.getCustomers();
  }

  getPenaltyCusCount() {
    let count = 0;
    this.customerList.forEach((cus) => {
      if (cus.isFineApplicable == 'Y')
        count++
    });
    return count;
  }
}
