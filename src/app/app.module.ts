import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppMainModule } from '../app/app-main/app-main.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AllEventSetsComponent } from './CreateEvent/all-event-sets/all-event-sets.component';
import { AllCustomersComponent } from './CreateEvent/all-customers/all-customers.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllEventSetsComponent,
    AllCustomersComponent,
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
