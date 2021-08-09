import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DemandeNOTAMItemList } from 'src/app/models/demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';

@Component({
  selector: 'app-ddia-list',
  templateUrl: './ddia-list.component.html',
  styleUrls: ['./ddia-list.component.scss']
})
export class DDIAListComponent implements OnInit, OnChanges {


  @Input() labelTitle: string;
  @Input() statesList: { stateValue: string, stateLabel: string}[];
  @Input() ddiaActionsList: ActionOnDDIA[];
  @Input() ddiaList: (DemandeNOTAMItemList | DemandeSUPPItemList | DemandeAICItemList)[];
  @Output() ddiaStateChange = new EventEmitter<string>();
  @Output() ddiaTypeChange = new EventEmitter<string>();
  @Output() dateOrderChange = new EventEmitter<string>();

  loaderId = 'ddia-act-list';
  constructor(private ngxUiLoaderService: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.ngxUiLoaderService.startLoader(this.loaderId);
  }

  ngOnChanges(): void {
    if (this.ddiaActionsList || this.ddiaList){
      this.ngxUiLoaderService.stopLoader(this.loaderId);
    }
  }

  changeState(event): void {
    const state = event.target.value;
    this.ddiaStateChange.emit(state);
    this.ngxUiLoaderService.startLoader(this.loaderId);
  }

  changeType(event): void {
    const typeDDIA = event.target.value;
    this.ddiaTypeChange.emit(typeDDIA);
    this.ngxUiLoaderService.startLoader(this.loaderId);
  }

  changeDateOrder(event): void {
    const dateOrder = event.target.value;
    this.dateOrderChange.emit(dateOrder);
    this.ngxUiLoaderService.startLoader(this.loaderId);
  }

}
