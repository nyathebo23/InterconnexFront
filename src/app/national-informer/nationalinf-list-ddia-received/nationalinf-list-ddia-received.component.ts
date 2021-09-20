import { Component, OnInit } from '@angular/core';
import { NOT_APPROVED_STATE, PAGE_LIST_SIZE, PENDING_PUBLICATION_STATE } from 'src/app/commons/constants';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { ActionsOnDDIAListService } from 'src/app/services/agent-services/actions-on-ddia-list.service';
import { InformateurNationalService } from 'src/app/services/agent-services/informateur-national.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherNationalInformerService } from 'src/app/services/pusher/pusher-national-informer.service';

@Component({
  selector: 'app-nationalinf-list-ddia-received',
  templateUrl: './nationalinf-list-ddia-received.component.html',
  styleUrls: ['./nationalinf-list-ddia-received.component.scss']
})
export class NationalinfListDDIAReceivedComponent implements OnInit {

  dateOrder = 'descendingDate';
  ddiaType = 'all';
  ddiaActionsList: ActionOnDDIA[];

  constructor(
    private nationalInformerService: InformateurNationalService,
    private pusherNationalInfService: PusherNationalInformerService,
    private actionsOnDDIAService: ActionsOnDDIAListService,

  ) {
    this.pusherNationalInfService.actionDataSubject.subscribe(
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

    this.pusherNationalInfService.notificationStateChange.subscribe(
      (notification) => {
        if (notification.newDDIAState === PENDING_PUBLICATION_STATE || notification.newDDIAState === NOT_APPROVED_STATE){
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
    this.nationalInformerService.getDDIAListInWaiting(this.ddiaType, this.dateOrder, '')
    .subscribe((ddiaActions) => {
      this.ddiaActionsList = ddiaActions.actionsAgent;
      this.actionsOnDDIAService.ddiaActionsListSubject.next(this.ddiaActionsList);
    }, error => {
      this.nationalInformerService.setError(error);
    },
    () => {});
  }

}
