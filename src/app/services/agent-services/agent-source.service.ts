import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable , throwError } from 'rxjs';
import * as URLS from '../../commons/urls-backend';
import { DemandeNOTAMItemList } from 'src/app/models/demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DDIAItemList } from 'src/app/models/ddia-item-list.model';
import { Router } from '@angular/router';
import { ListDDIA, PaginateDDIAListResp } from 'src/app/interfaces/responses.interface';
import { CountUnitDDIAI } from 'src/app/interfaces/count-ddia.interface';
import { CountUnitDDIA } from 'src/app/models/count-ddia.model';

@Injectable({
  providedIn: 'root'
})
export class AgentSourceService {

  headers = new HttpHeaders();
  constructor(private http: HttpClient, private router: Router) {
    this.headers.append('Content-Type', 'multipart/form-data');
  }

  createNOTAM(formData: FormData): Promise<any> {
    return this.http.post(URLS.DEMANDE_NOTAM_CREATE, formData, {headers: this.headers}).toPromise();
  }

  createAIC(formData: FormData): Promise<any> {
    return this.http.post(URLS.DEMANDE_AIC_CREATE, formData, {headers: this.headers}).toPromise();
  }

  createSUPPAIP(formData: FormData): Promise<any> {
    return this.http.post(URLS.DEMANDE_SUPPAIP_CREATE, formData, {headers: this.headers}).toPromise();
  }

  updateNOTAM(formData: FormData): Promise<any> {
    return this.http.put(URLS.DEMANDE_NOTAM_UPDATE, formData, {headers: this.headers}).toPromise();
  }

  updateAIC(formData: FormData): Promise<any> {
    return this.http.put(URLS.DEMANDE_AIC_UPDATE, formData, {headers: this.headers}).toPromise();
  }

  updateSUPPAIP(formData: FormData): Promise<any> {
    return this.http.put(URLS.DEMANDE_SUPPAIP_UPDATE, formData, {headers: this.headers}).toPromise();
  }

  submitDDIAToVerif(ddiaClassName: string, pk: string, data: {[key: string]: string}): Promise<any> {
    return this.http.post(URLS.SUBMIT_DDIA_TOVERIFY + ddiaClassName + '/' + pk, data).toPromise();
  }

  cancelDDIA(ddiaClassName: string, pk: string): Promise<any> {
    return this.http.post(URLS.CANCEL_DDIA + ddiaClassName + '/' + pk, {}).toPromise();
  }
  // tslint:disable-next-line:max-line-length
  getListDDIAInitiatedByUnit(typeDDIA: string, state: string, dateOrder: string, page: string): Observable<ListDDIA> {
    return this.http.get<PaginateDDIAListResp>(URLS.SOURCEAGENT_DDIA_PROCESSED + typeDDIA, {
      params: {
        state,
        date_order: dateOrder,
        page
      }
    }).pipe(
    catchError(this.handleError),
    map((resDatas: PaginateDDIAListResp) => {
      const ddiaList = new Array<DemandeNOTAMItemList | DemandeSUPPItemList | DemandeAICItemList>();
      resDatas.results.forEach((data) => {
        ddiaList.push(DDIAItemList.fromJSON(data));
      });
      return {listDDIA: ddiaList, counts: resDatas.counts};
    }));
  }

  getStatsOnDDIAUnit(year: string, allDDIA: string): Promise<CountUnitDDIA> {
    return this.http.get<CountUnitDDIAI>(URLS.STATS_SOURCEAGENT, {
      params: {
        year,
        all: allDDIA
      }
    }).pipe(
      map((res) => CountUnitDDIA.fromJSON(res))
    ).toPromise();
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
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
      return [error];
    }
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
    return errors;
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
