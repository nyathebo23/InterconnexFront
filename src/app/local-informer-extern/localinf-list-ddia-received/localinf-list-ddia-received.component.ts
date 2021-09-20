import { Component, OnInit } from '@angular/core';
import { NOT_VALIDATED_STATE, PAGE_LIST_SIZE, PENDING_APPROVAL_STATE } from 'src/app/commons/constants';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { ActionsOnDDIAListService } from 'src/app/services/agent-services/actions-on-ddia-list.service';
import { InformateurLocalService } from 'src/app/services/agent-services/informateur-local.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherAuthorityLocalinfService } from 'src/app/services/pusher/pusher-authority-localinf.service';

@Component({
  selector: 'app-localinf-list-ddia-received',
  templateUrl: './localinf-list-ddia-received.component.html',
  styleUrls: ['./localinf-list-ddia-received.component.scss']
})
export class LocalinfListDDIAReceivedComponent implements OnInit {

  dateOrder = 'descendingDate';
  ddiaType = 'all';
  ddiaActionsList: ActionOnDDIA[];

  constructor(
    private localInformerService: InformateurLocalService,
    private pusherLocalInformerService: PusherAuthorityLocalinfService,
    private actionsOnDDIAService: ActionsOnDDIAListService,

  ) {
    this.pusherLocalInformerService.actionDataSubject.subscribe(
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

    this.pusherLocalInformerService.notificationStateChange.subscribe(
      (notification) => {
        if (notification.newDDIAState === PENDING_APPROVAL_STATE || notification.newDDIAState === NOT_VALIDATED_STATE){
          this.ddiaActionsList = this.ddiaActionsList.filter((action) => action.ddiaObject.identDDIA !== notification.refDDIA);
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
    this.localInformerService.getDDIAListInWaiting(this.ddiaType,  this.dateOrder, '')
    .subscribe((ddiaActions) => {
      this.ddiaActionsList = ddiaActions.actionsAgent;
      this.actionsOnDDIAService.ddiaActionsListSubject.next(this.ddiaActionsList);
    }, error => {
      this.localInformerService.setError(error);
    }, () => {
    });
  }


}
