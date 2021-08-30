import { Component, Input, OnInit } from '@angular/core';
import { CONTROL_ACTION, CREATE_ACTION, DRAFT_STATE, MODIF_ACTION, NON_CONFORMING_STATE,
  NOT_ADMITTED_STATE, NOT_APPROVED_STATE, NOT_VALIDATED_STATE, PENDING_ADMISSION_STATE, PENDING_APPROVAL_STATE,
  PENDING_PUBLICATION_STATE, PENDING_VALIDATION_STATE, PENDING_VERIFICATION_STATE, PUBLISHED_STATE } from 'src/app/commons/constants';
import { PUBLISH_OR_RESENDREQ } from 'src/app/commons/control-actions-on-ddia';
import { DDIAHistory } from 'src/app/models/ddia-history.model';
import { DDIAModifHistory } from 'src/app/models/ddia-modif-history.model';

@Component({
  selector: 'app-item-history-box',
  templateUrl: './item-history-box.component.html',
  styleUrls: ['./item-history-box.component.scss']
})
export class ItemHistoryBoxComponent implements OnInit {

  @Input() historyItem: DDIAHistory;
  action: string;
  actionDate: string;
  decision: string;
  userInfos: string;
  structureName: string;
  modifsListDisplayed: string[] = [];
  constructor() {
  }

  ngOnInit(): void {
    const agent = this.historyItem.agentObject;
    const user = this.historyItem.agentObject.user;
    this.userInfos = user.firstname + ' ' + user.lastname + ',  ' + user.function + ',  ' + user.quality;
    this.actionDate = this.historyItem.datetime.toLocaleString();
    switch (this.historyItem.typeAction){
      case CREATE_ACTION:
        this.structureName = agent.unit ? agent.unit : agent.localinformer;
        this.structureName +=  ', ' + agent.aerodrome;
        this.decision = 'DDIAHistoryActions.ok';
        this.action = 'DDIAHistoryActions.init';
        break;
      case CONTROL_ACTION:
        const modifHist = this.historyItem.modifsHistory[0];
        switch (modifHist.prevValue) {
          case DRAFT_STATE:
            this.structureName = agent.unit ? agent.unit : agent.localinformer;
            this.structureName +=  ', ' + agent.aerodrome;
            if (modifHist.newValue === PENDING_VERIFICATION_STATE || modifHist.newValue === PENDING_ADMISSION_STATE){
              this.action = 'DDIAHistoryActions.submit';
              this.decision = 'DDIAHistoryActions.ok';
            }
            else {
              this.action = 'DDIAHistoryActions.cancel';
              this.decision = '';
            }
            break;
          case PENDING_VERIFICATION_STATE:
            this.structureName = agent.localinformer ? agent.localinformer : agent.unit;
            this.structureName +=  ', ' + agent.aerodrome;
            this.action = 'DDIAHistoryActions.verif';
            if (modifHist.newValue === PENDING_ADMISSION_STATE){
              this.decision = 'DDIAHistoryActions.ok';
            }
            else if (modifHist.newValue === NON_CONFORMING_STATE){
              this.decision = 'DDIAHistoryActions.reject';
            }
            break;
          case PENDING_ADMISSION_STATE:
            this.action = 'DDIAHistoryActions.admit';
            this.structureName = agent.aerodrome;
            if (modifHist.newValue === PENDING_VALIDATION_STATE || modifHist.newValue === PENDING_APPROVAL_STATE){
              this.decision = 'DDIAHistoryActions.ok';
            }
            else if (modifHist.newValue === NOT_ADMITTED_STATE){
              this.decision = 'DDIAHistoryActions.reject';
            }
            break;
          case PENDING_VALIDATION_STATE:
            this.structureName = agent.localinformer;
            this.action = 'DDIAHistoryActions.valid';
            if (modifHist.newValue === PENDING_APPROVAL_STATE){
              this.decision =  'DDIAHistoryActions.ok';
            }
            else if (modifHist.newValue === NOT_VALIDATED_STATE){
              this.decision = 'DDIAHistoryActions.reject';
            }
            break;
          case PENDING_APPROVAL_STATE:
            this.structureName = agent.nationalinformer;
            this.action = 'DDIAHistoryActions.approve';
            if (modifHist.newValue === PENDING_APPROVAL_STATE){
              this.decision =  'DDIAHistoryActions.ok';
            }
            else if (modifHist.newValue === NOT_APPROVED_STATE ){
                this.decision = 'DDIAHistoryActions.reject';
            }
            break;
          case PENDING_PUBLICATION_STATE:
            this.structureName = agent.localinformer;
            if (modifHist.newValue === PUBLISHED_STATE){
              this.action = 'DDIAHistoryActions.publish';
              this.decision = 'DDIAHistoryActions.ok';
            }
            break;
          default:
            this.structureName = agent.unit ? agent.unit : agent.localinformer;
            this.structureName +=  ', ' + agent.aerodrome;
            this.action = 'DDIAHistoryActions.cancel';
            this.decision = '';
            break;
        }
        break;
      case MODIF_ACTION:
        this.action = 'DDIAHistoryActions.modif';
        this.decision = 'DDIAHistoryActions.ok';
        const modifsList = this.historyItem.modifsHistory;
        for (const modif of modifsList){
          const modifStr = modif.field + ' ' + modif.prevValue + ' > ' + modif.newValue;
          this.modifsListDisplayed.push(modifStr);
        }
        break;
    }

  }


}
