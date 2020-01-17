import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppMainModule } from '../app/app-main/app-main.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PopUpComponent } from './CreateEvent/pop-up/pop-up.component';
import { PublishEventModalComponent } from './modals/publish-event-modal/publish-event-modal.component';
import { DownloadReportsModalComponent } from './modals/download-reports-modal/download-reports-modal.component';
import { AcceptBidModalComponent } from './modals/accept-bid-modal/accept-bid-modal.component';
import { EventsOverviewComponent } from './createevent/events-overview/events-overview.component';
import { EventSetCustomersComponent } from './createevent/event-set-customers/event-set-customers.component';
import { VersionHistoryComponent } from './createevent/version-history/version-history.component';
import { RejectBidModalComponent } from './modals/reject-bid-modal/reject-bid-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PopUpComponent,
    PublishEventModalComponent,
    DownloadReportsModalComponent,
    AcceptBidModalComponent,
    EventsOverviewComponent,
    EventSetCustomersComponent,
    VersionHistoryComponent,
    RejectBidModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
