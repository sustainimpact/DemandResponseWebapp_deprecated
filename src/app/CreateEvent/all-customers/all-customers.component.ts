import { Component, OnInit } from '@angular/core';
import { CustomerService }  from 'src/app/services/customer.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss']
})
export class AllCustomersComponent implements OnInit {
  resFromServer: any;
  customerList: any;

  testList: number[] = [1,2,3];

  innerHeight : any = 0;  
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.innerHeight = Number(window.innerHeight) - 150;
    this.customerService.getAllCustomers().subscribe((res) => {
      this.resFromServer = res;
      if(this.resFromServer != null) {
        this.customerList = this.resFromServer.response;
        console.log('Customers : ' , this.customerList);
      }
    });
  }
}

