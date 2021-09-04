import { Component, OnInit } from '@angular/core';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { InformateurNationalService } from 'src/app/services/agent-services/informateur-national.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { DRAFT_STATE, PENDING_VERIFICATION_STATE, PENDING_ADMISSION_STATE,
  PENDING_VALIDATION_STATE, PENDING_APPROVAL_STATE, PENDING_PUBLICATION_STATE, PUBLISHED_STATE, PAGE_LIST_SIZE } from 'src/app/commons/constants';
import { PusherNationalInformerService } from 'src/app/services/pusher/pusher-national-informer.service';
@Component({
  selector: 'app-nationalinf-list-ddia-processed',
  templateUrl: './nationalinf-list-ddia-processed.component.html',
  styleUrls: ['./nationalinf-list-ddia-processed.component.scss']
})
export class NationalinfListDDIAProcessedComponent implements OnInit {

  ddiaState = 'all';
  dateOrder = 'descendingDate';
  ddiaType = 'all';
  page = '1';
  pagesNb: number;
  ddiaActionsList: ActionOnDDIA[];
  states = [
    {stateLabel: 'all', stateValue: 'all'} ,
    // {stateLabel: 'DDIAstates.attenteVerif', stateValue: PENDING_VERIFICATION_STATE} ,
    // {stateLabel: 'DDIAstates.attenteAdmission', stateValue: PENDING_ADMISSION_STATE} ,
    // {stateLabel: 'DDIAstates.attenteValidation', stateValue: PENDING_VALIDATION_STATE} ,
    // {stateLabel: 'DDIAstates.attenteApprobation', stateValue: PENDING_APPROVAL_STATE} ,
    {stateLabel: 'DDIAstates.attentePublication', stateValue: PENDING_PUBLICATION_STATE} ,
    {stateLabel: 'DDIAstates.publie', stateValue: PUBLISHED_STATE} ,
  ];
  constructor(
    private nationalInformerService: InformateurNationalService,
    private pusherNationalInfService: PusherNationalInformerService
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
    this.nationalInformerService.getDDIAListProcessed(this.ddiaType, this.ddiaState, this.dateOrder, this.page)
    .subscribe((ddiaActions) => {
      this.ddiaActionsList = ddiaActions.actionsAgent;
      this.pagesNb = Math.ceil(ddiaActions.counts / PAGE_LIST_SIZE);
    }, error => {
      this.nationalInformerService.setError(error);
    },
    () => {});
  }

}
