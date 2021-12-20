import { Injectable } from '@angular/core';
import { AuthManagerService } from '../auth-services/auth-manager.service';
import { NotificationResp } from 'src/app/interfaces/notification-resp.interface';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { Subject } from 'rxjs';
import { Notification } from 'src/app/models/notification.model';
import { RECEPTION_SIGNAL_APPROBATION, RECEPTION_VALIDATION, DDIA_STATE_CHANGE_EVENT, RECEPTION_VALIDATION_SOURCECOMMANDER } from 'src/app/commons/constants-events-notifs';

@Injectable({
  providedIn: 'root'
})
export class PusherNationalInformerService {

  channel: any;
  notificationSubject: Subject<[Notification, string]> = new Subject<[Notification, string]>();
  notificationStateChange: Subject<Notification> = new Subject<Notification>();
  actionDataSubject: Subject<ActionOnDDIA> = new Subject<ActionOnDDIA>();
  actionDataApproveSubject: Subject<ActionOnDDIA> = new Subject<ActionOnDDIA>();
  constructor(private authService: AuthManagerService) {
    if (window.globalThis.pusher){
      const nationalinf = this.authService.getNationalInf();
      this.channel = window.globalThis.pusher.subscribe('inf-nat' + nationalinf.id);
      this.channel.bind( RECEPTION_VALIDATION_SOURCECOMMANDER, (data: NotificationResp) => {
        this.notificationSubject.next([Notification.fromJSON(data.notification), data.data.ddia_object.id]);
        this.actionDataSubject.next(ActionOnDDIA.fromJSON(data.data));
      });
      this.channel.bind( RECEPTION_VALIDATION, (data: NotificationResp) => {
        this.notificationSubject.next([Notification.fromJSON(data.notification), data.data.ddia_object.id]);
        this.actionDataSubject.next(ActionOnDDIA.fromJSON(data.data));
      });
      this.channel.bind( RECEPTION_SIGNAL_APPROBATION, (data: NotificationResp) => {
        this.notificationSubject.next([Notification.fromJSON(data.notification), data.data.ddia_object.id]);
        this.actionDataApproveSubject.next(ActionOnDDIA.fromJSON(data.data));
      });
      this.channel.bind( DDIA_STATE_CHANGE_EVENT, (data: NotificationResp) => {
        this.notificationStateChange.next(Notification.fromJSON(data.notification));
      });
    }
  }}
