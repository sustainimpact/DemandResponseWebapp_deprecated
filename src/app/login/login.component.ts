import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { IngressService } from '../services/ingress.service';
import { EventsService } from '../services/events.service';
import { ToastrService } from 'ngx-toastr';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private router: Router,
    private ingressService: IngressService,
    private eventsService: EventsService,
    private toastr: ToastrService
  ) { }

  public email: any;
  public password: any;
  resFromServer: any;
  response: any;

  ngOnInit() {
  }

  loginAdmin() {
    console.log("Login called");
    if (this.email == "admin" && this.password == "admin") {
      this.ingressService.currentUser = {
        userId: 1
        , fullName: ""
        , phoneNumber: ""
        , email: ""
        , stateId: 0
        , localityId: 0
        , electricityBoardId: 0
        , uniqueServiceNumber: 0
        , registrationDate: "string"
        , deactivationDate: "string"
        , activeStatus: true
        , userTypeId: 0
        , userRoleId: 0
      };
      this.router.navigateByUrl('/main');
    }
    else {
      this.showError();
    }
  }

  login() {
    this.ingressService.login(this.email, this.password).subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null && this.resFromServer.response != null) {
        if (this.resFromServer.response.responseStatus == 1) {
          this.response = this.resFromServer.response.response;
          if (this.response != null && this.response.userId) {
            this.ingressService.currentUser.userId = this.response.userId;
            //this.eventsService.upcomingEvents = this.response.upcomingEvents;
            //this.eventsService.lastWeek = this.response.weeklyEvents;
            //this.eventsService.lastMonth = this.response.monthlyEvents;
            this.storage.set('UserId', this.ingressService.currentUser.userId);
            this.router.navigateByUrl('/main');
          }
          else {
            this.showError();
          }

        }
      }
    });
  }

  showError() {
    this.toastr.error(
      'Incorrect credentials',
      "",
      {
        timeOut: 5000,
        closeButton: true, 
        enableHtml: true,
        toastClass: 'ngx-toastr toast-error top-90',
        positionClass: "toast-top-center"
      }
    );
  }

  showHidePassword() {
    let x = document.getElementById("pass") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
}
