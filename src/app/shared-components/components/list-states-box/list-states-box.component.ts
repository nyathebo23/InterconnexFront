import { Component, Input, OnInit } from '@angular/core';
import { CANCELLED_STATE, CONTROL_ACTION, DRAFT_STATE, NON_CONFORMING_STATE, NOT_ADMITTED_STATE, NOT_APPROVED_STATE, NOT_VALIDATED_STATE,
  PENDING_ADMISSION_STATE, PENDING_APPROVAL_STATE, PENDING_PUBLICATION_STATE,
  PENDING_VALIDATION_STATE, PENDING_VERIFICATION_STATE, PUBLISHED_STATE } from 'src/app/commons/constants';
import { DDIAHistory } from 'src/app/models/ddia-history.model';

@Component({
  selector: 'app-list-states-box',
  templateUrl: './list-states-box.component.html',
  styleUrls: ['./list-states-box.component.scss']
})
export class ListStatesBoxComponent implements OnInit {


  @Input() historyItems: DDIAHistory[];
  @Input() currentState: string;
  states: {stateLabel: string, stateValue: string}[];
  allStates = [
    {stateLabel: 'DDIAstates.attenteVerif', stateValue: PENDING_VERIFICATION_STATE} ,
    {stateLabel: 'DDIAstates.attenteAdmission', stateValue: PENDING_ADMISSION_STATE} ,
    {stateLabel: 'DDIAstates.attenteValidation', stateValue: PENDING_VALIDATION_STATE} ,
    {stateLabel: 'DDIAstates.attenteApprobation', stateValue: PENDING_APPROVAL_STATE} ,
    {stateLabel: 'DDIAstates.attentePublication', stateValue: PENDING_PUBLICATION_STATE} ,
    {stateLabel: 'DDIAstates.publie', stateValue: PUBLISHED_STATE} ,
    {stateLabel: 'DDIAerroneousstates.cancel', stateValue: CANCELLED_STATE},
    {stateLabel: 'DDIAerroneousstates.nonconforme', stateValue: NON_CONFORMING_STATE},
    {stateLabel: 'DDIAerroneousstates.nonadmis', stateValue: NOT_ADMITTED_STATE},
    {stateLabel: 'DDIAerroneousstates.nonvalide', stateValue: NOT_VALIDATED_STATE},
    {stateLabel: 'DDIAerroneousstates.nonapprouve', stateValue: NOT_APPROVED_STATE},
  ];
  constructor() {
  }

  ngOnInit(): void {
    const statesHistory = this.historyItems.map((historyItem) => {
      if (historyItem.typeAction === CONTROL_ACTION){
        return historyItem.modifsHistory[0].newValue;
      }
    });
    this.states = this.allStates.filter( (state) => {
      return statesHistory.findIndex(stateval => stateval === state.stateValue) !== -1;
    });
    this.states.unshift({stateLabel: 'DDIAstates.brouillon', stateValue: DRAFT_STATE});
  }

}
