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
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">This is an upcoming functionality</span>',
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

  logout() {
    this.ingressService.logout();
    this.router.navigateByUrl("/");
  }
  logoClickEvent() {
    this.router.navigateByUrl("/");
  }

}
