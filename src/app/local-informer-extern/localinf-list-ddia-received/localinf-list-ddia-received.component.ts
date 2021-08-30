import { Component, OnInit } from '@angular/core';
import { NOT_VALIDATED_STATE, PAGE_LIST_SIZE, PENDING_APPROVAL_STATE } from 'src/app/commons/constants';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
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
  page = '1';
  pagesNb: number;
  ddiaActionsList: ActionOnDDIA[];

  constructor(
    private localInformerService: InformateurLocalService,
    private pusherLocalInformerService: PusherAuthorityLocalinfService
  ) {
    this.pusherLocalInformerService.actionDataSubject.subscribe(
      (actionOnDDIA) => {
        if (actionOnDDIA.ddiaObject.ddiaType === this.ddiaType || this.ddiaType === 'all'){
          this.ddiaActionsList.unshift(actionOnDDIA);
        }
      }
    );
    this.pusherLocalInformerService.notificationSubject.subscribe(
      (notification) => {
        console.log(notification);
      }
    );
    this.pusherLocalInformerService.notificationStateChange.subscribe(
      (notification) => {
        if (notification.newDDIAState === PENDING_APPROVAL_STATE || notification.newDDIAState === NOT_VALIDATED_STATE){
          this.ddiaActionsList.filter(( action) => !(action.ddiaObject.identDDIA === notification.refDDIA));
        }
      }
    );
  }

  ngOnInit(): void {
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
    this.localInformerService.getDDIAListInWaiting(this.ddiaType,  this.dateOrder, this.page)
    .then((ddiaActions) => {
      this.ddiaActionsList = ddiaActions.actionsAgent;
      this.pagesNb = Math.ceil(ddiaActions.counts / PAGE_LIST_SIZE);
    })
    .catch((err) => {

    });
  }


}
