import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AppMainComponent} from '../app-main/app-main.component';
import { SelectEventCustomersComponent } from '../createevent/select-event-customers/select-event-customers.component';
import {CreateEventDetailsComponent} from '../CreateEvent/create-event-details/create-event-details.component';
import {CreateEventHomeComponent} from '../CreateEvent/create-event-home/create-event-home.component';
const routes: Routes = [
  {path: '', component: AppMainComponent, 
    children : [
      { path: 'selecteventcustomers', component: SelectEventCustomersComponent,data: { breadcrumb: 'Select Event Customers '} },
      { path: 'createeventdetails', component: CreateEventDetailsComponent, data: { breadcrumb: 'Create Event Details'} },
      { path: 'createevent', component: CreateEventHomeComponent , data: { breadcrumb: 'Create Event Home'}},
      { path: '', component: CreateEventDetailsComponent, data: { breadcrumb: 'Create Event Details'} },
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
