import { Component, OnDestroy, OnInit } from '@angular/core';
import { MDBModalService } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { RECEPTION_SIGNAL_APPROBATION, RECEPTION_VALIDATION, RECEPTION_VALIDATION_SOURCECOMMANDER } from 'src/app/commons/constants-events-notifs';
import { User } from 'src/app/models/user.model';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherNationalInformerService } from 'src/app/services/pusher/pusher-national-informer.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalReceiveDDIANotifComponent } from 'src/app/shared-components/components/modal-receive-ddia-notif/modal-receive-ddia-notif.component';
import { Notification } from 'src/app/models/notification.model';
import { NotificationDisplayService } from 'src/app/services/shared/notification-display.service';
import { NOTIFICATIONS_NATIONALINF } from 'src/app/commons/urls-backend';

@Component({
  selector: 'app-base-national-informer',
  templateUrl: './base-national-informer.component.html',
  styleUrls: ['./base-national-informer.component.scss']
})
export class BaseNationalInformerComponent implements OnInit, OnDestroy {

  navLinks: {name: string, iconClass: string, url: string}[];
  accessibleViews: {label: string, url: string}[] = [];
  subscription: Subscription;
  user: User;
  notifs: Notification[];
  constructor(
    private pusherNationalInfService: PusherNationalInformerService,
    private notifiationDisplayService: NotificationDisplayService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private authService: AuthManagerService
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
          idNotif: notif.id,
          contentText: contenttext,
          typeDDIA: notif.typeDDIA,
          refDDIA: notif.refDDIA,
          urlDDIADetails: '/nationalinformer/receivedddia/present-ddia/' + ddiatype + '/' + ddiaId
        };
        this.modalService.show(ModalReceiveDDIANotifComponent,
        this.modalDisplayService.getModalOptions(data, 'modal-dialog modal-notify modal-info'));
        this.notifiationDisplayService.notifToAddSubject.next(notif);
      }
    );
    this.notifiationDisplayService.getNotifications(NOTIFICATIONS_NATIONALINF)
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
