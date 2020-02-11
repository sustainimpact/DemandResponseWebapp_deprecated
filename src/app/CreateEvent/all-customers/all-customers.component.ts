import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss']
})
export class AllCustomersComponent implements OnInit {
  innerHeight : any = 0;  
  constructor() { }

  ngOnInit() {
    this.innerHeight = Number(window.innerHeight) - 150;
  }

}

