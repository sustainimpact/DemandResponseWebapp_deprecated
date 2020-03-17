import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import * as moment from 'moment';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-create-event-home',
  templateUrl: './create-event-home.component.html',
  styleUrls: ['./create-event-home.component.scss']
})
export class CreateEventHomeComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(private router: Router
    , private eventsService: EventsService) { }

  payload: any;

  ngOnInit() {
  }
  selectFile() {
    this.fileInput.nativeElement.click();
    // this.router.navigateByUrl('/main/createeventdetails');

  }

  getBase64(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    let thisRef = this;
    reader.readAsDataURL(file);
    reader.onload = function () {
      let result = reader.result.toString().split("base64,")
      console.log("base64" + result[1]);
      thisRef.eventsService.uploadEventSet(2, result[1]).subscribe(() => {

      });
    };
    //reader.onload = this.onloadEvent(reader.result);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  onloadEvent(result){
    this.payload = result.toString().split("base64,");
    console.log("base64" + this.payload);
    return this.payload;
  }
}
