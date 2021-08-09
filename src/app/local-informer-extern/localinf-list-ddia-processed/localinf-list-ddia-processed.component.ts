import { Component, OnInit } from '@angular/core';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { InformateurLocalService } from 'src/app/services/agent-services/informateur-local.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PENDING_VERIFICATION_STATE, PENDING_ADMISSION_STATE,
  PENDING_VALIDATION_STATE, PENDING_APPROVAL_STATE, PENDING_PUBLICATION_STATE, PUBLISHED_STATE } from 'src/app/commons/constants';
@Component({
  selector: 'app-localinf-list-ddia-processed',
  templateUrl: './localinf-list-ddia-processed.component.html',
  styleUrls: ['./localinf-list-ddia-processed.component.scss']
})
export class LocalinfListDDIAProcessedComponent implements OnInit {


  ddiaState = 'all';
  dateOrder = 'descendingDate';
  ddiaType = 'all';
  ddiaActionsList: ActionOnDDIA[] = [];
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
    private localInformerService: InformateurLocalService
  ) {
  }

  ngOnInit(): void {
  }

  onDDIAStateChange(state: string): void {
    this.ddiaState = state;
    this.reloadDDIAItems();
  }

  onDDIATypeChange(typeDDIA: string): void {
    this.ddiaType = typeDDIA;
    this.reloadDDIAItems();
  }

  onDateOrderChange(dateOrder: string): void {
    this.dateOrder = dateOrder;
    this.reloadDDIAItems();
  }

  reloadDDIAItems(): void {
    this.localInformerService.getDDIAListProcessed(this.ddiaType, this.ddiaState, this.dateOrder)
    .then((ddiaActions) => {
      this.ddiaActionsList = ddiaActions;
    })
    .catch((err) => {

    });
  }
}
