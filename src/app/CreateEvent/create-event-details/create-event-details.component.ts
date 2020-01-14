import { Component, ViewChild, OnInit ,ElementRef  } from '@angular/core';

@Component({
  selector: 'app-create-event-details',
  templateUrl: './create-event-details.component.html',
  styleUrls: ['./create-event-details.component.scss']
})
export class CreateEventDetailsComponent implements OnInit {
  innerHeight : any = 0;  
  // offsetHeight : any = 0;
  constructor() { }

  ngOnInit() {
    // console.log(this.innerHeight = Number(window.innerHeight));
    this.innerHeight = Number(window.innerHeight) - 240;
  }
  // @ViewChild('pRef', {static: false}) pRef: ElementRef;

  // ngAfterViewInit() 
  // {
  //   console.log("***************"+ this.pRef.nativeElement.offsetHeight); 
  //   //this.pRef.nativeElement.offsetHeight = Number(window.innerHeight) - 240; 
    
  // }
}
