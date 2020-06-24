import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { BreadcrumbItem } from 'src/app/common/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss']
})
export class AllCustomersComponent implements OnInit {

  breadcrumbItems: BreadcrumbItem[] = [];
  resFromServer: any;
  customerList: any;

  testList: number[] = [1, 2, 3];

  innerHeight: any = 0;
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.innerHeight = Number(window.innerHeight) - 150;
    this.customerService.getAllCustomers().subscribe((res) => {
      this.resFromServer = res;
      if (this.resFromServer != null) {
        this.customerList = this.resFromServer.response;
        if(this.customerList==null) {
          this.customerList = [];
        }
      }
    });
    this.buildBreadcrumb();
  }

  buildBreadcrumb() {
    this.breadcrumbItems.push(new BreadcrumbItem('Event Sets', '/main'));
    this.breadcrumbItems.push(new BreadcrumbItem('Profile', ''));
  }

}

