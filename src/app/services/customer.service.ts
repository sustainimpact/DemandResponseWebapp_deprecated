import { Injectable } from '@angular/core';
import { AllEventSets } from 'src/app/DataModels/AllEventSets';
import { AllEvents } from 'src/app/DataModels/AllEvents';
import { DR_URL } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerList: any[];

  getCustomersUrl = DR_URL + 'getCustomerForEvents';
  updateCustomersUrl = DR_URL + 'updateCustomersForEvent';
  rejectCustomersUrl = DR_URL + 'rejectCustomer';
  acceptCounterBidUrl = DR_URL + 'acceptCounterBid';

  constructor(private httpClient: HttpClient) { }

  getCustomers(events: any) {
    console.log('Events : ' , events);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.getCustomersUrl
      , { "events": events }  // payload to be changed [remove status]
      , options
    );
  }

  updateCustomers(events: any[], customers: any[]) {
    console.log('Events : ' , events);
    console.log('Customers : ' , customers);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.updateCustomersUrl
      , { "eventId": events, "customers": customers }
      , options
    );
  }

  rejectCustomer(eventId: any, eventSetId: any, eventCustomerId: any) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.rejectCustomersUrl
      , { "eventId": +eventId, "eventSetId": +eventSetId, "eventCustomerId":  eventCustomerId}
      , options
    );
  }

  acceptCounterBid(eventId: any, eventSetId: any, eventCustomerId: any) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.acceptCounterBidUrl
      , { "eventId": +eventId, "eventSetId": +eventSetId, "eventCustomerId":  eventCustomerId}
      , options
    );
  }
}
