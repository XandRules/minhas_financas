import { AuthService } from './auth-service.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>
    {
        return this.authService.isLoggedIn()
        .pipe(
          tap((isAuth) => {
            if(!isAuth){
              this.router.navigateByUrl('/account/sign-in');
            }
          })
        )
    }
}
