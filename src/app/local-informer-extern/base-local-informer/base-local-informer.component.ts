import { Component, OnDestroy, OnInit } from '@angular/core';
import { MDBModalService } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherAuthorityLocalinfService } from 'src/app/services/pusher/pusher-authority-localinf.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { Notification } from 'src/app/models/notification.model';
import { ModalReceiveDDIANotifComponent } from 'src/app/shared-components/components/modal-receive-ddia-notif/modal-receive-ddia-notif.component';
import { NotificationDisplayService } from 'src/app/services/shared/notification-display.service';
import { NOTIFICATIONS_LOCALINF } from 'src/app/commons/urls-backend';

@Component({
  selector: 'app-base-local-informer',
  templateUrl: './base-local-informer.component.html',
  styleUrls: ['./base-local-informer.component.scss']
})
export class BaseLocalInformerComponent implements OnInit, OnDestroy {

  navLinks: {name: string, iconClass: string, url: string}[];
  accessibleViews: {label: string, url: string}[] = [];
  user: User;
  subscription: Subscription;
  notifs: Notification[];
  constructor(
    private pusherLocalInfAuthority: PusherAuthorityLocalinfService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private notifiationDisplayService: NotificationDisplayService,
    private authService: AuthManagerService
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
          idNotif: notif.id,
          contentText: contenttext,
          typeDDIA: notif.typeDDIA,
          refDDIA: notif.refDDIA,
          urlDDIADetails: '/localinformer/receivedddia/present-ddia/' + ddiatype + '/' + ddiaId
        };
        this.modalService.show(ModalReceiveDDIANotifComponent,
        this.modalDisplayService.getModalOptions(data, 'modal-dialog modal-notify modal-info'));
        this.notifiationDisplayService.notifToAddSubject.next(notif);
      }
    );
    this.notifiationDisplayService.getNotifications(NOTIFICATIONS_LOCALINF)
    .subscribe(
      (notifs)  => {
        this.notifiationDisplayService.notifsListSubject.next(notifs);
      }
    );
    this.user = this.authService.getUser();
    if (this.user.isStaff){
      this.accessibleViews.push({label: 'Administrator', url: '/admin'});
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
