import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthManagerService } from '../auth-services/auth-manager.service';
import * as URLS from '../../commons/urls-backend';
import { RECEPTION_SUBMISSION } from 'src/app/commons/constants-events-notifs';
import { NotificationResp } from 'src/app/interfaces/notification-resp.interface';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { Subject } from 'rxjs';
import { Notification } from 'src/app/models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class PusherSourceService {

  channel: any;
  notificationSubject: Subject<Notification> = new Subject<Notification>();
  actionDataSubject: Subject<ActionOnDDIA> = new Subject<ActionOnDDIA>();
  constructor(private authService: AuthManagerService) {
    const unit = this.authService.getUnit() ? this.authService.getUnit() :
    (this.authService.getLocalInf() ? this.authService.getLocalInf().unit : null);
    const aerodrome = this.authService.getAerodrome();
    this.channel = window.globalThis.pusher.subscribe('unit' + unit.id);
    this.channel.bind( RECEPTION_SUBMISSION, (data: NotificationResp) => {
        this.notificationSubject.next(Notification.fromJSON(data.notification));
        this.actionDataSubject.next(ActionOnDDIA.fromJSON(data.data));
    });

  }



}
