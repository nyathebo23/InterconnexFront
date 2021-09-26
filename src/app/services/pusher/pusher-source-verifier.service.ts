import { Injectable } from '@angular/core';
import { AuthManagerService } from '../auth-services/auth-manager.service';
import { NotificationResp } from 'src/app/interfaces/notification-resp.interface';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { Subject } from 'rxjs';
import { Notification } from 'src/app/models/notification.model';
import { DDIA_STATE_CHANGE_EVENT, RECEPTION_SUBMISSION } from 'src/app/commons/constants-events-notifs';

@Injectable({
  providedIn: 'root'
})
export class PusherSourceVerifierService {

  channel: any;
  // channelSourceStruct: any;
  notificationSubject: Subject<[Notification, string]> = new Subject<[Notification, string]>();
  notificationStateChange: Subject<Notification> = new Subject<Notification>();
  actionDataSubject: Subject<ActionOnDDIA> = new Subject<ActionOnDDIA>();
  constructor(private authService: AuthManagerService) {
    if (window.globalThis.pusher){
      const aerodrome = this.authService.getAerodrome();
      this.channel = window.globalThis.pusher.subscribe('verif-source' + aerodrome.locationInd);
      this.channel.bind(RECEPTION_SUBMISSION, (data: NotificationResp) => {
        this.notificationSubject.next([Notification.fromJSON(data.notification), data.data.ddia_object.id]);
        this.actionDataSubject.next(ActionOnDDIA.fromJSON(data.data));
      });
      this.channel.bind(DDIA_STATE_CHANGE_EVENT, (data: NotificationResp) => {
        this.notificationStateChange.next(Notification.fromJSON(data.notification));
      });
    }
    // this.channelSourceStruct = globalThis.pusher.subscribe('aerodrome' + aerodrome.locationInd);
  }
}
