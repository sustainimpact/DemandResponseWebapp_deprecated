import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-create-event-home',
  templateUrl: './create-event-home.component.html',
  styleUrls: ['./create-event-home.component.scss']
})
export class CreateEventHomeComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(private router: Router
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
      thisRef.eventsService.uploadEventSet(2, result[1]).subscribe((res) => {
        thisRef.resFromServer = res;
        if(thisRef.resFromServer != null) {
          if(thisRef.resFromServer.responseStatus==1) {
            thisRef.response = thisRef.resFromServer.response;
            if(thisRef.response != null) {
              thisRef.eventsService.selectedEventSetId = thisRef.response.eventSetId;
              thisRef.eventsService.selectedEventSetName = thisRef.response.name;
              thisRef.eventsService.events = thisRef.response.events;
              thisRef.router.navigateByUrl('/main/createEvent');
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
