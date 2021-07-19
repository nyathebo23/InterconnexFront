import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const token = this.authService.accessToken;
    const tokenInStorage = localStorage.getItem('access');

    if (token || tokenInStorage){
      if (!this.authService.isTokenExpired()){
        this.authService.tokenAuthSubject.next(tokenInStorage);
        return true;
      }
    }
    this.router.navigate(['/signin']);
    return false;
  }
}
