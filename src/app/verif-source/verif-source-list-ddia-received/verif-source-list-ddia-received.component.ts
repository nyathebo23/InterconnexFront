import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { NON_CONFORMING_STATE, PAGE_LIST_SIZE, PENDING_ADMISSION_STATE } from 'src/app/commons/constants';
import { DDIA_STATE_CHANGE_EVENT } from 'src/app/commons/constants-events-notifs';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { VerifSourceService } from 'src/app/services/agent-services/verif-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherSourceVerifierService } from 'src/app/services/pusher/pusher-source-verifier.service';

@Component({
  selector: 'app-verif-source-list-ddia-received',
  templateUrl: './verif-source-list-ddia-received.component.html',
  styleUrls: ['./verif-source-list-ddia-received.component.scss']
})
export class VerifSourceListDDIAReceivedComponent implements OnInit {

  dateOrder = 'ascendingDate';
  ddiaType = 'all';
  page = '1';
  pagesNb: number;
  ddiaActionsList: ActionOnDDIA[];
  errors: string[];
  constructor(
    private authService: AuthManagerService,
    private verifSourceService: VerifSourceService,
    private pusherVerifService: PusherSourceVerifierService
  ) {
    this.pusherVerifService.actionDataSubject.subscribe(
      (actionOnDDIA) => {
        console.log(actionOnDDIA);
        if (this.ddiaType === actionOnDDIA.ddiaObject.ddiaType || this.ddiaType === 'all'){
          this.ddiaActionsList.unshift(actionOnDDIA);
        }
      }
    );

    this.pusherVerifService.notificationStateChange.subscribe(
      (notif) => {
        if (notif.newDDIAState === PENDING_ADMISSION_STATE || notif.newDDIAState === NON_CONFORMING_STATE){
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
  }

  ngOnInit(): void {
    this.reloadDDIAItems();
  }

  onPageChange(page: string): void {
    this.page = page;
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

  reloadDDIAItems(): void {
    this.verifSourceService.getDDIAListInWaiting(this.ddiaType, this.dateOrder, this.page)
    .then((ddiaActions) => {
      this.ddiaActionsList = ddiaActions.actionsAgent;
      this.pagesNb = Math.ceil(ddiaActions.counts / PAGE_LIST_SIZE);
    })
    .catch((err: HttpErrorResponse) => {

    });
  }


}
