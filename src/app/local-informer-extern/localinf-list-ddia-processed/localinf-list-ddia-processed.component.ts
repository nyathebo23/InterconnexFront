import { Component, OnInit } from '@angular/core';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { InformateurLocalService } from 'src/app/services/agent-services/informateur-local.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PENDING_VERIFICATION_STATE, PENDING_ADMISSION_STATE,
  PENDING_VALIDATION_STATE, PENDING_APPROVAL_STATE, PENDING_PUBLICATION_STATE, PUBLISHED_STATE, PAGE_LIST_SIZE } from 'src/app/commons/constants';
import { PusherAuthorityLocalinfService } from 'src/app/services/pusher/pusher-authority-localinf.service';
@Component({
  selector: 'app-localinf-list-ddia-processed',
  templateUrl: './localinf-list-ddia-processed.component.html',
  styleUrls: ['./localinf-list-ddia-processed.component.scss']
})
export class LocalinfListDDIAProcessedComponent implements OnInit {


  ddiaState = 'all';
  dateOrder = 'descendingDate';
  ddiaType = 'all';
  page = '1';
  pagesNb: number;
  ddiaActionsList: ActionOnDDIA[];
  states = [
    {stateLabel: 'all', stateValue: 'all'} ,
    // {stateLabel: 'DDIAstates.attenteVerif', stateValue: PENDING_VERIFICATION_STATE},
    // {stateLabel: 'DDIAstates.attenteAdmission', stateValue: PENDING_ADMISSION_STATE},
    // {stateLabel: 'DDIAstates.attenteValidation', stateValue: PENDING_VALIDATION_STATE},
    {stateLabel: 'DDIAstates.attenteApprobation', stateValue: PENDING_APPROVAL_STATE},
    {stateLabel: 'DDIAstates.attentePublication', stateValue: PENDING_PUBLICATION_STATE} ,
    {stateLabel: 'DDIAstates.publie', stateValue: PUBLISHED_STATE} ,
    {stateLabel: 'erroné', stateValue: 'erroné'} ,
  ];
  constructor(
    private authService: AuthManagerService,
    private localInformerService: InformateurLocalService,
    private pusherLocalInformerService: PusherAuthorityLocalinfService

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
    this.localInformerService.getDDIAListProcessed(this.ddiaType, this.ddiaState, this.dateOrder, this.page)
    .then((ddiaActions) => {
      this.ddiaActionsList = ddiaActions.actionsAgent;
      this.pagesNb = Math.ceil(ddiaActions.counts / PAGE_LIST_SIZE);
    })
    .catch((err) => {

    });
  }
}
