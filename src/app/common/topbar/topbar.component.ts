import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IngressService } from 'src/app/services/ingress.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private router: Router
    , private toastr: ToastrService
    , private ingressService: IngressService) { }

  ngOnInit() {
  }
  navigateToMenuItem(item) {

    if (item == 'dashboard')
      this.router.navigateByUrl('/main/popup');


  }



  upcomingFunctionality() {


    this.toastr.info(
      'This is an upcoming functionality',
      "",
      {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        positionClass: "toast-top-center"
      }
    );
  }

  logout() {
    this.ingressService.logout();
    this.router.navigateByUrl("/");
  }
  logoClickEvent() {
    this.router.navigateByUrl("/");
  }

}
