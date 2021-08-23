import { Component, OnDestroy, OnInit } from '@angular/core';
import { MDBModalService } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { PusherSourceVerifierService } from 'src/app/services/pusher/pusher-source-verifier.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalReceiveDDIANotifComponent } from 'src/app/shared-components/components/modal-receive-ddia-notif/modal-receive-ddia-notif.component';

@Component({
  selector: 'app-base-verif-source',
  templateUrl: './base-verif-source.component.html',
  styleUrls: ['./base-verif-source.component.scss']
})
export class BaseVerifSourceComponent implements OnInit, OnDestroy {

  navLinks: {name: string, iconClass: string, url: string}[];

  subscription: Subscription;
  constructor(
    private pusherVerifSourceService: PusherSourceVerifierService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
  ) {
    this.navLinks = [
      {name: 'SOURCEVERIFIER.receivedddia', iconClass: 'fas fa-inbox', url: '/sourceverifier/receivedddia'},
      {name: 'SOURCEVERIFIER.processedddia', iconClass: 'fas fa-list', url: '/sourceverifier/processedddia'},
      {name: 'SOURCEVERIFIER.stats', iconClass: 'fas fa-chart-bar', url: '/sourceverifier/stats'}
    ];
  }

  ngOnInit(): void {
    this.subscription = this.pusherVerifSourceService.notificationSubject.subscribe(
      ([notif, ddiaId]) => {
        const contenttext = 'NOTIFICATION.verifReception';
        const ddiatype = notif.typeDDIA.replace(/\s/g, '').toLowerCase();
        const data = {
          contentText: contenttext,
          typeDDIA: notif.typeDDIA,
          refDDIA: notif.refDDIA,
          urlDDIADetails: '/sourceverifier/receivedddia/present-ddia/' + ddiatype + '/' + ddiaId
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
