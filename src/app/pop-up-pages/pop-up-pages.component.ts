import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up-pages',
  templateUrl: './pop-up-pages.component.html',
  styleUrls: ['./pop-up-pages.component.scss']
})
export class PopUpPagesComponent implements OnInit {

  showpublishEventModal :Boolean= false;
  showrejectBidModal :Boolean= false;
  showacceptBidModal :Boolean= false;
  showdownloadReportsModal :Boolean= false; 
  showversionHistory :Boolean= false;
  showeventsetCustomers :Boolean= false;
  showeventsOverview :Boolean= false;
  

  constructor() { }

  ngOnInit() {
  }

  showPublish(){
    this.showpublishEventModal=true;
    this.showrejectBidModal = false;
    this.showacceptBidModal = false;
    this.showdownloadReportsModal = false;
    this.showversionHistory = false;
    this.showeventsetCustomers = false;
    this.showeventsOverview = false;
  }

  showreject(){
    this.showpublishEventModal=false;
    this.showrejectBidModal = true;
    this.showacceptBidModal = false;
    this.showdownloadReportsModal = false;
    this.showversionHistory = false;
    this.showeventsetCustomers = false;
    this.showeventsOverview = false;
  }

  showaccept(){
    this.showpublishEventModal=false;
    this.showrejectBidModal = false;
    this.showacceptBidModal = true;
    this.showdownloadReportsModal = false;
    this.showversionHistory = false;
    this.showeventsetCustomers = false;
    this.showeventsOverview = false;
  }

  showdownload(){
    this.showpublishEventModal=false;
    this.showrejectBidModal = false;
    this.showacceptBidModal = false;
    this.showdownloadReportsModal = true;
    this.showversionHistory = false;
    this.showeventsetCustomers = false;
    this.showeventsOverview = false;
  }

  showversion(){
    this.showpublishEventModal=false;
    this.showrejectBidModal = false;
    this.showacceptBidModal = false;
    this.showdownloadReportsModal = false;
    this.showversionHistory = true;
    this.showeventsetCustomers = false;
    this.showeventsOverview = false;
  }

  showeventset(){
    this.showpublishEventModal=false;
    this.showrejectBidModal = false;
    this.showacceptBidModal = false;
    this.showdownloadReportsModal = false;
    this.showversionHistory = false;
    this.showeventsetCustomers = true;
    this.showeventsOverview = false;
  }

  showOverview(){
    this.showpublishEventModal=false;
    this.showrejectBidModal = false;
    this.showacceptBidModal = false;
    this.showdownloadReportsModal = false;
    this.showversionHistory = false;
    this.showeventsetCustomers = false;
    this.showeventsOverview = true;
  }

}
