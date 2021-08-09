import { Component, Input, OnInit } from '@angular/core';
import { CONTROL_ACTION, CREATE_ACTION, DRAFT_STATE, MODIF_ACTION, PENDING_ADMISSION_STATE, PENDING_APPROVAL_STATE,
  PENDING_PUBLICATION_STATE, PENDING_VALIDATION_STATE, PENDING_VERIFICATION_STATE } from 'src/app/commons/constants';
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
  decision = 'DDIAHistoryActions.ok';
  userInfos: string;
  modifsListDisplayed: string[];
  constructor() {
  }

  ngOnInit(): void {
    const user = this.historyItem.agentObject.user;
    this.userInfos = user.firstname + ' ' + user.lastname + ',  ' + user.function + ',  ' + user.quality;
    this.actionDate = this.historyItem.datetime.toLocaleString();
    switch (this.historyItem.typeAction){
      case CREATE_ACTION:
        this.action = 'DDIAHistoryActions.init';
        break;
      case CONTROL_ACTION:
        const modifHist = this.historyItem.modifsHistory[0];
        if (modifHist.prevValue === DRAFT_STATE){
          this.action = 'DDIAHistoryActions.submit';
          if (modifHist.newValue === PENDING_VERIFICATION_STATE || modifHist.newValue === PENDING_ADMISSION_STATE){
            this.decision = 'DDIAHistoryActions.ok';
          }
          else {

          }
        }
        if (modifHist.prevValue === PENDING_VERIFICATION_STATE){
          this.action = 'DDIAHistoryActions.verif';
          this.decision = modifHist.newValue === PENDING_ADMISSION_STATE ? 'DDIAHistoryActions.ok' : 'DDIAHistoryActions.reject';
        }
        if (modifHist.prevValue === PENDING_ADMISSION_STATE){
          this.action = 'DDIAHistoryActions.admit';
          this.decision = modifHist.newValue === PENDING_VALIDATION_STATE ? 'DDIAHistoryActions.ok' : 'DDIAHistoryActions.reject';
        }
        if (modifHist.prevValue === PENDING_VALIDATION_STATE){
          this.action = 'DDIAHistoryActions.valid';
          this.decision = modifHist.newValue === PENDING_APPROVAL_STATE ? 'DDIAHistoryActions.ok' : 'DDIAHistoryActions.reject';
        }
        if (modifHist.prevValue === PENDING_APPROVAL_STATE){
          this.action = 'DDIAHistoryActions.approve';
          this.decision = modifHist.newValue === PENDING_PUBLICATION_STATE ? 'DDIAHistoryActions.ok' : 'DDIAHistoryActions.reject';
        }
        break;
      case MODIF_ACTION:
        this.action = 'DDIAHistoryActions.modif';
        const modifsList = this.historyItem.modifsHistory;
        for (const modif of modifsList){
          const modifStr = modif.field + ' ' + modif.prevValue + ' > ' + modif.newValue;
          this.modifsListDisplayed.push(modifStr);
        }
        break;
    }

  }


}
