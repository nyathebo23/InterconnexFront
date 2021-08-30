import { Component, OnDestroy, OnInit } from '@angular/core';
import { MDBModalService } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { Notification } from 'src/app/models/notification.model';
import { User } from 'src/app/models/user.model';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherSourceVerifierService } from 'src/app/services/pusher/pusher-source-verifier.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { NotificationDisplayService } from 'src/app/services/shared/notification-display.service';
import { ModalReceiveDDIANotifComponent } from 'src/app/shared-components/components/modal-receive-ddia-notif/modal-receive-ddia-notif.component';
import * as ROLES from '../../commons/constants-roles';
import { NOTIFICATIONS_SOURCEVERIF } from '../../commons/urls-backend';

@Component({
  selector: 'app-base-verif-source',
  templateUrl: './base-verif-source.component.html',
  styleUrls: ['./base-verif-source.component.scss']
})
export class BaseVerifSourceComponent implements OnInit, OnDestroy {

  navLinks: {name: string, iconClass: string, url: string}[];
  accessibleViews: {label: string, url: string}[] = [];
  subscription: Subscription;
  user: User;
  notifs: Notification[];
  constructor(
    private pusherVerifSourceService: PusherSourceVerifierService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private notifiationDisplayService: NotificationDisplayService,
    private authService: AuthManagerService
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
          idNotif: notif.id,
          contentText: contenttext,
          typeDDIA: notif.typeDDIA,
          refDDIA: notif.refDDIA,
          urlDDIADetails: '/sourceverifier/receivedddia/present-ddia/' + ddiatype + '/' + ddiaId
        };
        this.modalService.show(ModalReceiveDDIANotifComponent,
        this.modalDisplayService.getModalOptions(data, 'modal-dialog modal-notify modal-info'));
        this.notifiationDisplayService.notifToAddSubject.next(notif);
      }
    );
    this.notifiationDisplayService.getNotifications(NOTIFICATIONS_SOURCEVERIF)
    .subscribe(
      (notifs)  => {
        this.notifiationDisplayService.notifsListSubject.next(notifs);
      }
    );
    this.user = this.authService.getUser();
    this.accessibleViews.push({label: 'DDIA Initiation', url: '/source'});
    if (this.user.isStaff){
      this.accessibleViews.push({label: 'Administrator', url: '/admin'});
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
