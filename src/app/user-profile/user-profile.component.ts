import { Component, OnInit, Inject } from '@angular/core';
import { IngressService } from 'src/app/services/ingress.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userId: any;
  userDetails: any;
  resFromServer: any;

  constructor(public ingressService: IngressService
    , @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit(): void {
    this.userId = this.storage.get('UserId');
    this.ingressService.getDsoDetails(this.userId).subscribe(res => {
      this.resFromServer = res;
      if(this.resFromServer != null) {
        this.userDetails = this.resFromServer.response;
      }
    });
  }
}
