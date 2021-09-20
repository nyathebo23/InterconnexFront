import { Component, OnInit } from '@angular/core';
import { NOT_ADMITTED_STATE, PAGE_LIST_SIZE, PENDING_APPROVAL_STATE, PENDING_VALIDATION_STATE } from 'src/app/commons/constants';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { ActionsOnDDIAListService } from 'src/app/services/agent-services/actions-on-ddia-list.service';
import { StructureSourceService } from 'src/app/services/agent-services/structure-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherSourceStructureService } from 'src/app/services/pusher/pusher-source-structure.service';

@Component({
  selector: 'app-source-structure-list-ddia-received',
  templateUrl: './source-structure-list-ddia-received.component.html',
  styleUrls: ['./source-structure-list-ddia-received.component.scss']
})
export class SourceStructureListDDIAReceivedComponent implements OnInit {

  dateOrder = 'descendingDate';
  ddiaType = 'all';
  ddiaActionsList: ActionOnDDIA[];

  constructor(
    private structureSourceService: StructureSourceService,
    private pusherSourceStructService: PusherSourceStructureService,
    private actionsOnDDIAService: ActionsOnDDIAListService,

  ) {

  }

  ngOnInit(): void {
    this.pusherSourceStructService.actionDataSubject.subscribe(
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
    this.pusherSourceStructService.notificationStateChange.subscribe(
      (notif) => {
        if ([PENDING_APPROVAL_STATE, PENDING_VALIDATION_STATE, NOT_ADMITTED_STATE].includes(notif.newDDIAState)){
          this.ddiaActionsList = this.ddiaActionsList.filter((action) => action.ddiaObject.identDDIA !== notif.refDDIA);
          this.actionsOnDDIAService.ddiaActionsListSubject.next(this.ddiaActionsList);
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
  }

  onDateOrderChange(dateOrder: string): void {
    this.dateOrder = dateOrder;
    this.reloadDDIAItems();
  }

  reloadDDIAItems(): void {
    this.structureSourceService.getDDIAListInWaiting(this.ddiaType, this.dateOrder, '')
    .subscribe((actions) => {
      this.ddiaActionsList = actions.actionsAgent;
      this.actionsOnDDIAService.ddiaActionsListSubject.next(this.ddiaActionsList);
    }, error => {
      this.structureSourceService.setError(error);
    },
    () => {
    });
  }


}
