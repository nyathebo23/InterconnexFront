import { Injectable, OnInit } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable , Subject, throwError } from 'rxjs';
import * as URLS from '../../commons/urls-backend';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { AuthManagerService } from '../auth-services/auth-manager.service';
import { ActionsOnDDIAList, PaginateActionOnDDIAResp } from 'src/app/interfaces/responses.interface';
import { NotificationI } from 'src/app/interfaces/notification.interface';
import { Notification } from 'src/app/models/notification.model';
import { NationalInformer } from 'src/app/models/national-informer.model';
import { NationalInformerI } from 'src/app/interfaces/national-informer.interface';
import { CountAerodromeDDIAI, CountUnitDDIAI } from 'src/app/interfaces/count-ddia.interface';
import { CountAerodromeDDIA, CountUnitDDIA } from 'src/app/models/count-ddia.model';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class StructureSourceService {

  isAerodromeConceded: string;
  errorsSubject: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient,
    private authService: AuthManagerService,
    private errorHandlingService: ErrorHandlingService
  ) {
    this.isAerodromeConceded = this.authService.getAerodrome().isConceded ? 'yes' : 'no';
  }

  getDDIAListInWaiting(typeDDIA: string, dateOrder: string, page: string): Observable<ActionsOnDDIAList> {
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
      }));
  }

  getDDIAListProcessed(typeDDIA: string, state: string, dateOrder: string, page: string): Observable<ActionsOnDDIAList> {
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
      }));
  }


  getNationalInformerDDIATargeted(ddiaClassName: string, idDDIA: string): Observable<NationalInformer> {
    return this.http.get<NationalInformerI>(URLS.NATIONAL_INFORMER_TARGET_DDIA + ddiaClassName + '/' + idDDIA)
    .pipe(
      catchError(this.handleError),
      map((res: NationalInformerI) => NationalInformer.fromJSON(res))
    );
  }


  getStatsOnDDIAAerodrome(year: string, allDDIA: string): Observable<CountAerodromeDDIA> {
    return this.http.get<CountAerodromeDDIAI>(URLS.STATS_SOURCESTRUCTURE, {
      params: {
        year,
        all: allDDIA,
        count_by_unit: 'no'
      }
    }).pipe(
      catchError(this.handleError),
      map((res) => CountAerodromeDDIA.fromJSON(res))
    );
  }

  getStatsOnDDIAAerodromeUnits(year: string, allDDIA: string): Promise<CountUnitDDIA[]> {
    return this.http.get<CountUnitDDIAI[]>(URLS.STATS_SOURCESTRUCTURE, {
      params: {
        year,
        all: allDDIA,
        count_by_unit: 'yes'
      }
    }).pipe(
      map((res) => {
        const unitsDatas = new Array<CountUnitDDIA>();
        res.forEach((data) => unitsDatas.push(CountUnitDDIA.fromJSON(data)));
        return unitsDatas;
      })
    ).toPromise();
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
