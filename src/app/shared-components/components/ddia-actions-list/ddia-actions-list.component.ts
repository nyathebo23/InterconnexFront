import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DemandeNOTAMItemList } from 'src/app/models/demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';



@Component({
  selector: 'app-ddia-actions-list',
  templateUrl: './ddia-actions-list.component.html',
  styleUrls: ['./ddia-actions-list.component.scss'],
})
export class DDIAActionsListComponent implements OnInit, OnChanges {

  @Input() labelTitle: string;
  @Input() statesList: { stateValue: string, stateLabel: string}[];
  @Input() ddiaActionsList: ActionOnDDIA[];
  @Input() pagesNb: number;
  @Output() ddiaStateChange = new EventEmitter<string>();
  @Output() ddiaTypeChange = new EventEmitter<string>();
  @Output() dateOrderChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<string>();
  currentPage = 1;
  pagesList: number[];
  loaderId = 'ddia-act-list';
  constructor(private ngxUiLoaderService: NgxUiLoaderService, private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.ngxUiLoaderService.startLoader(this.loaderId);
  }

  ngOnChanges(): void {
    if (this.ddiaActionsList !== undefined && this.pagesNb !== undefined){
      this.ngxUiLoaderService.stopLoader(this.loaderId);
      this.ref.detectChanges();
      if (!this.pagesList){
        this.pagesList = [];
        for (let i = 1; i <= this.pagesNb; i++){
          this.pagesList.push(i);
        }
      }
    }
  }

  changeState(event): void {
    const state = event.target.value;
    this.pagesList = undefined;
    this.currentPage = 1;
    this.ddiaStateChange.emit(state);
    this.ngxUiLoaderService.startLoader(this.loaderId);
  }

  changeType(event): void {
    const typeDDIA = event.target.value;
    this.pagesList = undefined;
    this.currentPage = 1;
    this.ddiaTypeChange.emit(typeDDIA);
    this.ngxUiLoaderService.startLoader(this.loaderId);
  }

  changeDateOrder(event): void {
    const dateOrder = event.target.value;
    this.dateOrderChange.emit(dateOrder);
    this.ngxUiLoaderService.startLoader(this.loaderId);
  }

  changePage(pageNumber: number): void {
    if (pageNumber !== this.currentPage){
      this.pageChange.emit(pageNumber.toString());
      this.currentPage = pageNumber;
      this.ngxUiLoaderService.startLoader(this.loaderId);
    }
  }

  goToPage(page: string): void {
    switch (page){
      case 'prev':
        if (this.currentPage > 1){
          this.changePage(this.currentPage - 1);
        }
        break;
      case 'next':
        if (this.currentPage < this.pagesList.length){
          this.changePage(this.currentPage + 1);
        }
        break;
      case 'first':
        this.changePage(1);
        break;
      case 'last':
        if (this.pagesList.length !== 0){
          this.changePage(this.pagesList.length);
        }
        break;
    }
  }

}
