import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'angular-crumbs';
import { AppMainComponent } from './app-main.component';
import { TopbarComponent } from '../common/topbar/topbar.component';
import { CreateEventHomeComponent } from '../CreateEvent/create-event-home/create-event-home.component';
//import { CreateEventDetailsComponent } from '../CreateEvent/create-event-details/create-event-details.component';
import { SelectEventCustomersComponent } from '../createevent/select-event-customers/select-event-customers.component';
import { AppMainRoutingModule } from './app-main-routing.module';
import { PublishEventModalComponent } from '../pop-up-pages/pop-up-pages.component';
import { DownloadReportsModalComponent } from '../pop-up-pages/pop-up-pages.component';
import { AcceptBidModalComponent } from '../pop-up-pages/pop-up-pages.component';
import { EventSetCustomersComponent } from '../pop-up-pages/pop-up-pages.component';
import { VersionHistoryComponent } from '../pop-up-pages/pop-up-pages.component';
import { RejectBidModalComponent } from '../pop-up-pages/pop-up-pages.component';
import { PopUpPagesComponent } from '../pop-up-pages/pop-up-pages.component';
import { NgbModule, NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventOverviewComponent } from '../CreateEvent/create-event-details/create-event-details.component';
import { SharedServicesService } from '../services/shared-services.service';
import { AddCustomerModalTIComponent } from '../pop-up-pages/pop-up-pages.component';
import { AddCustomerModalGIComponent } from '../pop-up-pages/pop-up-pages.component';
import { AddCustomerModalERComponent } from '../pop-up-pages/pop-up-pages.component';
import { AddCustomerBulkComponent } from '../pop-up-pages/pop-up-pages.component';
import { FormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { StorageServiceModule } from 'angular-webstorage-service';
import { CountdownModule } from 'ngx-countdown';
import { BreadcrumbComponent } from '../common/breadcrumb/breadcrumb.component';


@NgModule({

  imports: [
    CommonModule,
    AppMainRoutingModule,
    BreadcrumbModule,
    NgbModule,
    NgbModalModule,
    FormsModule,
    NgHttpLoaderModule.forRoot(),
    StorageServiceModule,
    CountdownModule
  ],
  exports: [
    AppMainComponent,
    TopbarComponent,
    BreadcrumbComponent,
    CreateEventHomeComponent,
    //CreateEventDetailsComponent,
    SelectEventCustomersComponent,
    PublishEventModalComponent,
    DownloadReportsModalComponent,
    AcceptBidModalComponent,
    EventSetCustomersComponent,
    VersionHistoryComponent,
    RejectBidModalComponent,
    PopUpPagesComponent,
    AddCustomerModalTIComponent,
    AddCustomerModalGIComponent,
    AddCustomerModalERComponent,
    AddCustomerBulkComponent,
    EventOverviewComponent
  ],
  entryComponents: [
    AppMainComponent,
    TopbarComponent,
    BreadcrumbComponent,
    CreateEventHomeComponent,
    //CreateEventDetailsComponent,
    SelectEventCustomersComponent,
    PublishEventModalComponent,
    DownloadReportsModalComponent,
    AcceptBidModalComponent,
    EventSetCustomersComponent,
    VersionHistoryComponent,
    AddCustomerModalTIComponent,
    AddCustomerModalGIComponent,
    AddCustomerModalERComponent,
    AddCustomerBulkComponent,
    RejectBidModalComponent,
    PopUpPagesComponent,
    EventOverviewComponent
  ],
  declarations: [
    AppMainComponent,
    TopbarComponent,
    BreadcrumbComponent,
    CreateEventHomeComponent,
    //CreateEventDetailsComponent,
    SelectEventCustomersComponent,
    PublishEventModalComponent,
    DownloadReportsModalComponent,
    AcceptBidModalComponent,
    EventSetCustomersComponent,
    VersionHistoryComponent,
    AddCustomerModalTIComponent,
    AddCustomerModalGIComponent,
    AddCustomerModalERComponent,
    AddCustomerBulkComponent,
    RejectBidModalComponent,
    PopUpPagesComponent,
    EventOverviewComponent
  ],
  bootstrap: [AppMainComponent],
  providers: [SharedServicesService, NgbActiveModal]
  // providers: [EventOverviewComponent]

  // schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppMainModule { }
