import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppMainModule } from '../app/app-main/app-main.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PopUpComponent } from './CreateEvent/pop-up/pop-up.component';
import { SampleComponent } from './CreateEvent/sample/sample.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PopUpComponent,
    SampleComponent,
 
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
