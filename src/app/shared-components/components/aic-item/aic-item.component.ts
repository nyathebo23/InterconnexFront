import { Component, Input, OnInit } from '@angular/core';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';

@Component({
  selector: 'app-aic-item',
  templateUrl: './aic-item.component.html',
  styleUrls: ['./aic-item.component.scss']
})
export class AICItemComponent implements OnInit  {

  id: string;
  reference: string;
  unitname: string;
  airportname: string;
  state: string;
  object: string;
  subject: string;
  text: string;
  action: string;
  actionDate: string;
  pathToExtend: string;
  @Input() aicItem: DemandeAICItemList;

  constructor() { }

  ngOnInit(): void {

  }
}
