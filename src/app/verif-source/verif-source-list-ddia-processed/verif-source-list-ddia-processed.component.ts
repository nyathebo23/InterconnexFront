import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PAGE_LIST_SIZE, PENDING_ADMISSION_STATE, PENDING_APPROVAL_STATE, PENDING_PUBLICATION_STATE,
   PENDING_VALIDATION_STATE, PUBLISHED_STATE } from 'src/app/commons/constants';
import { RECEPTION_SUBMISSION } from 'src/app/commons/constants-events-notifs';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { VerifSourceService } from 'src/app/services/agent-services/verif-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherSourceVerifierService } from 'src/app/services/pusher/pusher-source-verifier.service';

@Component({
  selector: 'app-verif-source-list-ddia-processed',
  templateUrl: './verif-source-list-ddia-processed.component.html',
  styleUrls: ['./verif-source-list-ddia-processed.component.scss']
})
export class VerifSourceListDDIAProcessedComponent implements OnInit {

  ddiaState = 'all';
  dateOrder = 'ascendingDate';
  ddiaType = 'all';
  page = '1';
  pagesNb: number;
  ddiaActionsList: ActionOnDDIA[];
  states = [
    {stateLabel: 'all', stateValue: 'all'} ,
    // {stateLabel: 'DDIAstates.attenteVerif', stateValue: PENDING_VERIFICATION_STATE} ,
    {stateLabel: 'DDIAstates.attenteAdmission', stateValue: PENDING_ADMISSION_STATE} ,
    {stateLabel: 'DDIAstates.attenteValidation', stateValue: PENDING_VALIDATION_STATE} ,
    {stateLabel: 'DDIAstates.attenteApprobation', stateValue: PENDING_APPROVAL_STATE} ,
    {stateLabel: 'DDIAstates.attentePublication', stateValue: PENDING_PUBLICATION_STATE} ,
    {stateLabel: 'DDIAstates.publie', stateValue: PUBLISHED_STATE} ,
    {stateLabel: 'erroné', stateValue: 'erroné'} ,
  ];
  constructor(
    private authService: AuthManagerService,
    private verifSourceService: VerifSourceService,
    private pusherVerifService: PusherSourceVerifierService
  ) {
    this.pusherVerifService.notificationStateChange.subscribe(
      (notif) => {

      }
    );
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
    this.verifSourceService.getDDIAListProcessed(this.ddiaType, this.ddiaState, this.dateOrder, this.page)
    .then((ddiaActions) => {
      this.ddiaActionsList = ddiaActions.actionsAgent;
      this.pagesNb = Math.ceil(ddiaActions.counts / PAGE_LIST_SIZE);
    })
    .catch((err: HttpErrorResponse) => {

    });
  }

  setNotifRenderAction(): void {
    this.pusherVerifService.channel.bind(
      RECEPTION_SUBMISSION, (data: any) => {

      }
    );
  }
}
