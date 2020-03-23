import { Injectable } from '@angular/core';
import { AllEventSets } from 'src/app/DataModels/AllEventSets';
import { AllEvents } from 'src/app/DataModels/AllEvents';
import { DR_URL } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  upcomingEvents: any[];
  lastWeek: any[];
  lastMonth: any[];

  selectedEventSet: any;
  selectedEventSetId: number;
  selectedEventSetName: string;
  eventsForSelectedEventSet: AllEvents[] = [];

  uploadEventSetUrl = DR_URL + 'uploadEventSet/Hyd';
  publishEventsUrl = DR_URL + 'publishEvent';
  getEventOverviewUrl = DR_URL + 'getEventOverview';

  events: AllEvents[] = [{
    eventId: 1,
    eventSetId: 1,
    eventName: '20191026HYS01',
    startTime: '2020-02-27T07:00',
    endTime: '2020-02-27T08:00',
    plannedPower: 70,
    committedPower: 50,
    actualPower: 40,
    price: 700,
    numberOfCustomers: 25,
    status: 1,
    isSelected: false,
    activeStatus: true,
  }
    ,
  {
    eventId: 2,
    eventSetId: 1,
    eventName: '20191026HYS02',
    startTime: '2020-02-27T08:00',
    endTime: '2020-02-27T09:00',
    plannedPower: 30,
    committedPower: 20,
    actualPower: 10,
    price: 300,
    numberOfCustomers: 20,
    status: 1,
    isSelected: false,
    activeStatus: true,
  }];

  upcomingEventSets: AllEventSets[] = [{
    eventSetId: 1,
    name: '20191026HYS',
    dateOfOccurrence: '2020-02-27T07:00',
    status: 1,
    plannedPower: 100,
    committedPower: 70,
    actualPower: 50,
    totalPrice: 1000,
    publishedEvents: 7,
    completedEvents: 3,
    cancelledEvents: 1,
    dsoId: 1,
    uploadTime: '2020-02-27T07:00',
    version: 1,
    activeStatus: true,
    events: this.events,
  }
    ,
  {
    eventSetId: 2,
    name: '20191026HYS',
    dateOfOccurrence: '2020-02-28T07:00',
    status: 2,
    plannedPower: 70,
    committedPower: 50,
    actualPower: 40,
    totalPrice: 700,
    publishedEvents: 9,
    completedEvents: 7,
    cancelledEvents: 1,
    dsoId: 1,
    uploadTime: '2020-02-28T07:00',
    version: 1,
    activeStatus: true,
    events: null,
  }];

  curWeekEventSets: AllEventSets[] = [{
    eventSetId: 3,
    name: '20191026HYS',
    dateOfOccurrence: '2020-10-15T11:00',
    status: 1,
    plannedPower: 50,
    committedPower: 30,
    actualPower: 20,
    totalPrice: 500,
    publishedEvents: 3,
    completedEvents: 2,
    cancelledEvents: 1,
    dsoId: 1,
    uploadTime: '2020-10-15T11:00',
    version: 1,
    activeStatus: true,
    events: null,
  }
    ,
  {
    eventSetId: 4,
    name: '20191026HYS',
    dateOfOccurrence: '2020-10-14T11:00',
    status: 1,
    plannedPower: 60,
    committedPower: 70,
    actualPower: 60,
    totalPrice: 600,
    publishedEvents: 3,
    completedEvents: 3,
    cancelledEvents: 3,
    dsoId: 1,
    uploadTime: '2020-10-15T11:00',
    version: 1,
    activeStatus: true,
    events: null,
  }];

  curMonthEventSets: AllEventSets[] = [{
    eventSetId: 5,
    name: '20191026HYS',
    dateOfOccurrence: '2020-10-13T11:00',
    status: 1,
    plannedPower: 40,
    committedPower: 30,
    actualPower: 30,
    totalPrice: 400,
    publishedEvents: 7,
    completedEvents: 7,
    cancelledEvents: 0,
    dsoId: 1,
    uploadTime: '2020-10-16T11:00',
    version: 1,
    activeStatus: true,
    events: null,
  }
    ,
  {
    eventSetId: 6,
    name: '20191026HYS',
    dateOfOccurrence: '2020-10-12T11:00',
    status: 1,
    plannedPower: 100,
    committedPower: 100,
    actualPower: 100,
    totalPrice: 1000,
    publishedEvents: 10,
    completedEvents: 10,
    cancelledEvents: 0,
    dsoId: 1,
    uploadTime: '2020-10-12T11:00',
    version: 1,
    activeStatus: true,
    events: null,
  }];

  constructor(private httpClient: HttpClient) { }

  getEventsForUpcomingEventSet(eventSetId: number): AllEvents[] {
    this.upcomingEventSets.forEach(eventSet => {
      if (eventSet.eventSetId == eventSetId) {
        return eventSet.events;
      }
    });
    return null;
  }

  getEvents(eventType,eventSetId) {
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

  uploadEventSet(userId: any, payload: string) {
    console.log('User Id : ' , userId);
    console.log('Payload : ' , payload);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.uploadEventSetUrl + '/' + userId
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
}
