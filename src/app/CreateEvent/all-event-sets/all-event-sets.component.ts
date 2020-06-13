import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AllEventSets } from 'src/app/DataModels/AllEventSets';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEventHomeComponent } from '../create-event-home/create-event-home.component';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { UPLOAD } from 'src/environments/environment';
import { REUPLOAD } from 'src/environments/environment';

@Component({
  selector: 'app-all-event-sets',
  templateUrl: './all-event-sets.component.html',
  styleUrls: ['./all-event-sets.component.scss']
})
export class AllEventSetsComponent implements OnInit {

  upcomingEventSets: any[];
  curWeekEventSets: any[];
  curMonthEventSets: any[];

  userId: any;

  resFromServer: any;
  response: any;
  eventSets: any;

  constructor(private router: Router
    , private modalService: NgbModal
    , private eventsService: EventsService
    , @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.userId = this.storage.get('UserId');
    this.eventsService.getEventSets(this.userId).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null) {
        this.response = this.resFromServer.response;
        if (this.response != null) {
          this.eventSets = this.response.eventSets;
          if (this.eventSets != null) {
            if (this.eventSets.upcoming != null) {
              this.upcomingEventSets = this.eventSets.upcoming;
            }
            else {
              this.upcomingEventSets = [];
            }
            if (this.eventSets.currWeek != null) {
              this.curWeekEventSets = this.eventSets.currWeek;
            }
            else {
              this.curWeekEventSets = [];
            }
            if (this.eventSets.currMonth != null) {
              this.curMonthEventSets = this.eventSets.currMonth;
            }
            else {
              this.curMonthEventSets = [];
            }
          }
        }
      }
    });
  }

  openEventSetDetails(eventSet, eventType) {
    console.log('clicked event set : ' , eventSet);
    this.router.navigate(['/main/createeventdetails'], {
      queryParams: {
        eventType: eventType,
        eventSetId: eventSet.eventSetId,
        eventSetName: eventSet.eventSetName,
        dateOfOccurence: eventSet.dateOfOccurence
      }
    });
  }

  scheduleDrEvent() {
    const activeModal = this.modalService.open(CreateEventHomeComponent, 
      { centered: true, windowClass: 'create-event-modal' });

      activeModal.componentInstance.action = UPLOAD;

      activeModal.result.then((result) => { },
        (reason) => {
          if(reason.uploadResult == 'Success') {
            this.router.navigate(['/main/createEvent'], {
              queryParams: {
                eventType: 'upcoming',
                eventSetId: reason.eventSetId,
                eventSetName: reason.eventSetName
              }
            });
          }
        });
  }

  formatTime(ts, type) {
    if (ts != null) {
      //  ts = ts.substring(0, 10) + ' ' + ts.substring(11, 16) + ':00';
      // console.log('date : ', ts);
      if (type == 't')
        return moment(ts).format("hh:mm A");
      else if (type == 'd') {
        let tempdate = moment(ts, "YYYY-MM-DD")
        return tempdate.format("Do MMM, YYYY");
      }
    }
  }

  getStatus(status) {
    //console.log('status : ', statusId);
    if (status == 'Created') {
      return 'Un-Published';
    }
    else if (status == 'Published') {
      return 'Published';
    }
    else if (status == 'Partially Published') {
      return 'Partially Published';
    }
  }
}
