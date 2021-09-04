import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthManagerService } from '../auth-services/auth-manager.service';
import * as URLS from '../../commons/urls-backend';
import { DDIA_CREATION, DDIA_MUST_BE_PUBLISHED, DDIA_STATE_CHANGE_EVENT, DDIA_VALIDITY_EXP, RECEPTION_SUBMISSION } from 'src/app/commons/constants-events-notifs';
import { NotificationResp } from 'src/app/interfaces/notification-resp.interface';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { Subject } from 'rxjs';
import { Notification } from 'src/app/models/notification.model';
import { DDIAItemList } from 'src/app/models/ddia-item-list.model';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DemandeNOTAMItemList } from 'src/app/models/demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';

@Injectable({
  providedIn: 'root'
})
export class PusherSourceService {

  channel: any;
  notificationSubject: Subject<[Notification, string, string]> = new Subject();
  notificationEventOnDDIASubject: Subject<Notification> = new Subject();
  notificationStateChange: Subject<Notification> = new Subject<Notification>();
  actionDataSubject: Subject<DemandeAICItemList | DemandeNOTAMItemList | DemandeSUPPItemList> = new Subject();
  constructor(private authService: AuthManagerService) {
    const user = authService.getUser();
    const unit = this.authService.getUnit() ? this.authService.getUnit() :
    (this.authService.getLocalInf() ? this.authService.getLocalInf().unit : null);
    const aerodrome = this.authService.getAerodrome();
    this.channel = window.globalThis.pusher.subscribe('unit' + unit.id);
    this.channel.bind( DDIA_CREATION, (data: NotificationResp) => {
        this.notificationSubject.next([Notification.fromJSON(data.notification), data.data.id, user.id]);
        this.actionDataSubject.next(DDIAItemList.fromJSON(data.data));
    });
    this.channel.bind( DDIA_MUST_BE_PUBLISHED, (data: NotificationResp) => {
      this.notificationEventOnDDIASubject.next(Notification.fromJSON(data.notification));
    });
    this.channel.bind( DDIA_VALIDITY_EXP , (data: NotificationResp) => {
      this.notificationEventOnDDIASubject.next(Notification.fromJSON(data.notification));
    });
    this.channel.bind( DDIA_STATE_CHANGE_EVENT, (data: NotificationResp) => {
      this.notificationStateChange.next(Notification.fromJSON(data.notification));
    });
    this.channel.bind( DDIA_STATE_CHANGE_EVENT, (data: NotificationResp) => {
      this.notificationStateChange.next(Notification.fromJSON(data.notification));
    });
  }



}
