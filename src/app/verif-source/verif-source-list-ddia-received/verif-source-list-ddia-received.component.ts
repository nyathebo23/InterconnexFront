import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { NON_CONFORMING_STATE, PAGE_LIST_SIZE, PENDING_ADMISSION_STATE } from 'src/app/commons/constants';
import { DDIA_STATE_CHANGE_EVENT } from 'src/app/commons/constants-events-notifs';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { ActionsOnDDIAListService } from 'src/app/services/agent-services/actions-on-ddia-list.service';
import { VerifSourceService } from 'src/app/services/agent-services/verif-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherSourceVerifierService } from 'src/app/services/pusher/pusher-source-verifier.service';

@Component({
  selector: 'app-verif-source-list-ddia-received',
  templateUrl: './verif-source-list-ddia-received.component.html',
  styleUrls: ['./verif-source-list-ddia-received.component.scss']
})
export class VerifSourceListDDIAReceivedComponent implements OnInit {

  dateOrder = 'descendingDate';
  ddiaType = 'all';
  ddiaActionsList: ActionOnDDIA[];

  constructor(
    private verifSourceService: VerifSourceService,
    private pusherVerifService: PusherSourceVerifierService,
    private actionsOnDDIAService: ActionsOnDDIAListService,
  ) {
    this.pusherVerifService.actionDataSubject.subscribe(
      (actionOnDDIA) => {
        const typeDDIA = actionOnDDIA.ddiaObject.ddiaType.replace(/\s/g, '').toLowerCase();
        if (this.ddiaType === 'all' ||  this.ddiaType ===  typeDDIA){
          if (this.dateOrder === 'descendingDate'){
            this.ddiaActionsList.unshift(actionOnDDIA);
          }
          else {
            this.ddiaActionsList.push(actionOnDDIA);
          }
          this.actionsOnDDIAService.ddiaActionsListSubject.next(this.ddiaActionsList);
        }
      }
    );


    this.pusherVerifService.notificationStateChange.subscribe(
      (notif) => {
        if (notif.newDDIAState === PENDING_ADMISSION_STATE || notif.newDDIAState === NON_CONFORMING_STATE){
          this.ddiaActionsList = this.ddiaActionsList.filter((action) => action.ddiaObject.identDDIA !== notif.refDDIA);
          this.actionsOnDDIAService.ddiaActionsListSubject.next(this.ddiaActionsList);
        }
      }
    );
  }

  ngOnInit(): void {
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
    this.verifSourceService.getDDIAListInWaiting(this.ddiaType, this.dateOrder, '')
    .subscribe((ddiaActions) => {
      this.ddiaActionsList = ddiaActions.actionsAgent;
      this.actionsOnDDIAService.ddiaActionsListSubject.next(this.ddiaActionsList);
    }, error => {
      this.verifSourceService.setError(error);
    },
    () => {
    });
  }


}
