import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppMainModule } from '../app/app-main/app-main.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AllEventSetsComponent } from './CreateEvent/all-event-sets/all-event-sets.component';
import { AddCustomerBulkComponent } from './Modals/add-customer-bulk/add-customer-bulk.component';
import { AllCustomersComponent } from './CreateEvent/all-customers/all-customers.component';
import { AddCustomerModalTIComponent } from './Modals/add-customer-modal-ti/add-customer-modal-ti.component';
import { AddCustomerModalGIComponent } from './Modals/add-customer-modal-gi/add-customer-modal-gi.component';
import { AddCustomerModalERComponent } from './Modals/add-customer-modal-er/add-customer-modal-er.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllEventSetsComponent,
    AddCustomerBulkComponent,
    AllCustomersComponent,
    AddCustomerModalTIComponent,
    AddCustomerModalGIComponent,
    AddCustomerModalERComponent
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
