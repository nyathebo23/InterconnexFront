import { Injectable, OnInit } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable , throwError } from 'rxjs';
import { ActionOnDDIAI } from 'src/app/interfaces/action-on-ddia.interface';
import * as URLS from '../../commons/urls-backend';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { AuthManagerService } from '../auth-services/auth-manager.service';

@Injectable({
  providedIn: 'root'
})
export class StructureSourceService {

  isAerodromeConceded: string;
  errors: string[] = [];
  constructor(private http: HttpClient, private authService: AuthManagerService) {
    this.isAerodromeConceded = this.authService.getAerodrome().isConceded ? 'yes' : 'no';
    console.log(this.isAerodromeConceded);
  }

  getDDIAListInWaiting(typeDDIA: string, dateOrder: string): Promise<ActionOnDDIA[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.SOURCESTRUCTURE_DDIA_IN_WAITING + typeDDIA, {
      params: {
        from_localinf: this.isAerodromeConceded,
        date_order: dateOrder
      }
    }).pipe(
      catchError(this.handleError),
      map((resDatas: ActionOnDDIAI[]) => {
        const actionsAgent = new Array<ActionOnDDIA>();
        resDatas.forEach((data) => {
            actionsAgent.push(ActionOnDDIA.fromJSON(data));
          });
        return actionsAgent;
      })).toPromise();
  }

  getDDIAListProcessed(typeDDIA: string, state: string, dateOrder: string): Promise<ActionOnDDIA[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.SOURCESTRUCTURE_DDIA_PROCESSED + typeDDIA, {
      params: {
        from_localinf: this.isAerodromeConceded,
        state,
        date_order: dateOrder
      }
    }).pipe(
      catchError(this.handleError),
      map((resDatas: ActionOnDDIAI[]) => {
        const actionsAgent = new Array<ActionOnDDIA>();
        resDatas.forEach((data) => {
            actionsAgent.push(ActionOnDDIA.fromJSON(data));
          });
        return actionsAgent;
      })).toPromise();
  }


  admitDDIA(id: string, classNameDDIA: string, data: {[key: string]: string}): Promise<any>{
    if (!this.isAerodromeConceded){
      data.afterapprove = 'no';
    }
    return this.http.post(URLS.ADMIT_DDIA + classNameDDIA + '/' + id, data).toPromise();
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
