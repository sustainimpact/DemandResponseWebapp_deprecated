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

  location: any = "HYD";
  selecteddate: any;

  result: any;
  uploadComplete = false;
  fileName;

  eventSetDetails: any;

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
    if (this.selecteddate != null && this.location != null && this.result != null) {
      this.eventsService.uploadEventSet(this.ingressService.currentUser.userId, this.selecteddate,
        this.location, this.result[1]).subscribe((res) => {
          this.resFromServer = res;
          if (this.resFromServer != null) {
            if (this.resFromServer.responseStatus == 1 && this.resFromServer.responseMessage == "The request was successfully served.") {
              this.response = this.resFromServer.response;
              if (this.response != null) {
                this.eventSetDetails = this.response.eventSet;
                if (this.eventSetDetails != null) {
                  this.activeModal.dismiss({
                    eventSetId: this.eventSetDetails.eventSetId,
                    eventSetName: this.eventSetDetails.eventSetName
                  });
                  this.showUploadSuccesToast();
                }
              }
            }
            //if file found
            else if (this.resFromServer.responseStatus == 1 && this.resFromServer.responseMessage == "File already uploaded with same date and user") {
              this.response = this.resFromServer.response;
              this.showUploadErrorToast();
            }
          }
        });
    }
    else {
      this.showUploadErrorToast();
    }
  }


  showUploadSuccesToast() {
    this.toastr.info(
      'Events successfully uploaded.',
      "",
      {
        timeOut: 5000,
        closeButton: true,
        enableHtml: true,
        positionClass: "toast-top-center"
      }
    );
  }

  showUploadErrorToast() {
    this.toastr.error(
      'Events already uploaded for the selected date.',
      "",
      {
        timeOut: 5000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'ngx-toastr toast-error top-90 width-600',
        positionClass: "toast-top-center"
      }
    );
  }
  // showError() {
  //   this.toastr.info(
  //     '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + "Please select date and location and upload file before clicking on done." + '.</span>',
  //     "",
  //     {
  //       timeOut: 4000,
  //       closeButton: true,
  //       enableHtml: true,
  //       toastClass: "alert alert-info alert-with-icon",
  //       positionClass: "toast-bottom-right"
  //     }
  //   );
  // }
}
