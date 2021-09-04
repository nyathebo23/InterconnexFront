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
import { Aerodrome } from 'src/app/models/aerodrome.model';

@Injectable({
  providedIn: 'root'
})
export class InformateurNationalService {

  errorsSubject: Subject<string> = new Subject<string>();
  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  getDDIAListInWaiting(typeDDIA: string, dateOrder: string, page: string): Observable<ActionsOnDDIAList> {
    return this.http.get<PaginateActionOnDDIAResp>(URLS.NATIONALINFORMER_DDIA_IN_WAITING + typeDDIA, {
      params: {
        date_order: dateOrder,
        page
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

  getDDIAListProcessed(typeDDIA: string, state: string, dateOrder: string, page: string): Observable<ActionsOnDDIAList> {
    return this.http.get<PaginateActionOnDDIAResp>(URLS.NATIONALINFORMER_DDIA_PROCESSED + typeDDIA, {
      params: {
        state,
        date_order: dateOrder,
        page
      }
    }).pipe(
      catchError(this.handleError),
      map((resDatas: PaginateActionOnDDIAResp) => {
        const approbations = new Array<ActionOnDDIA>();
        resDatas.results.forEach((data) => {
            approbations.push(ActionOnDDIA.fromJSON(data));
          });
        return {actionsAgent: approbations, counts: resDatas.counts};
      }));

  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<NotificationI[]>(URLS.NOTIFICATIONS_LOCALINF)
    .pipe(
      catchError(this.handleError),
      map((notifs: NotificationI[]) => notifs.map((notif) => Notification.fromJSON(notif)))
    );
  }

  getStatsOnDDIANationalInf(year: string, allDDIA: string): Observable<CountAerodromeDDIA[]> {
    return this.http.get<CountAerodromeDDIAI[]>(URLS.STATS_NATIONALINFORMER, {
      params: {
        year,
        all: allDDIA
      }
    }).pipe(
      catchError(this.handleError),
      map((res) => res.map((val) => CountAerodromeDDIA.fromJSON(val)))
    );
  }

  approveDDIA(id: string, typeDDIA): void{
    this.http.post(URLS.APPROVE_DDIA + typeDDIA + '/' + id, {});
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
