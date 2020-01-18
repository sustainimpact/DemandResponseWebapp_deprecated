import { Component,ViewEncapsulation, OnInit, EventEmitter   } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedServicesService } from '../../services/shared-services.service';

@Component({
  selector: 'app-create-event-details',
  templateUrl: './create-event-details.component.html',
  styleUrls: ['./create-event-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateEventDetailsComponent implements OnInit {

  innerHeight : any = 0;  
  closeResult: string;
  constructor(private modalService: NgbModal,
    private sharedService : SharedServicesService) { }
    public triggerOverviewPopup = new EventEmitter<any>();

  ngOnInit() {
   
    this.innerHeight = Number(window.innerHeight) - 240;
  }
  openOverviewPopup() {
    console.log("openOverviewPopup");
    this.sharedService.triggerOverviewPopup.emit(true);
  }
 
}
