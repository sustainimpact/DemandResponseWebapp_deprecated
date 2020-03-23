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

  constructor(private httpClient: HttpClient) { }

  getCustomers(events: any[]) {
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
}
