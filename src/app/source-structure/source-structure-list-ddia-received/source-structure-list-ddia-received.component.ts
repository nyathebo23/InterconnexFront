import { Component, OnInit } from '@angular/core';
import { NOT_ADMITTED_STATE, PAGE_LIST_SIZE, PENDING_APPROVAL_STATE, PENDING_VALIDATION_STATE } from 'src/app/commons/constants';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { StructureSourceService } from 'src/app/services/agent-services/structure-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherSourceStructureService } from 'src/app/services/pusher/pusher-source-structure.service';

@Component({
  selector: 'app-source-structure-list-ddia-received',
  templateUrl: './source-structure-list-ddia-received.component.html',
  styleUrls: ['./source-structure-list-ddia-received.component.scss']
})
export class SourceStructureListDDIAReceivedComponent implements OnInit {

  dateOrder = 'ascendingDate';
  ddiaType = 'all';
  page = '1';
  pagesNb: number;
  ddiaActionsList: ActionOnDDIA[];

  constructor(
    private authService: AuthManagerService,
    private structureSourceService: StructureSourceService,
    private pusherSourceStructService: PusherSourceStructureService
  ) {

  }

  ngOnInit(): void {
    this.pusherSourceStructService.actionDataSubject.subscribe(
      (actionOnDDIA) => {
        if (this.ddiaType === actionOnDDIA.ddiaObject.ddiaType || this.ddiaType === 'all'){
          this.ddiaActionsList.unshift(actionOnDDIA);
        }
      }
    );
    this.pusherSourceStructService.notificationStateChange.subscribe(
      (notif) => {
        if ([PENDING_APPROVAL_STATE, PENDING_VALIDATION_STATE, NOT_ADMITTED_STATE].includes(notif.newDDIAState)){
          this.ddiaActionsList = this.ddiaActionsList.filter((action) => action.ddiaObject.identDDIA !== notif.refDDIA);
        }
        // else {
        //   const action = this.ddiaActionsList.find((actionDDIA) => actionDDIA.ddiaObject.identDDIA === notif.refDDIA);
        //   if (action){
        //     action.ddiaObject.state = notif.newDDIAState;
        //   }
        // }
      }
    );
    this.reloadDDIAItems();
  }

  onDDIATypeChange(typeDDIA: string): void {
    this.ddiaType = typeDDIA;
    this.reloadDDIAItems();
    this.page = '1';
  }

  onDateOrderChange(dateOrder: string): void {
    this.dateOrder = dateOrder;
    this.reloadDDIAItems();
  }

  onPageChange(page: string): void {
    this.page = page;
    this.reloadDDIAItems();
    this.page = '1';
  }

  reloadDDIAItems(): void {
    this.structureSourceService.getDDIAListInWaiting(this.ddiaType, this.dateOrder, this.page)
    .then((actions) => {
      this.ddiaActionsList = actions.actionsAgent;
      this.pagesNb = Math.ceil(actions.counts / PAGE_LIST_SIZE);
    })
    .catch((err) => {

    });
  }


}
