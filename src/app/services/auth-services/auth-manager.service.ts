import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable , throwError } from 'rxjs';
import * as URLS from '../../commons/urls-backend';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user.model';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { LocalInformer } from 'src/app/models/local-informer.model';
import { NationalInformer } from 'src/app/models/national-informer.model';
import { LocalInformerExtend } from 'src/app/models/local-informer-extend.model';
import {TranslateService} from '@ngx-translate/core';
import { UserI } from 'src/app/interfaces/user.interface';
import * as ROLES from '../../commons/constants-roles';
import { Unit } from 'src/app/models/unit.model';
import { UnitSource } from 'src/app/models/unit-source.model';
import { Router } from '@angular/router';
import { AerodromeExtendI } from 'src/app/interfaces/aerodrome-extend.interface';

interface ResponseMessage  {
  message: string;
}

export interface UserResponse{
  access: string;
  refresh: string;
  message?: string;
  user: UserI;
}

@Injectable({
  providedIn: 'root'
})

export class AuthManagerService {

  user: User;
  unit: UnitSource;
  aerodrome: Aerodrome;
  localinformer: LocalInformerExtend;
  nationalinformer: NationalInformer;
  helper = new JwtHelperService();


  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  getUser(): User | null {
    if (!this.user){
      const jsonUser = localStorage.getItem('user');
      // console.log(jsonUser);
      if (!jsonUser){
        return null;
      }
      const user = User.fromJSON(JSON.parse(jsonUser));
      this.user = user;
    }
    return this.user;
  }

  getUnit(): UnitSource {
    if (this.unit){
      return this.unit;
    }
    const jsonData = JSON.parse(localStorage.getItem('agentExtras'));
    if (jsonData && jsonData.unit){
      return UnitSource.fromJSON(jsonData.unit);
    }
    const localinf = this.getLocalInf();
    if (localinf){
      return localinf.unit;
    }
    return null;
  }

  getAerodrome(): Aerodrome {
    if (this.aerodrome){
      return this.aerodrome;
    }
    const jsonData = JSON.parse(localStorage.getItem('agentExtras'));
    if (jsonData && jsonData.aerodrome){
      return Aerodrome.fromJSON(jsonData.aerodrome);
    }
    const localinf = this.getLocalInf();
    if (localinf){
      return localinf.aerodrome;
    }
    return null;
  }

  getLocalInf(): LocalInformerExtend {
    if (this.localinformer){
      return this.localinformer;
    }
    const jsonData = JSON.parse(localStorage.getItem('agentExtras'));
    if (jsonData && jsonData.localinformer){
      return LocalInformerExtend.fromJSON(jsonData.localinformer);
    }
    return null;
  }

  getNationalInf(): NationalInformer {
    if (this.nationalinformer){
      return this.nationalinformer;
    }
    const jsonData = JSON.parse(localStorage.getItem('agentExtras'));
    if (jsonData && jsonData.nationalinformer){
      return NationalInformer.fromJSON(jsonData.nationalinformer);
    }
    return null;
  }

  setUserInStorage(userJSON: UserI): void{
    localStorage.setItem('user', JSON.stringify(userJSON));
  }

  setExtraAgentInfosInStorage(data): void {
    localStorage.setItem('agentExtras', JSON.stringify(data));
  }

