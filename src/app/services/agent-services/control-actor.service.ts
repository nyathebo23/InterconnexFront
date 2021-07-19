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

@Injectable({
  providedIn: 'root'
})
export class ControlActorService {

  constructor(private http: HttpClient) {}

  getNOTAMDetailsByUrl(url: string): Observable<DemandeNOTAMI> {
    return this.http.get<DemandeNOTAMI>(url);
  }

  getSUPPAIPDetailsByUrl(url: string): Observable<DemandeSUPPAIPI> {
    return this.http.get<DemandeSUPPAIPI>(url);
  }

  getAICDetailsByUrl(url: string): Observable<DemandeAICI> {
    return this.http.get<DemandeAICI>(url);
  }

  getNOTAMDetailsById(id: string): Observable<DemandeNOTAMI> {
    return this.http.get<DemandeNOTAMI>(URLS.DEMANDE_NOTAM_DETAIL + id);
  }

  getSUPPAIPDetailsById(id: string): Observable<DemandeSUPPAIPI> {
    return this.http.get<DemandeSUPPAIPI>(URLS.DEMANDE_SUPPAIP_DETAIL + id);
  }

  getAICDetailsById(id: string): Observable<DemandeAICI> {
    return this.http.get<DemandeAICI>(URLS.DEMANDE_AIC_DETAIL + id);
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
