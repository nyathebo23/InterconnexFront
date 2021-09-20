import { Component, OnInit, Input, Output, EventEmitter,  ChangeDetectorRef } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { ActionsOnDDIAListService } from 'src/app/services/agent-services/actions-on-ddia-list.service';

@Component({
  selector: 'app-action-on-ddia-list',
  templateUrl: './action-on-ddia-list.component.html',
  styleUrls: ['./action-on-ddia-list.component.scss']
})
export class ActionOnDDIAListComponent implements OnInit {

  @Input() labelTitle: string;
  @Input() statesList: { stateValue: string, stateLabel: string}[];
  ddiaActionsList: ActionOnDDIA[];
  @Output() ddiaStateChange = new EventEmitter<string>();
  @Output() ddiaTypeChange = new EventEmitter<string>();
  @Output() dateOrderChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<string>();
  loaderId = 'ddia-act-list';
  constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    private actionsOnDDIAService: ActionsOnDDIAListService,
    private ref: ChangeDetectorRef
  ) {
    this.actionsOnDDIAService.ddiaActionsListSubject.subscribe(
      (actionsList) => {
        this.ddiaActionsList = actionsList;
        this.ref.detectChanges();
        this.ngxUiLoaderService.stopLoader(this.loaderId);
      }
    );
  }

  ngOnInit(): void {
    this.ngxUiLoaderService.startLoader(this.loaderId);
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
