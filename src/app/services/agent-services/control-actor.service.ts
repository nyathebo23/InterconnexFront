import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable , throwError } from 'rxjs';
import * as URLS from '../../commons/urls-backend';
import { DemandeNOTAMI } from 'src/app/interfaces/demande-notam.interface';
import { DemandeSUPPAIPI } from 'src/app/interfaces/demande-supp.interface';
import { DemandeAICI } from 'src/app/interfaces/demande-aic.interface';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { ActionOnDDIAI } from 'src/app/interfaces/action-on-ddia.interface';
import { AuthManagerService } from '../auth-services/auth-manager.service';
import { DemandeNOTAM } from 'src/app/models/demande-notam.model';
import { DemandeSUPPAIP } from 'src/app/models/demande-suppaip.model';
import { DemandeAIC } from 'src/app/models/demande-aic.model';

@Injectable({
  providedIn: 'root'
})
export class ControlActorService {

  constructor(private http: HttpClient, private authService: AuthManagerService) {}

  getDDIAListInWaitingForNationalInf(typeDDIA: string): Observable<ActionOnDDIA[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.NATIONALINFORMER_DDIA_IN_WAITING + typeDDIA).pipe(
      catchError(this.handleError),
      map((resDatas: ActionOnDDIAI[]) => {
        const validations = new Array<ActionOnDDIA>();
        resDatas.forEach((data) => {
            validations.push(ActionOnDDIA.fromJSON(data));
          });
        return validations;
      }));
  }

  getDDIAListProcessedForNationalInf(typeDDIA: string): Observable<ActionOnDDIA[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.NATIONALINFORMER_DDIA_PROCESSED + typeDDIA).pipe(
      catchError(this.handleError),
      map((resDatas: ActionOnDDIAI[]) => {
        const approbations = new Array<ActionOnDDIA>();
        resDatas.forEach((data) => {
            approbations.push(ActionOnDDIA.fromJSON(data));
          });
        return approbations;
      }));
  }

  approveDDIA(id: string, classNameDDIA: string, data: {[key: string]: string}): Promise<any>{
    return this.http.post(URLS.APPROVE_DDIA + classNameDDIA + '/' + id, data).toPromise();
  }

  getDDIAListInWaitingForExtLocalInf(typeDDIA: string): Observable<ActionOnDDIA[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.LOCALINFORMER_DDIA_IN_WAITING + typeDDIA).pipe(
      catchError(this.handleError),
      map((resDatas: ActionOnDDIAI[]) => {
        const actionsAgent = new Array<ActionOnDDIA>();
        resDatas.forEach((data) => {
            actionsAgent.push(ActionOnDDIA.fromJSON(data));
          });
        return actionsAgent;
      }));
  }

  getDDIAListProcessedForExtLocalInf(typeDDIA: string): Observable<ActionOnDDIA[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.LOCALINFORMER_DDIA_PROCESSED + typeDDIA).pipe(
      catchError(this.handleError),
      map((resDatas: ActionOnDDIAI[]) => {
        const validations = new Array<ActionOnDDIA>();
        resDatas.forEach((data) => {
            validations.push(ActionOnDDIA.fromJSON(data));
          });
        return validations;
      }));
  }

  validateDDIA(id: string, classNameDDIA: string, data: {[key: string]: string}): Promise<any>{
    return this.http.post(URLS.VALIDATE_DDIA + classNameDDIA + '/' + id, data).toPromise();
  }

