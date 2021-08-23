import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import * as ROLES from '../commons/constants-roles';

@Injectable({
  providedIn: 'root'
})
export class CanActivateControlAgent implements CanActivate{

  constructor(private router: Router, private authService: AuthManagerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const rootUrl = route.url[0].path;
    const user = this.authService.getUser();
    if (user){
      switch (rootUrl){
        case 'sourceverifier':
          return user.role === ROLES.SOURCE_VERIFIER;
        case 'sourcestructure':
          return user.role === ROLES.SOURCE_STRUCTURE;
        case 'localinformer':
          return user.role === ROLES.LOCAL_VERIFIER || user.role === ROLES.LOCAL_INFORMER;
        case 'nationalinformer':
          return user.role === ROLES.NATIONAL_INFORMER;
      }
      return true;
    }
    return false;
  }

}
