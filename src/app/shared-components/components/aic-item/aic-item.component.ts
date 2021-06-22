import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aic-item',
  templateUrl: './aic-item.component.html',
  styleUrls: ['./aic-item.component.scss']
})
export class AICItemComponent  {

  id: string;
  type: string;
  unitname: string;
  airportname: string;
  state: string;
  object: string;
  subject: string;
  action: string;
  actionDate: string;

  constructor() { }

}
