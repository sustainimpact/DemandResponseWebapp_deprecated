import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngressService } from '../services/ingress.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private ingressService: IngressService
  ) { }

  public email: any;
  public password: any;

  ngOnInit() {
  }

  login() {
    console.log("Login called");
    if (this.email == "admin" && this.password == "admin") {
      this.ingressService.currentUser = { userId: 1 };
    }


    this.router.navigateByUrl('/main');
  }

}
