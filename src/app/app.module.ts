import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppMainModule } from '../app/app-main/app-main.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RejectBidModalComponent } from './Modals/reject-bid-modal/reject-bid-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
