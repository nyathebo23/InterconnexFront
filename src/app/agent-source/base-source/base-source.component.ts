import { Component, Input, OnInit } from '@angular/core';
import { MDBModalService } from 'angular-bootstrap-md';
import { Subscription } from 'rxjs';
import { SOURCE_VERIFIER } from 'src/app/commons/constants-roles';
import { User } from 'src/app/models/user.model';
import { Notification } from 'src/app/models/notification.model';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { PusherSourceService } from 'src/app/services/pusher/pusher-source.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalReceiveDDIANotifComponent } from 'src/app/shared-components/components/modal-receive-ddia-notif/modal-receive-ddia-notif.component';
import { NotificationDisplayService } from 'src/app/services/shared/notification-display.service';
import { NOTIFICATIONS_SOURCEUNIT } from 'src/app/commons/urls-backend';

@Component({
  selector: 'app-base-source',
  templateUrl: './base-source.component.html',
  styleUrls: ['./base-source.component.scss']
})
export class BaseSourceComponent implements OnInit {

  navLinks: {name: string, iconClass: string, url: string}[];
  user: User;
  accessibleViews: {label: string, url: string}[] = [];
  subscription: Subscription;
  notifs: Notification[];
  constructor(
    private authService: AuthManagerService,
    private pusherSourceAgentService: PusherSourceService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private notificationDisplayService: NotificationDisplayService
  ) {
    this.navLinks =  [
      {name: 'SOURCEAGENT.initddia', iconClass: 'fab fa-wpforms', url: '/source/initddia/'},
      {name: 'SOURCEAGENT.unitsddia',  iconClass: 'fas fa-list',  url: '/source/unitsddia/'},
      {name: 'SOURCEAGENT.unitsDDIAErroneous', iconClass: 'fas fa-times',  url: '/source/unitsddia-erroneous/'},
      {name: 'SOURCEAGENT.stats', iconClass: 'fas fa-chart-bar',  url: '/source/stats/'},
    ];
    this.user = this.authService.getUser();
    if (this.user.role === SOURCE_VERIFIER){
      this.accessibleViews.push({label: 'DDIA Verification', url: '/sourceverifier'});
    }
    if (this.user.isStaff){
      this.accessibleViews.push({label: 'Administrator', url: '/admin'});
    }
  }

  ngOnInit(): void {
    this.subscription = this.pusherSourceAgentService.notificationSubject.subscribe(
      ([notif, ddiaId, userId]) => {
        if (userId !== this.user.id){
          const contenttext = 'NOTIFICATION.ddiaCreation';
          const ddiatype = notif.typeDDIA.replace(/\s/g, '').toLowerCase();
          const data = {
            idNotif: notif.id,
            contentText: contenttext,
            typeDDIA: notif.typeDDIA,
            refDDIA: notif.refDDIA,
            urlDDIADetails: '/source/unitsddia/present-ddia/' + ddiatype + '/' + ddiaId
          };
          this.modalService.show(ModalReceiveDDIANotifComponent,
          this.modalDisplayService.getModalOptions(data, 'modal-dialog modal-notify modal-info'));
          this.notificationDisplayService.notifToAddSubject.next(notif);
        }
      }
    );
    this.notificationDisplayService.getNotifications(NOTIFICATIONS_SOURCEUNIT)
    .subscribe(
      (notifs)  => {
        this.notificationDisplayService.notifsListSubject.next(notifs);
      },
      error => {

      }
    );
  }

}
