import { Injectable } from '@angular/core';
import { AllEventSets } from 'src/app/DataModels/AllEventSets';
import { AllEvents } from 'src/app/DataModels/AllEvents';
import { DR_URL } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: any[] = [];

  upcomingEvents: any[] = [];
  lastWeek: any[] = [];
  lastMonth: any[] = [];

  selectedEventSet: any;
  selectedEventSetId: number;
  selectedEventSetName: string;
  eventsForSelectedEventSet: AllEvents[] = [];

  uploadEventSetUrl = DR_URL + 'uploadEventSet';
  publishEventsUrl = DR_URL + 'publishEvent';
  getEventOverviewUrl = DR_URL + 'getEventOverview';
  cancelEventUrl = DR_URL + 'cancelEvent';
  getEventsUrl = DR_URL + 'getEvents';
  getEventSetsUrl = DR_URL + 'getEventSets';

  constructor(private httpClient: HttpClient) { 
  }

  getEventsFromLocal(eventType,eventSetId) {
    if(eventType=='upcoming') {
      this.upcomingEvents.forEach(eventSet => {
        if(eventSet.eventSetId==eventSetId) {
          this.selectedEventSetName=eventSet.eventSetName;
          this.eventsForSelectedEventSet=eventSet.allEvents;
        }
      });
    }
    
    if(eventType=='curWeek') {
      this.lastWeek.forEach(eventSet => {
        if(eventSet.eventSetId==eventSetId) {
          this.selectedEventSetName=eventSet.eventSetName;
          this.eventsForSelectedEventSet=eventSet.allEvents;
        }
      });
    }
    if(eventType=='curMonth') {
      this.lastMonth.forEach(eventSet => {
        if(eventSet.eventSetId==eventSetId) {
          this.selectedEventSetName=eventSet.eventSetName;
          this.eventsForSelectedEventSet=eventSet.allEvents;
        }
      });
    }
    return {events: this.eventsForSelectedEventSet, eventSetName: this.selectedEventSetName};
  }

  getEvents(eventSetId) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.getEventsUrl
      , {"eventSetId": eventSetId}
      , options
    );
  }

  getEventSets(userId) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.getEventSetsUrl
      , {"userId": userId}
      , options
    );
  }

  uploadEventSet(userId: any, date: any, location: any, payload: string) {
    console.log('User Id : ' , userId);
    console.log('Payload : ' , payload);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.uploadEventSetUrl + '/' + location 
      + '/'+ userId + '/' + date
      , {"eventSet":payload}
      , options
    );
  }

  publishEvents(events: any[], eventSetId: any) {
    console.log('Events : ' , events);
    console.log('Event Set Id : ' , eventSetId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.publishEventsUrl
      , {"eventIdList":events,"status":"PUBLISH","eventSetId":+eventSetId}  // payload to be changed [remove status]
      , options
    );
  }

  getEventOverview(events: any[], eventSetId: any) {
    console.log('Events : ' , events);
    console.log('Event Set Id : ' , eventSetId);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.getEventOverviewUrl
      , {"eventId":events}
      , options
    );
  }

  cancelEvent(eventId: any, eventSetId: any) {
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.cancelEventUrl
      , {"eventId": +eventId,"eventSetId": +eventSetId}
      , options
    );
  }
}
