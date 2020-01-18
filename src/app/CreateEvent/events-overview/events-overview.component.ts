import { Component, OnInit   } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SharedServicesService} from '../../services/shared-services.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-overview',
  templateUrl: './events-overview.component.html',
  styleUrls: ['./events-overview.component.scss']
})
export class EventsOverviewComponent implements OnInit {
  subscription: Subscription;
  constructor(private modalService: NgbModal, private sharedService : SharedServicesService) {

    // this.subscription = this.sharedService.openOverviewPopup().subscribe(data => {
    //   console.log("Triggered Popup" + data);
    //   if(data){   
    //     this.open();
    //   }
    // });

    this.sharedService.triggerOverviewPopup.subscribe((data:any) =>{
      if(data){  
        console.log("Triggered Popup" + data); 
        this.open();
      }
    });

   }

  ngOnInit() {
  }

  open()
  {
    console.log("Into the open");
    this.modalService.open({ centered: true });
  }
}
