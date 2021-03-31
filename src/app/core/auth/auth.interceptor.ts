
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { RequestInfo } from 'angular-in-memory-web-api';

@Injectable()
export class AuthenticationInterception implements HttpInterceptor{

  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {


    const reqToBackEnd: boolean = req.url.includes('/api/authentication');

    if(reqToBackEnd){

      if(localStorage.getItem('token')){

        let token = localStorage.getItem('token');

        const authReq = req.clone({
          setHeaders: {
            Authorization: `bearer ${token}`
          }
        })

        return next.handle(authReq).pipe(catchError((error) =>{

          if(error instanceof HttpErrorResponse){
            //Fazer o Logout
          }
          return throwError(error);
        }));
      }
    }

    return next.handle(req);
  }
}
