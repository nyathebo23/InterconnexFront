import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable , throwError } from 'rxjs';
import * as URLS from '../../commons/urls-backend';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { ActionOnDDIAI } from 'src/app/interfaces/action-on-ddia.interface';


@Injectable({
  providedIn: 'root'
})
export class InformateurNationalService {

  constructor(private http: HttpClient) { }

  getDDIAListInWaiting(): Observable<any[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.NATIONALINFORMER_DDIA_IN_WAITING).pipe(
      catchError(this.handleError),
      map((resDatas: ActionOnDDIAI[]) => {
        const validations = new Array<ActionOnDDIA>();
        resDatas.forEach((data) => {
            validations.push(ActionOnDDIA.fromJSON(data));
          });
        return validations;
      }));
  }

  getDDIAListProcessed(): Observable<any[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.NATIONALINFORMER_DDIA_PROCESSED).pipe(
      catchError(this.handleError),
      map((resDatas: ActionOnDDIAI[]) => {
        const approbations = new Array<ActionOnDDIA>();
        resDatas.forEach((data) => {
            approbations.push(ActionOnDDIA.fromJSON(data));
          });
        return approbations;
      }));

  }

  approveDDIA(id: string, typeDDIA): void{
    this.http.post(URLS.APPROVE_DDIA + typeDDIA + '/' + id, {});
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error.status === 0){
        // this.error = 'Echec de connexion au serveur distant';
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
