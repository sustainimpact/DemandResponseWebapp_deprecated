import { Injectable } from '@angular/core';
import { AllEventSets } from 'src/app/DataModels/AllEventSets';
import { AllEvents } from 'src/app/DataModels/AllEvents';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: AllEvents[] = [{
    eventId: 1,
    eventSetId: 1,
    eventName: 'Hyd1201151',
    eventStartTime: '',
    eventEndTime: '',
    plannedPower: 70,
    commitedPower: 50,
    actualPower: 40,
    expectedPrice: 700,
    evenStatusId: 1,
    activeStatus: true,
  }
,
{
  eventId: 2,
  eventSetId: 1,
  eventName: 'Hyd1201152',
  eventStartTime: '',
  eventEndTime: '',
  plannedPower: 30,
  commitedPower: 20,
  actualPower: 10,
  expectedPrice: 300,
  evenStatusId: 1,
  activeStatus: true,
}];

  upcomingEventSets: AllEventSets[] = [{
    eventSetId: 1,
    name: '20191026HYS',
    date: '',
    statusId: 1,
    plannedPower: 100,
    commitedPower: 70,
    actualPower: 50,
    totalPrice: 1000,
    dsoId: 1,
    uploadTime: '',
    version: 1,
    activeStatus: true,
    events: this.events,
  }];

  constructor() { }

  getEventsForUpcomingEventSet(eventSetId: number): AllEvents[]  {
    this.upcomingEventSets.forEach(eventSet => {
      if(eventSet.eventSetId==eventSetId) {
        return eventSet.events;
      }
    });
    return null;
  }
}
