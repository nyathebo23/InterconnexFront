import { Component, Input, OnInit } from '@angular/core';
import { DRAFT_STATE, PENDING_ADMISSION_STATE, PENDING_APPROVAL_STATE, PENDING_VALIDATION_STATE, PENDING_VERIFICATION_STATE } from 'src/app/commons/constants';

@Component({
  selector: 'app-list-states-box',
  templateUrl: './list-states-box.component.html',
  styleUrls: ['./list-states-box.component.scss']
})
export class ListStatesBoxComponent implements OnInit {


  @Input() currentState: string;
  states: {stateLabel: string, stateValue: string}[];
  constructor() {
    this.states = [
      {stateLabel: 'DDIAstates.brouillon', stateValue: DRAFT_STATE} ,
      {stateLabel: 'DDIAstates.attenteVerif', stateValue: PENDING_VERIFICATION_STATE} ,
      {stateLabel: 'DDIAstates.attenteAdmission', stateValue: PENDING_ADMISSION_STATE} ,
      {stateLabel: 'DDIAstates.attenteValidation', stateValue: PENDING_VALIDATION_STATE} ,
      {stateLabel: 'DDIAstates.attenteApprobation', stateValue: PENDING_APPROVAL_STATE} ,
    ];
  }

  ngOnInit(): void {
  }

}
