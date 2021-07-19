import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ddia-item',
  templateUrl: './ddia-item.component.html',
  styleUrls: ['./ddia-item.component.scss']
})
export class DDIAItemComponent implements OnInit {

  id: string;
  typeDDIA: string;
  type: string;
  state: string;
  unitname: string;
  airportname: string;
  object: string;
  text: string;
  periodType: string;
  validityPeriodStart: string;
  validityPeriodEnd: string;
  action: string;
  actionDate: string;

  constructor() { }

  ngOnInit(): void {
  }

}
