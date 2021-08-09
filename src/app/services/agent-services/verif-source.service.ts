import { Injectable, OnInit } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable , Subject, throwError } from 'rxjs';
import * as URLS from '../../commons/urls-backend';
import { ActionOnDDIAI } from 'src/app/interfaces/action-on-ddia.interface';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { AuthManagerService } from '../auth-services/auth-manager.service';
import { NationalInformer } from 'src/app/models/national-informer.model';
import { NationalInformerI } from 'src/app/interfaces/national-informer.interface';

@Injectable({
  providedIn: 'root'
})
export class VerifSourceService {

  isLocalInf: string;
  errorsSubject: Subject<string> = new Subject<string>();
  errors: string[] = [];
  urlToDDIAProcessed: string;
  constructor(private http: HttpClient, private authService: AuthManagerService) {
    this.isLocalInf = this.authService.getLocalInf() && this.authService.getLocalInf().unit ? 'yes' : 'no';
    this.urlToDDIAProcessed = this.isLocalInf ? URLS.LOCALINFORMERVERIFIER_DDIA_PROCESSED : URLS.SOURCEVERIFIER_DDIA_PROCESSED;

  }

  getDDIAListInWaiting(typeDDIA: string, dateOrder: string): Promise<ActionOnDDIA[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.SOURCEVERIFIER_DDIA_IN_WAITING + typeDDIA, {
      params: {
        is_localinf: this.isLocalInf,
        date_order: dateOrder
      }
    })
    .pipe(
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
    return this.http.get<ActionOnDDIAI[]>(this.urlToDDIAProcessed + typeDDIA, {
      params: {
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

  getNationalInformersList(): Observable<NationalInformer[]>{
    return this.http.get<NationalInformerI[]>(URLS.NATIONAL_INFORMER_CRU)
    .pipe(
      map((nationalinfs: NationalInformerI[]) => {
        console.log(nationalinfs);
        const nationalinformers = new Array<NationalInformer>();
        nationalinfs.forEach((nationalinf) => {
          nationalinformers.push(NationalInformer.fromJSON(nationalinf));
        });
        return nationalinformers;
      })
    );
  }

  verifyDDIA(id: string, classNameDDIA: string, data: {[key: string]: string}): Promise<any>{
    console.log(this.isLocalInf);
    return this.http.post(URLS.VERIFY_DDIA + classNameDDIA + '/' + id, data, {
      params: {
        is_localinf: this.isLocalInf
      }
    }).toPromise();
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this.errors = ['An error occurred: ' + error.error.message];
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
