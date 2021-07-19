import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notam-item',
  templateUrl: './notam-item.component.html',
  styleUrls: ['./notam-item.component.scss']
})
export class NOTAMItemComponent  {

  id: string;
  type: string;
  unitname: string;
  airportname: string;
  state: string;
  text: string;
  periodType: string;
  validityPeriodStart: string;
  validityPeriodEnd: string;
  action: string;
  actionDate: string;

  constructor() { }


}
