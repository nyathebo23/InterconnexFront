import { Component, OnInit } from '@angular/core';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { StructureSourceService } from 'src/app/services/agent-services/structure-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PENDING_ADMISSION_STATE, PENDING_APPROVAL_STATE, PENDING_PUBLICATION_STATE,
  PENDING_VALIDATION_STATE, PENDING_VERIFICATION_STATE, PUBLISHED_STATE } from 'src/app/commons/constants';

@Component({
  selector: 'app-source-structure-list-ddia-processed',
  templateUrl: './source-structure-list-ddia-processed.component.html',
  styleUrls: ['./source-structure-list-ddia-processed.component.scss']
})
export class SourceStructureListDDIAProcessedComponent implements OnInit {

  ddiaState = 'all';
  dateOrder = 'ascendingDate';
  ddiaType = 'all';
  ddiaActionsList: ActionOnDDIA[] = [];
  states = [
    {stateLabel: 'all', stateValue: 'all'} ,
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
    private structureSourceService: StructureSourceService
  ) {
  }

  ngOnInit(): void {
    this.reloadDDIAItems();
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
    this.structureSourceService.getDDIAListProcessed(this.ddiaType, this.ddiaState, this.dateOrder)
    .then((actions) => {
      this.ddiaActionsList = actions;
    })
    .catch((err) => {

    });
  }

}
