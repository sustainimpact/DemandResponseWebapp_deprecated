import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { IngressService } from 'src/app/services/ingress.service';

@Component({
  selector: 'app-create-event-home',
  templateUrl: './create-event-home.component.html',
  styleUrls: ['./create-event-home.component.scss']
})
export class CreateEventHomeComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(private router: Router
    , private ingressService: IngressService
    , private eventsService: EventsService) { }

  resFromServer: any;
  response: any;
  payload: any;

  ngOnInit() {
  }
  selectFile() {
    this.fileInput.nativeElement.click();
    // this.router.navigateByUrl('/main/createeventdetails');

  }

  getBase64(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    let thisRef = this;
    reader.readAsDataURL(file);
    reader.onload = function () {
      let result = reader.result.toString().split("base64,")
      thisRef.eventsService.uploadEventSet(thisRef.ingressService.currentUser.userId, result[1]).subscribe((res) => {
        thisRef.resFromServer = res;
        if(thisRef.resFromServer != null) {
          console.log('resFromServer : ' , thisRef.resFromServer);
          if(thisRef.resFromServer.responseStatus==1) {
            console.log('responseStatus : ' , thisRef.resFromServer.responseStatus);
            thisRef.response = thisRef.resFromServer.response;
            if(thisRef.response != null) {
              console.log('response : ' , thisRef.response);
              if(thisRef.response.eventSet != null) {
                console.log('eventSet : ' , thisRef.response.eventSet);
                thisRef.eventsService.selectedEventSet = thisRef.response.eventSet;
                thisRef.eventsService.selectedEventSetId = thisRef.response.eventSet.eventSetId;
                thisRef.eventsService.selectedEventSetName = thisRef.response.eventSet.eventSetName;
                thisRef.eventsService.selectedEventSet.events = thisRef.response.eventSet.allEvents;;
                thisRef.eventsService.events = thisRef.response.events;
                console.log('upcoming event sets before : ' , thisRef.eventsService.upcomingEvents);
                thisRef.eventsService.upcomingEvents.push(thisRef.eventsService.selectedEventSet);
                console.log('upcoming event sets after : ' , thisRef.eventsService.upcomingEvents);
                console.log('events : ' , thisRef.eventsService.events);
                thisRef.router.navigate(['/main/createEvent'], {
                  queryParams: {
                    eventType: 'upcoming',
                    eventSetId: thisRef.eventsService.selectedEventSetId,
                  }
                });
              }
            }
          }
        }
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
