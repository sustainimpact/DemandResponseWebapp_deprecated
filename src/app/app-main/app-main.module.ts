import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMainComponent } from './app-main.component';
import { TopbarComponent } from '../common/topbar/topbar.component';
import { CreateEventHomeComponent } from '../CreateEvent/create-event-home/create-event-home.component';
import { CreateEventDetailsComponent } from '../CreateEvent/create-event-details/create-event-details.component';
import { SelectEventCustomersComponent } from '../createevent/select-event-customers/select-event-customers.component';
import { AppMainRoutingModule } from './app-main-routing.module';
import {BreadcrumbModule} from 'angular-crumbs';

@NgModule({
  declarations: [
    AppMainComponent,
    TopbarComponent,
    CreateEventHomeComponent,
    CreateEventDetailsComponent,
    SelectEventCustomersComponent,
  ],
  imports: [
    CommonModule,
    AppMainRoutingModule,
    BreadcrumbModule
  ]
})
export class AppMainModule { }
