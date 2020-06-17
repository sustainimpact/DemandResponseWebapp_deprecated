import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppMainComponent } from '../app-main/app-main.component';
import { SelectEventCustomersComponent } from '../createevent/select-event-customers/select-event-customers.component';
import { CreateEventDetailsComponent } from '../CreateEvent/create-event-details/create-event-details.component';
import { CreateEventHomeComponent } from '../CreateEvent/create-event-home/create-event-home.component';
import { AllEventSetsComponent } from '../CreateEvent/all-event-sets/all-event-sets.component';
import { AllCustomersComponent } from '../CreateEvent/all-customers/all-customers.component';


// import { PublishEventModalComponent } from '../modals/publish-event-modal/publish-event-modal.component';
// import { DownloadReportsModalComponent } from '../modals/download-reports-modal/download-reports-modal.component';
// import { AcceptBidModalComponent } from '../modals/accept-bid-modal/accept-bid-modal.component';
// import { EventSetCustomersComponent } from '../createevent/event-set-customers/event-set-customers.component';
// import { VersionHistoryComponent } from '../createevent/version-history/version-history.component';
// import { RejectBidModalComponent } from '../Modals/reject-bid-modal/reject-bid-modal.component';
import { PopUpPagesComponent, AddCustomerModalERComponent } from '../pop-up-pages/pop-up-pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { UserProfileComponent } from '../user-profile/user-profile.component';
// import { EventOverviewComponent } from '../CreateEvent/event-overview/event-overview.component';
const routes: Routes = [
  {
    path: '', component: AppMainComponent,
    children: [
      { path: '', component: AllEventSetsComponent },
      { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
      { path: 'createEvent', component: CreateEventDetailsComponent,  canActivate: [AuthGuard] },
      { path: 'selecteventcustomers', component: SelectEventCustomersComponent, canActivate:[AuthGuard]},
      { path: 'createeventdetails', component: CreateEventDetailsComponent,  canActivate:[AuthGuard] },
      { path: 'uploadspreadsheet', component: CreateEventHomeComponent,  canActivate:[AuthGuard] },
      { path: 'allcustomers', component: AllCustomersComponent, canActivate:[AuthGuard] },
      //{ path: 'addcustomermodaler', component: AddCustomerModalERComponent },
      // { path: 'publisheventmodal', component: PublishEventModalComponent },
      // { path: 'downloadreportsmodal', component: DownloadReportsModalComponent },
      // { path: 'acceptbidmodal', component: AcceptBidModalComponent },
      // { path: 'eventoverview', component: EventOverviewComponent },
      // { path: 'eventsetcustomers', component: EventSetCustomersComponent },
      // { path: 'versionhistory', component: VersionHistoryComponent },
      { path: 'popup', component: PopUpPagesComponent, canActivate:[AuthGuard]},
      // { path: 'rejectbidmodal', component: RejectBidModalComponent }

    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppMainRoutingModule { } 
