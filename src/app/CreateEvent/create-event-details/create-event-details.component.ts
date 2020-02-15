import { Component, ViewEncapsulation, OnInit, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { EventSetCustomersComponent } from 'src/app/pop-up-pages/pop-up-pages.component';



@Component({
  selector: 'app-create-event-details',
  templateUrl: './create-event-details.component.html',
  styleUrls: ['./create-event-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateEventDetailsComponent implements OnInit {

  innerHeight: any = 0;
  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.innerHeight = Number(window.innerHeight) - 240;
  }

  openEventsOverview() {
    const modalRef = this.modalService.open(EventOverviewComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.name = 'World';
  }
  
  openEventDetails() {
    console.log("Edit customers");
    this.router.navigateByUrl('/main/selecteventcustomers');
  }

  editCustomers() {
    const modalRef = this.modalService.open(EventSetCustomersComponent, { centered: true });
    modalRef.componentInstance.name = 'World';
  }
}


@Component({
  selector: 'app-event-overview',
  templateUrl: '../event-overview/event-overview.component.html',
  styleUrls: ['../event-overview/event-overview.component.scss']
})
export class EventOverviewComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  ngOnInit() {
  }

}
