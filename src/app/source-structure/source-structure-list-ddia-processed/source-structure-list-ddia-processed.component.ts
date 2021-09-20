import { Component, OnInit } from '@angular/core';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { StructureSourceService } from 'src/app/services/agent-services/structure-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PAGE_LIST_SIZE, PENDING_APPROVAL_STATE, PENDING_PUBLICATION_STATE,
  PENDING_VALIDATION_STATE, PUBLISHED_STATE } from 'src/app/commons/constants';
import { PusherSourceStructureService } from 'src/app/services/pusher/pusher-source-structure.service';

@Component({
  selector: 'app-source-structure-list-ddia-processed',
  templateUrl: './source-structure-list-ddia-processed.component.html',
  styleUrls: ['./source-structure-list-ddia-processed.component.scss']
})
export class SourceStructureListDDIAProcessedComponent implements OnInit {

  ddiaState = 'all';
  dateOrder = 'descendingDate';
  ddiaType = 'all';
  page = '1';
  pagesNb: number;
  ddiaActionsList: ActionOnDDIA[];
  states = [
    {stateLabel: 'all', stateValue: 'all'} ,
    {stateLabel: 'DDIAstates.attenteValidation', stateValue: PENDING_VALIDATION_STATE} ,
    {stateLabel: 'DDIAstates.attenteApprobation', stateValue: PENDING_APPROVAL_STATE} ,
    {stateLabel: 'DDIAstates.attentePublication', stateValue: PENDING_PUBLICATION_STATE} ,
    {stateLabel: 'DDIAstates.publie', stateValue: PUBLISHED_STATE} ,
  ];
  constructor(
    private structureSourceService: StructureSourceService,
    private pusherSourceStructService: PusherSourceStructureService,
  ) {
  }

  ngOnInit(): void {
    this.reloadDDIAItems();
  }

  onDDIAStateChange(state: string): void {
    this.ddiaState = state;
    this.page = '1';
    this.reloadDDIAItems();
  }

  onDDIATypeChange(typeDDIA: string): void {
    this.ddiaType = typeDDIA;
    this.page = '1';
    this.reloadDDIAItems();
  }

  onDateOrderChange(dateOrder: string): void {
    this.dateOrder = dateOrder;
    this.reloadDDIAItems();
  }

  onPageChange(page: string): void {
    this.page = page;
    this.reloadDDIAItems();
  }

  reloadDDIAItems(): void {
    this.structureSourceService.getDDIAListProcessed(this.ddiaType, this.ddiaState, this.dateOrder, this.page)
    .subscribe((actions) => {
      this.ddiaActionsList = actions.actionsAgent;
      this.pagesNb = Math.ceil(actions.counts / PAGE_LIST_SIZE);
    }, error => {
      this.structureSourceService.setError(error);
    },
    () => {
    });
  }

}
