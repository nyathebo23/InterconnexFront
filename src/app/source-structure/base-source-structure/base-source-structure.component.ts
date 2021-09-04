import { Component, OnDestroy, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { NOTIFICATIONS_SOURCESTRUCTURE } from 'src/app/commons/urls-backend';
import { Notification } from 'src/app/models/notification.model';
import { User } from 'src/app/models/user.model';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherSourceStructureService } from 'src/app/services/pusher/pusher-source-structure.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { NotificationDisplayService } from 'src/app/services/shared/notification-display.service';
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
  accessibleViews: {label: string, url: string}[] = [];
  user: User;
  notifs: Notification[];
  constructor(
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private pusherSourceStructService: PusherSourceStructureService,
    private notifiationDisplayService: NotificationDisplayService,
    private authService: AuthManagerService
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
          idNotif: notif.id,
          contentText: contenttext,
          typeDDIA: notif.typeDDIA,
          refDDIA: notif.refDDIA,
          urlDDIADetails: '/sourcestructure/receivedddia/present-ddia/' + ddiatype + '/' + ddiaId
        };
        this.modalService.show(ModalReceiveDDIANotifComponent,
        this.modalDisplayService.getModalOptions(data, 'modal-dialog modal-notify modal-info'));
        this.notifiationDisplayService.notifToAddSubject.next(notif);
      }
    );
    this.notifiationDisplayService.getNotifications(NOTIFICATIONS_SOURCESTRUCTURE)
    .subscribe(
      (notifs)  => {
        this.notifiationDisplayService.notifsListSubject.next(notifs);
      }, error => {
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
