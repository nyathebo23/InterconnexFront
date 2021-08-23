import { Component, OnDestroy, OnInit } from '@angular/core';
import { MDBModalService } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { PusherAuthorityLocalinfService } from 'src/app/services/pusher/pusher-authority-localinf.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';

import { ModalReceiveDDIANotifComponent } from 'src/app/shared-components/components/modal-receive-ddia-notif/modal-receive-ddia-notif.component';

@Component({
  selector: 'app-base-local-informer',
  templateUrl: './base-local-informer.component.html',
  styleUrls: ['./base-local-informer.component.scss']
})
export class BaseLocalInformerComponent implements OnInit, OnDestroy {

  navLinks: {name: string, iconClass: string, url: string}[];
  subscription: Subscription;
  constructor(
    private pusherLocalInfAuthority: PusherAuthorityLocalinfService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
  ) {
    this.navLinks = [
      {name: 'CCAALOCALINFORMER.receivedddia', iconClass: 'fas fa-inbox', url: '/localinformer/receivedddia'},
      {name: 'CCAALOCALINFORMER.processedddia', iconClass: 'fas fa-list', url: '/localinformer/processedddia'},
      {name: 'CCAALOCALINFORMER.stats', iconClass: 'fas fa-chart-bar', url: '/localinformer/stats'}
    ];
  }

  ngOnInit(): void {
    this.subscription =  this.pusherLocalInfAuthority.notificationSubject.subscribe(
      ([notif, ddiaId]) => {
        const contenttext = 'NOTIFICATION.localinfReception';
        const ddiatype = notif.typeDDIA.replace(/\s/g, '').toLowerCase();
        const data = {
          contentText: contenttext,
          typeDDIA: notif.typeDDIA,
          refDDIA: notif.refDDIA,
          urlDDIADetails: '/localinformer/receivedddia/present-ddia/' + ddiatype + '/' + ddiaId
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
