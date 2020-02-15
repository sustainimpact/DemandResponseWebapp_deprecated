import { Injectable } from '@angular/core';
import { User } from '../DataModels/User';

@Injectable({
  providedIn: 'root'
})
export class IngressService {

  public currentUser: User;
  constructor() {
    this.currentUser = { "userId": 1 };
  }
}
