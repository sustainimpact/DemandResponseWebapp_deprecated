import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {

  @Input() breadcrumbItems: BreadcrumbItem[] = [];

  constructor() { }

  ngOnInit() {

  }
}

export interface IBreadcrumb {
  breadcrumbItems: BreadcrumbItem[];
  buildBreadcrumb();
}

export class BreadcrumbItem {
  title = '';
  routerLink = '';
  queryParams = null;

  private _isActive = false;
  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;

    // Active link should not be sending to anywhere since we're already there'
    if (this._isActive) {
      this.routerLink = '';
    }
  }

  constructor(title: string, routerLink: string = '', queryParams: any = null) {
    this.title = title;
    this.routerLink = routerLink;
    this.queryParams = queryParams;

    if (routerLink === '') {
      this._isActive = true;
    }
  }
}
