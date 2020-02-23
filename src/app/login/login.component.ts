import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngressService } from '../services/ingress.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private ingressService: IngressService,
    private toastr: ToastrService
  ) { }

  public email: any;
  public password: any;

  ngOnInit() {
  }

  login() {
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

  showError() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + "Incorrect credentials" + '.</span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-info alert-with-icon",
        positionClass: "toast-bottom-right"
      }
    );
  }

}
