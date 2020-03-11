import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event-home',
  templateUrl: './create-event-home.component.html',
  styleUrls: ['./create-event-home.component.scss']
})
export class CreateEventHomeComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  selectFile() {
     this.fileInput.nativeElement.click();
    // this.router.navigateByUrl('/main/createeventdetails');

  }

 getBase64(event) {
  let me = this;
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    //me.modelvalue = reader.result;
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

}
