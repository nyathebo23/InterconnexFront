import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable , throwError } from 'rxjs';
import * as URLS from '../../commons/urls-backend';
import { UnitI } from 'src/app/interfaces/unit.interface';
import { AerodromeI } from 'src/app/interfaces/aerodrome.interface';
import { LocalInformerI } from 'src/app/interfaces/local-informer.interface';
import { NationalInformerI } from 'src/app/interfaces/national-informer.interface';
import { Unit } from 'src/app/models/unit.model';
import { NationalInformer } from 'src/app/models/national-informer.model';
import { LocalInformer } from 'src/app/models/local-informer.model';
import { LocalInformerExtendI } from 'src/app/interfaces/local-informer-extend.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUnitsList(): Observable<Unit[]>{
    return this.http.get<UnitI[]>(URLS.UNIT_CRU).pipe(
      catchError(this.handleError),
      map((resDatas: UnitI[]) => {
        const units = new Array<Unit>();
        resDatas.forEach((data) => {
            units.push(Unit.fromJSON(data));
          });
        return units;
      }));
  }

  getAerodromesList(): Observable<any[]>{
    return this.http.get<AerodromeI[]>(URLS.AERODROME_CRU);
  }

  getLocalInformersList(): Observable<LocalInformer[]>{
    return this.http.get<LocalInformerExtendI[]>(URLS.LOCAL_INFORMER_CRU).pipe(
      catchError(this.handleError),
      map((resDatas: LocalInformerExtendI[]) => {
        const localInformers = new Array<LocalInformer>();
        resDatas.forEach((data) => {
            localInformers.push(LocalInformer.fromJSON(data));
          });
        return localInformers;
      }));
  }

  getNationalInformersList(): Observable<any[]>{
    return this.http.get<NationalInformerI[]>(URLS.LOCAL_INFORMER_CRU).pipe(
      catchError(this.handleError),
      map((resDatas: NationalInformerI[]) => {
        const nationalInformers = new Array<NationalInformer>();
        resDatas.forEach((data) => {
            nationalInformers.push(NationalInformer.fromJSON(data));
          });
        return nationalInformers;
      }));
  }

  createUnit(formData: FormData): Observable<any> {
    return this.http.post(URLS.UNIT_CRU, formData);
  }

  createAerodrome(formData: FormData): Observable<any> {
    return this.http.post(URLS.AERODROME_CRU, formData);
  }

  createNationalInformer(formData: FormData): Observable<any>  {
    return this.http.post(URLS.NATIONAL_INFORMER_CRU, formData);
  }

  createLocalInformer(formData: FormData): Observable<any> {
    return this.http.post(URLS.LOCAL_INFORMER_CRU, formData);
  }

  updateUnit(id: string, formData: FormData): Observable<any> {
    return this.http.post(URLS.UNIT_CRU + id, formData);
  }

  updateAerodrome(id: string, formData: FormData): Observable<any> {
    return this.http.post(URLS.AERODROME_CRU + id, formData);
  }

  updateNationalInformer(id: string, formData: FormData): Observable<any>  {
    return this.http.post(URLS.NATIONAL_INFORMER_CRU + id, formData);
  }

  updateLocalInformer(id: string, formData: FormData): Observable<any> {
    return this.http.post(URLS.LOCAL_INFORMER_CRU + id, formData);
  }

  createLocalAgent(formData: FormData): Observable<any> {
    return this.http.post(URLS.LOCAL_AGENT_CRU, formData);
  }

  createNationalAgent(formData: FormData): Observable<any> {
    return this.http.post(URLS.NATIONAL_AGENT_CRU, formData);
  }

  createAgent(formData: FormData): Observable<any> {
    return this.http.post(URLS.AGENT_CRU, formData);
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
