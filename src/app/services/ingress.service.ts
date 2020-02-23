import { Injectable } from '@angular/core';
import { User } from '../DataModels/User';

@Injectable({
  providedIn: 'root'
})
export class IngressService {

  public currentUser: User = { userId: -1};
  constructor() {
   // this.currentUser = { "userId": 1 };
  }
}
