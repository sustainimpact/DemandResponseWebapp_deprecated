import { Component, OnInit,ViewEncapsulation, Input  } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AllEvents } from 'src/app/DataModels/AllEvents';
import { EventsService } from 'src/app/services/events.service';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-pop-up-pages',
  templateUrl: './pop-up-pages.component.html',
  styleUrls: ['./pop-up-pages.component.scss'],

})
export class PopUpPagesComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openPublishEvent() {
    const modalRef = this.modalService.open(PublishEventModalComponent ,{centered: true });
    modalRef.componentInstance.name = 'World';
  }

  openEventSetCustomer() {
    const modalRef = this.modalService.open(EventSetCustomersComponent ,{centered: true });
    modalRef.componentInstance.name = 'World';
  }

  openVersionHistory() {
    const modalRef = this.modalService.open(VersionHistoryComponent ,{centered: true });
    modalRef.componentInstance.name = 'World';
  }

  openDownloadReports() {
    const modalRef = this.modalService.open(DownloadReportsModalComponent ,{centered: true });
    modalRef.componentInstance.name = 'World';
  }

  openAcceptBid() {
    const modalRef = this.modalService.open(AcceptBidModalComponent ,{centered: true });
    modalRef.componentInstance.name = 'World';
  }

  openRejectBidModal() {
    const modalRef = this.modalService.open(RejectBidModalComponent ,{centered: true });
    modalRef.componentInstance.name = 'World';
  }

  addCustomerModalTI()
  {
    const modalRef = this.modalService.open(AddCustomerModalTIComponent ,{ size: 'lg',centered: true }  );
    modalRef.componentInstance.name = 'World';
  } 
  addCustomerModalGI() {
    const modalRef = this.modalService.open(AddCustomerModalGIComponent ,{ size: 'lg',centered: true });
    modalRef.componentInstance.name = 'World';
  }
  addCustomerModalER() {
    const modalRef = this.modalService.open(AddCustomerModalERComponent ,{ size: 'lg',centered: true });
    modalRef.componentInstance.name = 'World';
  }
  AddCustomerBulk() {
    const modalRef = this.modalService.open(AddCustomerBulkComponent ,{ size: 'lg',centered: true });
    modalRef.componentInstance.name = 'World';
  }
}




@Component({
  selector: 'app-publish-event-modal',
  templateUrl: '../Modals/publish-event-modal/publish-event-modal.component.html',
  styleUrls: ['../Modals/publish-event-modal/publish-event-modal.component.scss']
})
export class PublishEventModalComponent implements OnInit {

  @Input() public eventSetId;
  @Input() public eventType;
  events: AllEvents[]=[];
  eventDetails: any;
  numberOfEvents: number;
  selectedEvents: any[] = [];
  resFromServer: any;

  constructor(public activeModal: NgbActiveModal
    , private eventsService: EventsService) {}

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

  publishEvents() {
    this.eventsService.publishEvents(this.selectedEvents, this.eventSetId).subscribe((res) => {
      this.resFromServer = res;
      if(this.resFromServer != null) {
        if(this.resFromServer.responseStatus==1) {
          console.log('Events Published');
        }
      }
    });
    this.activeModal.close();
  }
}

@Component({
  selector: 'app-event-set-customers',
  templateUrl: '../CreateEvent/event-set-customers/event-set-customers.component.html',
  styleUrls: ['../CreateEvent/event-set-customers/event-set-customers.component.scss']
})
export class EventSetCustomersComponent implements OnInit {

  @Input() public eventSetId;
  @Input() public eventType;
  events: AllEvents[]=[];
  eventDetails: any;
  numberOfEvents: number;
  selectedEvents: any[] = [];
  selectedCustomers: any[] = [];
  customerList: any[];
  resFromServer: any;
  response: any;


  constructor(public activeModal: NgbActiveModal
    , private eventsService: EventsService
    , private customerService: CustomerService) { }

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
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers(this.selectedEvents).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null) {
        if (this.resFromServer.response != null) {
          if (this.resFromServer.response.responseStatus == 1) {
            if (this.resFromServer.response.response != null) {
              this.customerList = this.resFromServer.response.response.customers;
              console.log('Customer List : ', this.customerList);
              this.customerList.forEach(customer => {
                customer.isSelected = false;
              })
            }
          }
        }
      }
    });
  }

  selectCustomer(userId) {
    this.customerList.forEach(customer => {
        if(customer.userId==userId) {
          if(customer.isSelected) {
            customer.isSelected=false;
          }
          else {
            customer.isSelected=true;
          }
        }
    });
  }

  getSelectedCustomers() {
    this.customerList.forEach(customer => {
      if (customer.isSelected) {
        this.selectedCustomers.push(customer.userId);
      }
    });
  }

  updateCustomers() {
    this.getSelectedCustomers();
    this.customerService.updateCustomers(this.selectedEvents, this.selectedCustomers).subscribe((res) => {
      this.resFromServer = res;
      if(this.resFromServer != null) {
        if(this.resFromServer.responseStatus == 1) {
          console.log('Customers Updated');
        }
      }
    });
    this.activeModal.close();
  }
}
@Component({
  selector: 'app-version-history',
  templateUrl: '../CreateEvent/version-history/version-history.component.html',
  styleUrls: ['../CreateEvent/version-history/version-history.component.scss']
})
export class VersionHistoryComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-download-reports-modal',
  templateUrl: '../Modals/download-reports-modal/download-reports-modal.component.html',
  styleUrls: ['../Modals/download-reports-modal/download-reports-modal.component.scss']
})
export class DownloadReportsModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-accept-bid-modal',
  templateUrl: '../Modals/accept-bid-modal/accept-bid-modal.component.html',
  styleUrls: ['../Modals/accept-bid-modal/accept-bid-modal.component.scss']
})
export class AcceptBidModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-reject-bid-modal',
  templateUrl: '../Modals/reject-bid-modal/reject-bid-modal.component.html',
  styleUrls: ['../Modals/reject-bid-modal/reject-bid-modal.component.scss']
})
export class RejectBidModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-add-customer-modal-ti',
  templateUrl: '../Modals/add-customer-modal-ti/add-customer-modal-ti.component.html',
  styleUrls: ['../Modals/add-customer-modal-ti/add-customer-modal-ti.component.scss']
})
export class AddCustomerModalTIComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-add-customer-modal-gi',
  templateUrl: '../Modals/add-customer-modal-gi/add-customer-modal-gi.component.html',
  styleUrls: ['../Modals/add-customer-modal-gi/add-customer-modal-gi.component.scss']
})
export class AddCustomerModalGIComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
@Component({
  selector: 'app-add-customer-modal-er',
  templateUrl: '../Modals/add-customer-modal-er/add-customer-modal-er.component.html',
  styleUrls: ['../Modals/add-customer-modal-er/add-customer-modal-er.component.scss']
})
export class AddCustomerModalERComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
@Component({
  selector: 'app-add-customer-bulk',
  templateUrl: '../Modals/add-customer-bulk/add-customer-bulk.component.html',
  styleUrls: ['../Modals/add-customer-bulk/add-customer-bulk.component.scss']
})
export class AddCustomerBulkComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}