import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { IngressService } from 'src/app/services/ingress.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UPLOAD } from 'src/environments/environment';
import { REUPLOAD } from 'src/environments/environment';


@Component({
  selector: 'app-create-event-home',
  templateUrl: './create-event-home.component.html',
  styleUrls: ['./create-event-home.component.scss']
})
export class CreateEventHomeComponent implements OnInit {

  @Input() public action;
  @Input() public eventSetId;
  @Input() public eventSetName;
  @Input() public dateOfOccurence;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(private router: Router
    , public activeModal: NgbActiveModal
    , private ingressService: IngressService
    , private eventsService: EventsService
    , private toastr: ToastrService) {
    this.todayDate = moment().format("YYYY-MM-DD");
    this.tommDate = moment().add(1, "day").format("YYYY-MM-DD");
    this.dayAfterDate = moment().add(2, "days").format("YYYY-MM-DD");
    this.uploadDate = this.todayDate;
  }

  resFromServer: any;
  response: any;
  payload: any;

  location: any = "HYD";
  selecteddate: any;

  result: any;
  uploadComplete = false;
  fileName;

  eventSetDetails: any;
  uploadDate;
  todayDate;
  tommDate;
  dayAfterDate

  ngOnInit() {
    if(this.action == REUPLOAD) {
      if(this.eventSetName != null) {
        this.location = this.eventSetName.substr(this.eventSetName.length - 3);
      }
      this.uploadDate = this.dateOfOccurence;
      document.getElementById("uploadDate").setAttribute("disabled","disabled");
      document.getElementById("location").setAttribute("disabled","disabled");
    }
  }
  selectFile() {
    this.fileInput.nativeElement.click();
    // this.router.navigateByUrl('/main/createeventdetails');

  }

  getBase64(event) {
    // let file = event.target.files[0];
    let file = event[0];
    this.fileName = event[0].name;
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
    if (this.action == UPLOAD) {
      if (this.uploadDate != null && this.location != null && this.result != null) {
        this.eventsService.uploadEventSet(this.ingressService.currentUser.userId, this.uploadDate,
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
                      eventSetName: this.eventSetDetails.eventSetName,
                      dateOfOccurence: this.eventSetDetails.dateOfOccurence,
                      uploadResult: 'Success'
                    });
                    this.showUploadSuccesToast();
                  }
                }
              }
              //if file found
              else if (this.resFromServer.responseStatus == 1 && this.resFromServer.responseMessage == "File already uploaded with same date, user and location") {
                this.response = this.resFromServer.response;
                let msg = "Events already uploaded for the selected date.";
                this.showUploadErrorToast(msg);
              }
              else {
                let msg = "Something went wrong in uploading events.Please contact support.";
                this.showUploadErrorToast(msg);
              }
              // else if (this.resFromServer.responseStatus == 1 && this.resFromServer.responseMessage == "Uploaded Date is before Current Date") {
              //   this.response = this.resFromServer.response;
              //   let msg = "Uploaded Date is before Current Date.";
              //   this.showUploadErrorToast(msg);
              // }
            }
          });
      }
      else {
        let msg = "Something went wrong in uploading events.Please contact support.";
        this.showUploadErrorToast(msg);
      }
    }
    else if (this.action == REUPLOAD) {
      if (this.result != null && this.eventSetId != null) {
        this.eventsService.reUploadEventSet(this.eventSetId, this.result[1]).subscribe((res) => {
          this.resFromServer = res;
          if (this.resFromServer != null) {
            if (this.resFromServer.responseStatus == 1 && this.resFromServer.responseMessage == "The request was successfully served.") {
              this.response = this.resFromServer.response;
              if (this.response != null) {
                this.eventSetDetails = this.response.eventSet;
                if (this.eventSetDetails != null) {
                  this.activeModal.dismiss({
                    eventSetId: this.eventSetDetails.eventSetId,
                    eventSetName: this.eventSetDetails.eventSetName,
                    dateOfOccurence: this.eventSetDetails.dateOfOccurence,
                    uploadResult: 'Success'
                  });
                  this.showUploadSuccesToast();
                }
              }
            }
          }
        });
      }
      else {
        let msg = "Something went wrong in uploading events.Please contact support.";
        this.showUploadErrorToast(msg);
      }
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
        toastClass: 'ngx-toastr toast-info toast-bg-success top-90 width-600',
        positionClass: "toast-top-center"
      }
    );
  }

  showUploadErrorToast(msg) {
    this.toastr.info(
      msg,
      "",
      {
        timeOut: 5000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'ngx-toastr toast-info toast-bg-error top-90 width-600',
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

  onFileDropped(event) {
    console.log("File Dropped");
  }

  fileDropHandler(event) {

    console.log("filebrowsehandler: ",event);
    this.getBase64(event);
  }
}
