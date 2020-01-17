import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AppMainComponent} from '../app-main/app-main.component';
import { SelectEventCustomersComponent } from '../createevent/select-event-customers/select-event-customers.component';
import {CreateEventDetailsComponent} from '../CreateEvent/create-event-details/create-event-details.component';
import {CreateEventHomeComponent} from '../CreateEvent/create-event-home/create-event-home.component';
import { PopUpComponent } from '../CreateEvent/pop-up/pop-up.component';
import { PublishEventModalComponent } from '../modals/publish-event-modal/publish-event-modal.component';
import { DownloadReportsModalComponent } from '../modals/download-reports-modal/download-reports-modal.component';
import { AcceptBidModalComponent } from '../modals/accept-bid-modal/accept-bid-modal.component';
import { EventsOverviewComponent } from '../createevent/events-overview/events-overview.component';
import { EventSetCustomersComponent } from '../createevent/event-set-customers/event-set-customers.component';
import { VersionHistoryComponent } from '../createevent/version-history/version-history.component';

const routes: Routes = [
  {path: '', component: AppMainComponent, 
    children : [
      { path: '', component: CreateEventDetailsComponent, data: { breadcrumb: 'Create Event Details'}},
      { path: 'selecteventcustomers', component: SelectEventCustomersComponent , data: { breadcrumb: 'Select Event Customers'}},
      { path: 'createeventdetails', component: CreateEventDetailsComponent , data: { breadcrumb: 'Create Event Details'}},
      { path: 'createevent', component: CreateEventHomeComponent , data: { breadcrumb: 'Create Event Home'}},
      { path: 'popup', component: PopUpComponent , data: { breadcrumb: 'PopUp'}},
      { path: 'publisheventmodal', component: PublishEventModalComponent , data: { breadcrumb: 'Publish Event Modal'}},
      { path: 'downloadreportsmodal', component: DownloadReportsModalComponent, data: { breadcrumb: 'Download Reports Modal'}},
      { path: 'acceptbidmodal', component: AcceptBidModalComponent , data: { breadcrumb: 'Accept Bid Modal'}},
      { path: 'eventsoverview', component: EventsOverviewComponent , data: { breadcrumb: 'Events Overview'}},
      { path: 'eventsetcustomers', component: EventSetCustomersComponent , data: { breadcrumb: 'Event Set Customers'}},
      { path: 'versionhistory', component: VersionHistoryComponent , data: { breadcrumb: 'Version History'}}

    ]},

  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule] 
})
export class AppMainRoutingModule { }
