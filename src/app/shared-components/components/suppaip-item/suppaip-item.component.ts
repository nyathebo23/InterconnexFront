import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppaip-item',
  templateUrl: './suppaip-item.component.html',
  styleUrls: ['./suppaip-item.component.scss']
})
export class SUPPAIPItemComponent  {

  id: string;
  type: string;
  unitname: string;
  airportname: string;
  object: string;
  text: string;
  state: string;
  action: string;
  actionDate: string;

  constructor() { }

}
