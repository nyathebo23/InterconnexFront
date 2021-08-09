import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import * as ROLES from '../commons/constants-roles';

@Injectable({
  providedIn: 'root'
})
export class CanActivateSourceAgent implements CanActivate{

  constructor(private router: Router, private authService: AuthManagerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.getUser();
    if (user){
        return user.role === ROLES.SOURCE_AGENT || user.role === ROLES.SOURCE_VERIFIER;
    }
    return false;
  }
}
