import { ActivatedRoute } from '@angular/router';
import { SignInComponent } from './../../pages/account/sign-in/sign-in.component';
import { AuthService } from './auth-service.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanDeactivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>
    {
      localStorage.setItem('page', state.url);

      return this.authService.isLoggedIn()
      .pipe(
        tap((isAuth) => {
          if(!isAuth){
            this.router.navigateByUrl('/account/sign-in');
            return false
          }else{
            return true;
          }
        })
      )
    }
}

