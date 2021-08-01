import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAuth implements CanActivate{

  constructor(private router: Router, private authService: AuthManagerService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    const tokenInStorage = localStorage.getItem('access_token');
    if (tokenInStorage){
      if (!this.authService.isTokenExpired()){
        // this.authService.tokenAuthSubject.next(tokenInStorage);
        return true;
      }
      const accessTokenDict = await this.authService.getNewAccessTokenByRefresh();
      localStorage.setItem('access_token', accessTokenDict.access);
      return true;
    //   this.authService.getNewAccessTokenByRefresh().then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //       console.log(err);
    //   });
    }
    else{
        this.router.navigate(['/auth/signin']);
        return false;
    }
  }
}
