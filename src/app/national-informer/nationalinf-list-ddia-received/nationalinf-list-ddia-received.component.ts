import { Component, OnInit } from '@angular/core';
import { NOT_APPROVED_STATE, PAGE_LIST_SIZE, PENDING_PUBLICATION_STATE } from 'src/app/commons/constants';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
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
  page = '1';
  pagesNb: number;
  ddiaActionsList: ActionOnDDIA[];

  constructor(
    private nationalInformerService: InformateurNationalService,
    private pusherNationalInfService: PusherNationalInformerService
  ) {
    this.pusherNationalInfService.actionDataSubject.subscribe(
      (actionOnDDIA) => {
        if (actionOnDDIA.ddiaObject.ddiaType === this.ddiaType || this.ddiaType === 'all'){
          this.ddiaActionsList.unshift(actionOnDDIA);
        }
      }
    );
    this.pusherNationalInfService.notificationSubject.subscribe(
      (notification) => {
        console.log(notification);
      }
    );
    this.pusherNationalInfService.notificationStateChange.subscribe(
      (notification) => {
        if (notification.newDDIAState === PENDING_PUBLICATION_STATE || notification.newDDIAState === NOT_APPROVED_STATE){
          this.ddiaActionsList.filter((action) => action.ddiaObject.identDDIA === notification.refDDIA);
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
    this.nationalInformerService.getDDIAListInWaiting(this.ddiaType, this.dateOrder, this.page)
    .subscribe((ddiaActions) => {
      console.log(ddiaActions);
      this.ddiaActionsList = ddiaActions.actionsAgent;
      this.pagesNb = Math.ceil(ddiaActions.counts / PAGE_LIST_SIZE);

    }, error => {
      this.nationalInformerService.setError(error);
    },
    () => {});
  }

}
