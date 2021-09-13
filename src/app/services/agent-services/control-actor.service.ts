import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable , Subject, throwError } from 'rxjs';
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
import { Router } from '@angular/router';
import { ErrorHandlingService } from './error-handling.service';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ControlActorService {

  errorsSubject: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient,
    private authService: AuthManagerService,
    private router: Router,
    private errorHandlingService: ErrorHandlingService
  ) {}


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
    const isAerodromeConceded = this.authService.getAerodrome().isConceded;
    if (!isAerodromeConceded){
      data.afterapprove = 'no';
    }
    return this.http.post(URLS.ADMIT_DDIA + classNameDDIA + '/' + id, data, {
      params: {
        from_localinf: isAerodromeConceded ? 'yes' : 'no'
      }
    }).toPromise();
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
    const isAerodromeConceded = this.authService.getAerodrome().isConceded;
    return this.http.post(URLS.VERIFY_DDIA + classNameDDIA + '/' + id, data, {
      params: {
        is_localinf: isAerodromeConceded ? 'yes' : 'no'
      }
    }).toPromise();
  }

  submitDDIAToVerif(ddiaClassName: string, pk: string, data: {[key: string]: string}): Promise<any> {
    return this.http.post(URLS.SUBMIT_DDIA_TOVERIFY + ddiaClassName + '/' + pk, data).toPromise();
  }

  setPublicationCode(ddiaClassName: string, pk: string, code: string): Promise<any> {
    return this.http.post(URLS.SET_PUBLICATION_CODE + ddiaClassName + '/' + pk, {publication_code: code}).toPromise();
  }

  reloadCurrentRoute(): void {
    // const currentUrl = this.router.url;
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate([currentUrl]);
    // });
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    // window.location.reload();
  }

  setError(err: string): void {
    this.errorHandlingService.errorsSubject.next(err);
  }

  downloadFile(path: string, filename: string): void {
    this.http.get(path, {responseType: 'blob'})
    .subscribe(blob => {
      saveAs(blob, filename);
    });
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

  displayErrors(errorResp: HttpErrorResponse): string[]{
    const errors: string[] = [];
    const error = errorResp.error;
    if (error instanceof ErrorEvent) {
      return ['An error occurred: ' + error.message];
    }
    else if (errorResp.status === 500){
      return ['Errors.servererror'];
    }
    else if (errorResp.status === 0){
      return ['Errors.serverconnection'];
    }
    else if (typeof error === 'string'){
      return ['Errors.error'];
    }
    try {
      for (const key of Object.keys(error)) {
        const value = error[key];
        if (Array.isArray(value)){
          for (const elt of value){
            errors.push(key + ' - ' + elt );
          }
        }
        else{
          errors.push(key === 'message' ? value : key + ' - ' + value );
        }
      }
    }
    catch (err) {
        return ['Errors.error'];
    }
    return errors;
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