getDDIAListInWaitingForSourceStructure(typeDDIA: string, fromLocalInf: string): Observable<ActionOnDDIA[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.SOURCESTRUCTURE_DDIA_IN_WAITING + typeDDIA).pipe(
      catchError(this.handleError),
      map((resDatas: ActionOnDDIAI[]) => {
        const actionsAgent = new Array<ActionOnDDIA>();
        resDatas.forEach((data) => {
            actionsAgent.push(ActionOnDDIA.fromJSON(data));
          });
        return actionsAgent;
      }));
  }

  getDDIAListProcessedForSourceStructure(typeDDIA: string, fromLocalInf: string): Observable<ActionOnDDIA[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.SOURCESTRUCTURE_DDIA_PROCESSED + typeDDIA).pipe(
      catchError(this.handleError),
      map((resDatas: ActionOnDDIAI[]) => {
        const validations = new Array<ActionOnDDIA>();
        resDatas.forEach((data) => {
            validations.push(ActionOnDDIA.fromJSON(data));
          });
        return validations;
      }));
  }

  admitDDIA(id: string, classNameDDIA: string, data: {[key: string]: string}): Promise<any>{
    return this.http.post(URLS.ADMIT_DDIA + classNameDDIA + '/' + id, data).toPromise();
  }

  getDDIAListInWaitingForSourceVerifier(typeDDIA: string, isLocalInf: string): Observable<ActionOnDDIA[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.SOURCEVERIFIER_DDIA_IN_WAITING + typeDDIA, {
      params: {is_localinf: isLocalInf}
    }).pipe(
      catchError(this.handleError),
      map((resDatas: ActionOnDDIAI[]) => {
        const actionsAgent = new Array<ActionOnDDIA>();
        resDatas.forEach((data) => {
            actionsAgent.push(ActionOnDDIA.fromJSON(data));
          });
        return actionsAgent;
      }));
  }

  getDDIAListProcessedForSourceVerifier(typeDDIA: string, isLocalInf: string): Observable<ActionOnDDIA[]> {
    return this.http.get<ActionOnDDIAI[]>(URLS.SOURCEVERIFIER_DDIA_PROCESSED + typeDDIA, {
      params: {is_localinf: isLocalInf}
    }).pipe(
      catchError(this.handleError),
      map((resDatas: ActionOnDDIAI[]) => {
        const actionsAgent = new Array<ActionOnDDIA>();
        resDatas.forEach((data) => {
            actionsAgent.push(ActionOnDDIA.fromJSON(data));
          });
        return actionsAgent;
      }));
  }

  verifyDDIA(id: string, classNameDDIA: string, data: {[key: string]: string}): Promise<any>{
    return this.http.post(URLS.VERIFY_DDIA + classNameDDIA + '/' + id, data).toPromise();
  }

  getNOTAMDetailsByUrl(url: string): Observable<DemandeNOTAM> {
    return this.http.get<DemandeNOTAMI>(url).pipe(
      catchError(this.handleError),
      map((data: DemandeNOTAMI) => DemandeNOTAM.fromJSON(data))
    );
  }

  getSUPPAIPDetailsByUrl(url: string): Observable<DemandeSUPPAIP> {
    return this.http.get<DemandeSUPPAIPI>(url).pipe(
      catchError(this.handleError),
      map((data: DemandeSUPPAIPI) => DemandeSUPPAIP.fromJSON(data))
    );
  }

  getAICDetailsByUrl(url: string): Observable<DemandeAIC> {
    return this.http.get<DemandeAICI>(url).pipe(
      catchError(this.handleError),
      map((data: DemandeAICI) => DemandeAIC.fromJSON(data))
    );
  }

  getNOTAMDetailsById(id: string): Observable<DemandeNOTAM> {
    return this.http.get<DemandeNOTAMI>(URLS.DEMANDE_NOTAM_DETAIL + id).pipe(
      catchError(this.handleError),
      map((data: DemandeNOTAMI) => DemandeNOTAM.fromJSON(data))
    );
  }

  getSUPPAIPDetailsById(id: string): Observable<DemandeSUPPAIP> {
    return this.http.get<DemandeSUPPAIPI>(URLS.DEMANDE_SUPPAIP_DETAIL + id).pipe(
      catchError(this.handleError),
      map((data: DemandeSUPPAIPI) => DemandeSUPPAIP.fromJSON(data))
    );
  }

  getAICDetailsById(id: string): Observable<DemandeAIC> {
    return this.http.get<DemandeAICI>(URLS.DEMANDE_AIC_DETAIL + id).pipe(
      catchError(this.handleError),
      map((data: DemandeAICI) => DemandeAIC.fromJSON(data))
    );
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
