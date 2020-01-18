import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {

  private subject = new Subject<any>();
  public triggerOverviewPopup = new EventEmitter<any>();

  triggerOverviewsPopup(status){
    this.subject.next({trigger: status})
  }

  openOverviewPopup(): Observable<any> {
    return this.subject.asObservable();
}

  constructor() { }
}
