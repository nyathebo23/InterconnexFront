import { Component, OnInit } from '@angular/core';
import { DRAFT_STATE, PENDING_VERIFICATION_STATE, PENDING_ADMISSION_STATE,
  PENDING_VALIDATION_STATE, PENDING_APPROVAL_STATE, PENDING_PUBLICATION_STATE, PUBLISHED_STATE, PAGE_LIST_SIZE, CANCELLED_STATE } from 'src/app/commons/constants';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DemandeNOTAMItemList } from 'src/app/models/demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherSourceService } from 'src/app/services/pusher/pusher-source.service';

@Component({
  selector: 'app-units-ddia-list',
  templateUrl: './units-ddia-list.component.html',
  styleUrls: ['./units-ddia-list.component.scss']
})
export class UnitsDDIAListComponent implements OnInit {

  ddiaState = 'all';
  dateOrder = 'ascendingDate';
  ddiaType = 'notam';
  page = '1';
  pagesNb: number;
  ddiaList: (DemandeAICItemList | DemandeNOTAMItemList | DemandeSUPPItemList) [];
  states = [
    {stateLabel: 'all', stateValue: 'all'} ,
    {stateLabel: 'DDIAstates.brouillon', stateValue: DRAFT_STATE} ,
    {stateLabel: 'DDIAerroneousstates.cancel', stateValue: CANCELLED_STATE},
    {stateLabel: 'DDIAstates.attenteVerif', stateValue: PENDING_VERIFICATION_STATE} ,
    {stateLabel: 'DDIAstates.attenteAdmission', stateValue: PENDING_ADMISSION_STATE} ,
    {stateLabel: 'DDIAstates.attenteValidation', stateValue: PENDING_VALIDATION_STATE} ,
    {stateLabel: 'DDIAstates.attenteApprobation', stateValue: PENDING_APPROVAL_STATE} ,
    {stateLabel: 'DDIAstates.attentePublication', stateValue: PENDING_PUBLICATION_STATE} ,
    {stateLabel: 'DDIAstates.publie', stateValue: PUBLISHED_STATE} ,
    {stateLabel: 'erroné', stateValue: 'erroné'} ,
  ];
  constructor(
    private authService: AuthManagerService,
    private sourceAgentService: AgentSourceService,
    private pusherSourceAgentService: PusherSourceService
  ) {
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
    this.sourceAgentService.getListDDIAInitiatedByUnit(this.ddiaType, this.ddiaState, this.dateOrder, this.page).subscribe(
      (ddiaList) => {
        this.ddiaList = ddiaList.listDDIA;
        this.pagesNb = Math.ceil(ddiaList.counts / PAGE_LIST_SIZE);
      }
    );
  }


  ngOnInit(): void {
    this.reloadDDIAItems();
  }


}
