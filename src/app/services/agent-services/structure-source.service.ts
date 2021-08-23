import { Injectable, OnInit } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable , throwError } from 'rxjs';
import * as URLS from '../../commons/urls-backend';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { AuthManagerService } from '../auth-services/auth-manager.service';
import { ActionsOnDDIAList, PaginateActionOnDDIAResp } from 'src/app/interfaces/responses.interface';
import { NotificationI } from 'src/app/interfaces/notification.interface';
import { Notification } from 'src/app/models/notification.model';
import { NationalInformer } from 'src/app/models/national-informer.model';
import { NationalInformerI } from 'src/app/interfaces/national-informer.interface';

@Injectable({
  providedIn: 'root'
})
export class StructureSourceService {

  isAerodromeConceded: string;
  errors: string[] = [];
  constructor(private http: HttpClient, private authService: AuthManagerService) {
    this.isAerodromeConceded = this.authService.getAerodrome().isConceded ? 'yes' : 'no';
  }

  getDDIAListInWaiting(typeDDIA: string, dateOrder: string, page: string): Promise<ActionsOnDDIAList> {
    return this.http.get<PaginateActionOnDDIAResp>(URLS.SOURCESTRUCTURE_DDIA_IN_WAITING + typeDDIA, {
      params: {
        from_localinf: this.isAerodromeConceded,
        date_order: dateOrder,
        page
      }
    }).pipe(
      catchError(this.handleError),
      map((resDatas: PaginateActionOnDDIAResp) => {
        const actionsAgent = new Array<ActionOnDDIA>();
        resDatas.results.forEach((data) => {
            actionsAgent.push(ActionOnDDIA.fromJSON(data));
          });
        return {actionsAgent, counts: resDatas.counts};
      })).toPromise();
  }

  getDDIAListProcessed(typeDDIA: string, state: string, dateOrder: string, page: string): Promise<ActionsOnDDIAList> {
    return this.http.get<PaginateActionOnDDIAResp>(URLS.SOURCESTRUCTURE_DDIA_PROCESSED + typeDDIA, {
      params: {
        from_localinf: this.isAerodromeConceded,
        state,
        date_order: dateOrder,
        page
      }
    }).pipe(
      catchError(this.handleError),
      map((resDatas: PaginateActionOnDDIAResp) => {
        const actionsAgent = new Array<ActionOnDDIA>();
        resDatas.results.forEach((data) => {
            actionsAgent.push(ActionOnDDIA.fromJSON(data));
          });
        return {actionsAgent, counts: resDatas.counts};
      })).toPromise();
  }


  getNationalInformerDDIATargeted(ddiaClassName: string, idDDIA: string): Promise<NationalInformer> {
    return this.http.get<NationalInformerI>(URLS.NATIONAL_INFORMER_TARGET_DDIA + ddiaClassName + '/' + idDDIA)
    .pipe(
      map((res: NationalInformerI) => NationalInformer.fromJSON(res))
    ).toPromise();
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<NotificationI[]>(URLS.NOTIFICATIONS_SOURCESTRUCTURE)
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

  admitDDIA(id: string, classNameDDIA: string, data: {[key: string]: string}): Promise<any>{
    if (!(this.isAerodromeConceded === 'yes')){
      data.afterapprove = 'no';
    }
    return this.http.post(URLS.ADMIT_DDIA + classNameDDIA + '/' + id, data, {
      params: {
        from_localinf: this.isAerodromeConceded ? 'yes' : 'no'
      }
    }).toPromise();
  }


  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this.errors = ['An error occurred:' + error.error.message];
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status === 0){
        this.errors = ['Echec de connexion au serveur distant'];
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
