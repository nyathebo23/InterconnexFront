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
import { AerodromeExtendI } from 'src/app/interfaces/aerodrome-extend.interface';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  errors: string[] = [];
  constructor(private http: HttpClient, private router: Router) { }

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

  getAerodromesList(extend?: string): Observable<any[]>{
    if (extend){
      return this.http.get<AerodromeExtendI[]>(URLS.AERODROME_CRU, {
        params: {extend: 'True'}
      });
    }
    return this.http.get<AerodromeI[]>(URLS.AERODROME_CRU).pipe(
      catchError(this.handleError),
      map((resDatas: AerodromeI[]) => {
        const aerodromes = new Array<Aerodrome>();
        resDatas.forEach((data) => {
            aerodromes.push(Aerodrome.fromJSON(data));
          });
        return aerodromes;
      }));
  }

  getLocalInformersList(extern?: string): Observable<any[]>{
    if (extern){
      return this.http.get<LocalInformerI[]>(URLS.LOCAL_INFORMER_CRU, {
        params: {extern: 'True'}
      });
    }
    return this.http.get<LocalInformerI[]>(URLS.LOCAL_INFORMER_CRU);
  }

  getNationalInformersList(): Observable<any[]>{
    return this.http.get<NationalInformerI[]>(URLS.NATIONAL_INFORMER_CRU);
  }

  createUnit(formData: FormData): Promise<any> {
    return this.http.post(URLS.UNIT_CRU, formData).toPromise();
  }

  createAerodrome(formData: FormData): Promise<any> {
    return this.http.post(URLS.AERODROME_CRU, formData).toPromise();
  }

  createNationalInformer(formData: FormData): Promise<any>  {
    return this.http.post(URLS.NATIONAL_INFORMER_CRU, formData).toPromise();
  }

  createLocalInformer(formData: FormData): Promise<any> {
    return this.http.post(URLS.LOCAL_INFORMER_CRU, formData).toPromise();
  }

  updateUnit(id: string, formData: FormData): Promise<any> {
    return this.http.post(URLS.UNIT_CRU + id, formData).toPromise();
  }

  updateAerodrome(id: string, formData: FormData): Promise<any> {
    return this.http.post(URLS.AERODROME_CRU + id, formData).toPromise();
  }

  updateNationalInformer(id: string, formData: FormData): Promise<any>  {
    return this.http.post(URLS.NATIONAL_INFORMER_CRU + id, formData).toPromise();
  }

  updateLocalInformer(id: string, formData: FormData): Promise<any> {
    return this.http.post(URLS.LOCAL_INFORMER_CRU + id, formData).toPromise();
  }

  deleteUnit(id: string): Promise<any> {
    return this.http.delete(URLS.UNIT_CRU + id).toPromise();
  }

  deleteAerodrome(id: string): Promise<any> {
    return this.http.delete(URLS.AERODROME_CRU + id).toPromise();
  }

  deleteNationalInformer(id: string): Promise<any>  {
    return this.http.delete(URLS.NATIONAL_INFORMER_CRU + id).toPromise();
  }

  deleteLocalInformer(id: string): Promise<any> {
    return this.http.delete(URLS.LOCAL_INFORMER_CRU + id).toPromise();
  }

  signUpUser(formData: FormData): Promise<any> {
    return this.http.post(URLS.SIGNUP, formData).toPromise();
  }

  deleteUser(id: string): Promise<any> {
    return this.http.delete(URLS.DELETE_USER + id).toPromise();
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

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
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
