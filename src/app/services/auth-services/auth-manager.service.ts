import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable , throwError } from 'rxjs';
import * as URLS from '../../commons/urls-backend';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user.model';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { SourceUnit } from 'src/app/models/source-unit.model';
import { LocalInformer } from 'src/app/models/local-informer.model';
import { NationalInformer } from 'src/app/models/national-informer.model';


interface ResponseMessage  {
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthManagerService {

  user: User;
  unit: SourceUnit;
  aerodrome: Aerodrome;
  localinformer: LocalInformer;
  nationalinformer: NationalInformer;
  helper = new JwtHelperService();
  constructor(private http: HttpClient) {}

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

  signUpActivateUser(userId: string, code: string): Observable<any> {
    return this.http.get(URLS.SIGNUP_ACTIVATE, {
      params: {
        user_id: userId,
        code
      }
    });
  }

  signUpResendCode(email: string): Observable<any> {
    return this.http.get(URLS.SIGNUP_RESEND, {
      params: {email}
    });
  }

  requestResetPassword(email: string): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(URLS.PASSWORD_RESET_REQUEST, {
      params: {email}
    });
  }

  resetPassword(formData: FormData): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(URLS.PASSWORD_RESET, formData);
  }

  resendCodeResetPassword(email: string): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(URLS.PASSWORD_RESET_RESEND, {
      params: {email}
    });
  }

  requestEmailChange(userId: string, newEmail: string): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(URLS.CHANGE_EMAIL_REQUEST, {
      params: {
        user_id: userId,
        new_email: newEmail
      }
    });
  }

  confirmChangeEmail(userId: string, code: string): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(URLS.CHANGE_EMAIL_CONFIRM, {
      params: {
        user_id: userId,
        code
      }
    });
  }

  resendCodeChangeEmail(email: string, userId: string): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(URLS.CHANGE_EMAIL_CONFIRM, {
      params: {
        new_email: email,
        user_id: userId
      }
    });
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
}
