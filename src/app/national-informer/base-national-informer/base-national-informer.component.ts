import { Component, OnDestroy, OnInit } from '@angular/core';
import { MDBModalService } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { RECEPTION_SIGNAL_APPROBATION, RECEPTION_VALIDATION, RECEPTION_VALIDATION_SOURCECOMMANDER } from 'src/app/commons/constants-events-notifs';
import { PusherNationalInformerService } from 'src/app/services/pusher/pusher-national-informer.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalReceiveDDIANotifComponent } from 'src/app/shared-components/components/modal-receive-ddia-notif/modal-receive-ddia-notif.component';

@Component({
  selector: 'app-base-national-informer',
  templateUrl: './base-national-informer.component.html',
  styleUrls: ['./base-national-informer.component.scss']
})
export class BaseNationalInformerComponent implements OnInit, OnDestroy {

  navLinks: {name: string, iconClass: string, url: string}[];
  subscription: Subscription;
  constructor(
    private pusherNationalInfService: PusherNationalInformerService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
  ) {
    this.navLinks = [
      {name: 'NATIONALINFORMER.receivedddia', iconClass: 'fas fa-inbox', url: '/nationalinformer/receivedddia'},
      {name: 'NATIONALINFORMER.processedddia', iconClass: 'fas fa-list', url: '/nationalinformer/processedddia'},
      {name: 'NATIONALINFORMER.stats', iconClass: 'fas fa-chart-bar', url: '/nationalinformer/stats'}
    ];
  }

  ngOnInit(): void {
    this.subscription = this.pusherNationalInfService.notificationSubject.subscribe(
      ([notif, ddiaId]) => {
        let contenttext = '';
        if (notif.event === RECEPTION_SIGNAL_APPROBATION){
          contenttext = 'NOTIFICATION.nationalinfReception';
        }
        else if (notif.event === RECEPTION_VALIDATION){
          contenttext = 'NOTIFICATION.nationalinfReception';
        }
        else if (notif.event === RECEPTION_VALIDATION_SOURCECOMMANDER){
          contenttext = 'NOTIFICATION.nationalinfReception';
        }
        const ddiatype = notif.typeDDIA.replace(/\s/g, '').toLowerCase();
        const data = {
          contentText: contenttext,
          typeDDIA: notif.typeDDIA,
          refDDIA: notif.refDDIA,
          urlDDIADetails: '/nationalinformer/receivedddia/present-ddia/' + ddiatype + '/' + ddiaId
        };
        this.modalService.show(ModalReceiveDDIANotifComponent,
        this.modalDisplayService.getModalOptions(data, 'modal-dialog modal-notify modal-info'));
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
