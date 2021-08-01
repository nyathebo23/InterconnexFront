import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authService: AuthManagerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const tokenInStorage = localStorage.getItem('access_token');
    if (tokenInStorage){
      if (!this.authService.isTokenExpired()){
        // this.authService.tokenAuthSubject.next(tokenInStorage);
        return true;
      }
    }
    this.router.navigate(['/auth/signin']);
    return false;
  }
}
