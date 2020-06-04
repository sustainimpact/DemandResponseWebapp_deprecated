import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { IngressService } from 'src/app/services/ingress.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-event-home',
  templateUrl: './create-event-home.component.html',
  styleUrls: ['./create-event-home.component.scss']
})
export class CreateEventHomeComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(private router: Router
    , public activeModal: NgbActiveModal
    , private ingressService: IngressService
    , private eventsService: EventsService
    , private toastr: ToastrService) { }

  resFromServer: any;
  response: any;
  payload: any;

  location: any;
  date: any;

  result: any;
  uploadComplete = false;
  fileName;

  ngOnInit() {
  }
  selectFile() {
    this.fileInput.nativeElement.click();
    // this.router.navigateByUrl('/main/createeventdetails');

  }

  getBase64(event) {
    let file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    let reader = new FileReader();
    let thisRef = this;
    reader.readAsDataURL(file);
    reader.onload = function () {
      thisRef.result = reader.result.toString().split("base64,")
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    this.uploadComplete = true;
  }

  uploadEvent() {
    if (this.date != null && this.location != null && this.result != null) {
      this.eventsService.uploadEventSet(this.ingressService.currentUser.userId, this.date,
        this.location, this.result[1]).subscribe((res) => {
          this.resFromServer = res;
          if (this.resFromServer != null) {
            if (this.resFromServer.responseStatus == 1) {
              this.response = this.resFromServer.response;
              if (this.response != null) {
                if (this.response.eventSet != null) {
                  this.eventsService.selectedEventSet = this.response.eventSet;
                  this.eventsService.selectedEventSetId = this.response.eventSet.eventSetId;
                  this.eventsService.selectedEventSetName = this.response.eventSet.eventSetName;
                  //this.eventsService.selectedEventSet.events = this.response.eventSet.allEvents;;
                  //this.eventsService.events = this.response.events;
                  this.eventsService.upcomingEvents.push(this.eventsService.selectedEventSet);
                  this.router.navigate(['/main/createEvent'], {
                    queryParams: {
                      eventType: 'upcoming',
                      eventSetId: this.eventsService.selectedEventSetId,
                      eventSetName: this.eventsService.selectedEventSetName
                    }
                  });
                }
              }
            }
          }
        });
    }
    else {
      this.showError();
    }
  }

  showError() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + "Please select date and location and upload file before clicking on done." + '.</span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-info alert-with-icon",
        positionClass: "toast-bottom-right"
      }
    );
  }
}
