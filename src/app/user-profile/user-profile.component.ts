import { Component, OnInit, Inject } from '@angular/core';
import { IngressService } from 'src/app/services/ingress.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbItem } from 'src/app/common/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  breadcrumbItems: BreadcrumbItem[] = [];
  userId: any;
  userDetails: any;
  resFromServer: any;

  constructor(public ingressService: IngressService
    , @Inject(LOCAL_STORAGE) private storage: WebStorageService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userId = this.storage.get('UserId');
    this.ingressService.getDsoDetails(this.userId).subscribe(res => {
      this.resFromServer = res;
      if(this.resFromServer != null) {
        this.userDetails = this.resFromServer.response;
      }
    });
    this.buildBreadcrumb();
  }

  upcomingFunctionality() {
    this.toastr.info(
      'This is a premium feature',
      "",
      {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'ngx-toastr toast-info toast-bg-info top-90 width-500',
        positionClass: "toast-top-center"
      }
    );
  }

  buildBreadcrumb() {
    this.breadcrumbItems.push(new BreadcrumbItem('Event Sets', '/main'));
    this.breadcrumbItems.push(new BreadcrumbItem('User Profile', ''));
  }
}