  async getNewAccessTokenByRefresh(): Promise<{access: string}> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<{access: string}>(URLS.REFRESH_TOKEN_URL, {refresh: refreshToken}).toPromise();
  }

  setUserAndOther(res: UserResponse): void {
    this.setUserInStorage(res.user);
    this.user = User.fromJSON(res.user);
    this.setTokens(res.access, res.refresh);
    if (ROLES.aerodromeRoles.includes(this.user.role)){
      this.getAgentInfos()
      .then((data) => {
        console.log(data);
        if (data.localinformer){
          this.localinformer = LocalInformerExtend.fromJSON(data.localinformer);
          this.unit = this.localinformer.unit;
          this.aerodrome = this.localinformer.aerodrome;
        }
        else{
          if (data.unit){
            this.unit = UnitSource.fromJSON(data.unit);
          }
          this.aerodrome = Aerodrome.fromJSON(data.aerodrome);
        }
        this.setExtraAgentInfosInStorage(data);
        this.navigateToPage(this.user.role, this.user.isStaff);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else if (ROLES.localInformerRoles.includes(this.user.role)) {
      this.getLocalAgentInfos()
      .then((data) => {
        this.localinformer = LocalInformerExtend.fromJSON(data.localinformer);
        this.setExtraAgentInfosInStorage(data);
        console.log(data);
        this.navigateToPage(this.user.role, this.user.isStaff);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else if (ROLES.nationalInformerRoles.includes(this.user.role)) {
      this.getNationalAgentInfos()
      .then((data) => {
        this.nationalinformer = NationalInformer.fromJSON(data.nationalinformer);
        console.log(data);
        this.setExtraAgentInfosInStorage(data);
        this.navigateToPage(this.user.role, this.user.isStaff);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  navigateToPage(role: string, isStaff: boolean): void {
    if (isStaff){
      this.router.navigate(['admin']);
    }
    else {
      switch (role){
        case ROLES.SOURCE_AGENT:
          this.router.navigate(['source']);
          break;
        case ROLES.SOURCE_VERIFIER:
          this.router.navigate(['sourceverifier']);
          break;
        case ROLES.SOURCE_STRUCTURE:
          this.router.navigate(['sourcestructure']);
          break;
        case ROLES.LOCAL_INFORMER:
          this.router.navigate(['localinformer']);
          break;
        case ROLES.LOCAL_VERIFIER:
          this.router.navigate(['localinformer']);
          break;
        case ROLES.NATIONAL_INFORMER:
          this.router.navigate(['nationalinformer']);
          break;
      }
    }
  }

  getAgentInfos(): Promise<any> {
    return this.http.get<any>(URLS.AGENT_INFOS).toPromise();
  }

  getLocalAgentInfos(): Promise<any> {
    return this.http.get<any>(URLS.LOCAL_AGENT_INFOS).toPromise();
  }

  getNationalAgentInfos(): Promise<any> {
    return this.http.get<any>(URLS.NATIONAL_AGENT_INFOS).toPromise();
  }

  signIn(formData: FormData): Promise<any> {
    return this.http.post(URLS.LOGIN, formData).toPromise();
  }

  signUpUser(formData: FormData): Promise<any> {
    return this.http.post(URLS.SIGNUP, formData).toPromise();
  }

  createAgent(formData: FormData): Promise<any> {
    return this.http.post(URLS.AGENT_CRU, formData).toPromise();
  }

  createLocalAgent(formData: FormData): Promise<any> {
    return this.http.post(URLS.LOCAL_AGENT_CRU, formData).toPromise();
  }

  createNationalAgent(formData: FormData): Promise<any> {
    return this.http.post(URLS.NATIONAL_AGENT_CRU, formData).toPromise();
  }

  signUpActivateUser(userId: string, code: string): Promise<any> {
    return this.http.get(URLS.SIGNUP_ACTIVATE, {
      params: {
        user_id: userId,
        code
      }
    }).toPromise();
  }

  signUpResendCode(email: string): Promise<any> {
    return this.http.get(URLS.SIGNUP_RESEND, {
      params: {email}
    }).toPromise();
  }

  requestResetPassword(email: string): Promise<ResponseMessage> {
    return this.http.get<ResponseMessage>(URLS.PASSWORD_RESET_REQUEST, {
      params: {email}
    }).toPromise();
  }

  resetPassword(userId: string, code: string, password: string): Promise<ResponseMessage> {
    return this.http.put<ResponseMessage>(URLS.PASSWORD_RESET, '', {
      params: {
        user_id: userId,
        code,
        password
      }
    }).toPromise();
  }

  resendCodeResetPassword(email: string): Promise<ResponseMessage> {
    return this.http.get<ResponseMessage>(URLS.PASSWORD_RESET_RESEND, {
      params: {email}
    }).toPromise();
  }

  requestEmailChange(userId: string, newEmail: string): Promise<ResponseMessage> {
    return this.http.get<ResponseMessage>(URLS.CHANGE_EMAIL_REQUEST, {
      params: {
        user_id: userId,
        new_email: newEmail
      }
    }).toPromise();
  }

  confirmChangeEmail(userId: string, code: string): Promise<ResponseMessage> {
    return this.http.get<ResponseMessage>(URLS.CHANGE_EMAIL_CONFIRM, {
      params: {
        user_id: userId,
        code
      }
    }).toPromise();
  }

  resendCodeChangeEmail(email: string, userId: string): Promise<ResponseMessage> {
    return this.http.get<ResponseMessage>(URLS.CHANGE_EMAIL_CONFIRM, {
      params: {
        new_email: email,
        user_id: userId
      }
    }).toPromise();
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('agentExtras');
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/signin']);
  }

  setTokens(access: string, refresh: string): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  getAccessToken(): string{
    return localStorage.getItem('access_token');
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getAccessToken();
    }
    if (!token) {
      return true;
    }
    return this.helper.isTokenExpired(token);
  }

  displayErrors(errorResp: HttpErrorResponse): string[]{
    const errors: string[] = [];
    const error = errorResp.error;
    if (error instanceof ErrorEvent) {
      return ['Errors.error'];
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

}


