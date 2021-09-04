import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
      catchError(this.handleError),
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

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError('Errors.error');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status === 0){
        return throwError('Errors.serverconnection');

      }
      else if (error.status === 500){
        return throwError('Errors.servererror');
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Errors.error');
  }

  // switch (key) {
  //   case value:
  //     break;
  //   default:
  //     break;
  // }
}
