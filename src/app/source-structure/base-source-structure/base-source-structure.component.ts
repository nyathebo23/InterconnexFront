import { Component, OnDestroy, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { PusherSourceStructureService } from 'src/app/services/pusher/pusher-source-structure.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalReceiveDDIANotifComponent } from 'src/app/shared-components/components/modal-receive-ddia-notif/modal-receive-ddia-notif.component';

@Component({
  selector: 'app-base-source-structure',
  templateUrl: './base-source-structure.component.html',
  styleUrls: ['./base-source-structure.component.scss']
})
export class BaseSourceStructureComponent implements OnInit, OnDestroy {

  modalRef: MDBModalRef;
  subscription: Subscription;
  navLinks: {name: string, iconClass: string, url: string}[];
  constructor(
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private pusherSourceStructService: PusherSourceStructureService,
  ) {
    this.navLinks = [
      {name: 'SOURCESTRUCTURE.receivedddia', iconClass: 'fas fa-inbox', url: '/sourcestructure/receivedddia'},
      {name: 'SOURCESTRUCTURE.processedddia', iconClass: 'fas fa-list', url: '/sourcestructure/processedddia'},
      {name: 'SOURCESTRUCTURE.stats', iconClass: 'fas fa-chart-bar', url: '/sourcestructure/stats'}
    ];
  }

  ngOnInit(): void {
    this.subscription = this.pusherSourceStructService.notificationSubject.subscribe(
      ([notif, ddiaId]) => {
        const contenttext = 'NOTIFICATION.sourcestructReception';
        const ddiatype = notif.typeDDIA.replace(/\s/g, '').toLowerCase();
        const data = {
          contentText: contenttext,
          typeDDIA: notif.typeDDIA,
          refDDIA: notif.refDDIA,
          urlDDIADetails: '/sourcestructure/receivedddia/present-ddia/' + ddiatype + '/' + ddiaId
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
