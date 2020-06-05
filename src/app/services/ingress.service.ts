import { Injectable, Inject } from '@angular/core';
import { User } from '../DataModels/User';
import { DR_URL } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class IngressService {

  public currentUser: User = { userId: -1 };

  loginUrl = DR_URL + 'loginDSOUser';

  constructor(private httpClient: HttpClient
    , @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
  }

  login(email: string, password: string) {
    console.log('Email : ', email);
    console.log('Password : ', password);
    var options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post(this.loginUrl
      , { "email": email, "password": password }
      , options
    );
  }

  logout() {
    this.storage.remove('UserId');
  }
}
