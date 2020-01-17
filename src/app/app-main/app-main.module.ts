import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbModule} from 'angular-crumbs';
import { AppMainComponent } from './app-main.component';
import { TopbarComponent } from '../common/topbar/topbar.component';
import { CreateEventHomeComponent } from '../CreateEvent/create-event-home/create-event-home.component';
import { CreateEventDetailsComponent } from '../CreateEvent/create-event-details/create-event-details.component';
import { SelectEventCustomersComponent } from '../createevent/select-event-customers/select-event-customers.component';
import { AppMainRoutingModule } from './app-main-routing.module';
import { PublishEventModalComponent } from '../modals/publish-event-modal/publish-event-modal.component';
import { DownloadReportsModalComponent } from '../modals/download-reports-modal/download-reports-modal.component';
import { AcceptBidModalComponent } from '../modals/accept-bid-modal/accept-bid-modal.component';
import { EventsOverviewComponent } from '../createevent/events-overview/events-overview.component';
import { EventSetCustomersComponent } from '../createevent/event-set-customers/event-set-customers.component';
import { VersionHistoryComponent } from '../createevent/version-history/version-history.component';
import { RejectBidModalComponent } from '../Modals/reject-bid-modal/reject-bid-modal.component';
import { PopUpPagesComponent } from '../pop-up-pages/pop-up-pages.component';

@NgModule({
  declarations: [
    AppMainComponent,
    TopbarComponent,
    CreateEventHomeComponent,
    CreateEventDetailsComponent,
    SelectEventCustomersComponent,
    PublishEventModalComponent,
    DownloadReportsModalComponent,
    AcceptBidModalComponent,
    EventsOverviewComponent,
    EventSetCustomersComponent,
    VersionHistoryComponent,
    RejectBidModalComponent,
    PopUpPagesComponent
  ],
  imports: [
    CommonModule,
    AppMainRoutingModule,
    BreadcrumbModule
  ]
})
export class AppMainModule { }
