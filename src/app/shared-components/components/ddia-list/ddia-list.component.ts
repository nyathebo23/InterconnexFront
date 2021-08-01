import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';

@Component({
  selector: 'app-ddia-list',
  templateUrl: './ddia-list.component.html',
  styleUrls: ['./ddia-list.component.scss']
})
export class DDIAListComponent implements OnInit {


  @Input() labelTitle: string;
  @Input() ddiaActionsList: ActionOnDDIA[];
  @Input() ddiaList: (DemandeAICItemList | DemandeSUPPItemList | DemandeAICItemList)[];
  @Output() ddiaStateChange = new EventEmitter<string>();
  @Output() ddiaTypeChange = new EventEmitter<string>();
  @Output() dateOrderChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {

  }

  changeState(event): void {
    const state = event.target.value;
    this.ddiaStateChange.emit(state);
  }

  changeType(event): void {
    const typeDDIA = event.target.value;
    this.ddiaTypeChange.emit(typeDDIA);
  }

  changeDateOrder(event): void {
    const dateOrder = event.target.value;
    this.dateOrderChange.emit(dateOrder);
  }

}
