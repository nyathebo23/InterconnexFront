import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable , Subject, throwError } from 'rxjs';
import * as URLS from '../../commons/urls-backend';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { ActionsOnDDIAList, PaginateActionOnDDIAResp } from 'src/app/interfaces/responses.interface';
import { Notification } from 'src/app/models/notification.model';
import { NotificationI } from 'src/app/interfaces/notification.interface';
import { CountAerodromeDDIA } from 'src/app/models/count-ddia.model';
import { CountAerodromeDDIAI } from 'src/app/interfaces/count-ddia.interface';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class InformateurLocalService {

  errorsSubject: Subject<string> = new Subject<string>();
  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  getDDIAListInWaiting(typeDDIA: string, dateOrder: string, page: string): Observable<ActionsOnDDIAList> {
    return this.http.get<PaginateActionOnDDIAResp>(URLS.LOCALINFORMER_DDIA_IN_WAITING + typeDDIA, {
      params: {
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
      }));
  }

  getDDIAListProcessed(typeDDIA: string, state: string, dateOrder: string, page: string): Observable<ActionsOnDDIAList> {
    return this.http.get<PaginateActionOnDDIAResp>(URLS.LOCALINFORMER_DDIA_PROCESSED + typeDDIA, {
      params: {
        state,
        page,
        date_order: dateOrder,
      }
    }).pipe(
      catchError(this.handleError),
      map((resDatas: PaginateActionOnDDIAResp) => {
        const validations = new Array<ActionOnDDIA>();
        resDatas.results.forEach((data) => {
            validations.push(ActionOnDDIA.fromJSON(data));
          });
        return {actionsAgent: validations, counts: resDatas.counts};
      }));
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<NotificationI[]>(URLS.NOTIFICATIONS_LOCALINF)
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

  validateDDIA(id: string, typeDDIA): void{
    this.http.post(URLS.VALIDATE_DDIA + typeDDIA + '/' + id, {});
  }

  getStatsOnDDIALocalInfAuthority(year: string, allDDIA: string): Observable<CountAerodromeDDIA[]> {
    return this.http.get<CountAerodromeDDIAI[]>(URLS.STATS_LOCALINFORMER, {
      params: {
        year,
        all: allDDIA
      }
    }).pipe(
      map((res) => {
        const aerodromesCountDDIA = new Array<CountAerodromeDDIA>();
        res.forEach((data) => aerodromesCountDDIA.push(CountAerodromeDDIA.fromJSON(data)));
        return aerodromesCountDDIA;
      })
    );
  }

  setError(err: string): void {
    this.errorHandlingService.errorsSubject.next(err);
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

}
