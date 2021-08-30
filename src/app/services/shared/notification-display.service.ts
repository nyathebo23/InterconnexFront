import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from 'src/app/models/notification.model';
import { NotificationI } from 'src/app/interfaces/notification.interface';
import { PusherSourceService } from '../pusher/pusher-source.service';
import { PusherSourceVerifierService } from '../pusher/pusher-source-verifier.service';
import { PusherSourceStructureService } from '../pusher/pusher-source-structure.service';
import { PusherAuthorityLocalinfService } from '../pusher/pusher-authority-localinf.service';
import { PusherNationalInformerService } from '../pusher/pusher-national-informer.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalDisplayService } from './modal-display.service';
import { ModalReceiveDDIANotifComponent } from 'src/app/shared-components/components/modal-receive-ddia-notif/modal-receive-ddia-notif.component';
import { DDIA_CREATION } from 'src/app/commons/constants-events-notifs';
import { MARK_NOTIF_AS_READ } from 'src/app/commons/urls-backend';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';


@Injectable({
  providedIn: 'root'
})
export class NotificationDisplayService {

  actionDDIAToAddSubject = new Subject<ActionOnDDIA>();
  idDDIARemoveSubject = new Subject<string>();
  notifToAddSubject = new Subject<Notification>();
  notifsListSubject = new Subject<Notification[]>();
  constructor(
    private http: HttpClient,
  ) {}

  getNotifications(url: string): Observable<Notification[]> {
    return this.http.get<NotificationI[]>(url)
    .pipe(
      map((notifs: NotificationI[]) => {
        const notifications = new Array<Notification>();
        notifs.forEach((notif) => {
          notifications.push(Notification.fromJSON(notif));
        });
        return notifications;
      })
    );
  }

  markAsRead(id: string): Promise<{message: string}> {
    return this.http.get<{message: string}>(MARK_NOTIF_AS_READ + id).toPromise();
  }


  // switch (key) {
  //   case value:
  //     break;
  //   default:
  //     break;
  // }
}
