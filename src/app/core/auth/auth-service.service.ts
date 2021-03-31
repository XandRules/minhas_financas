import { Register } from './../../pages/account/register/models/Register';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from './models/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private subjectUser: BehaviorSubject<Login> = new BehaviorSubject(null);
  private subjectLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  public signIn (login: Login) :Observable<any>{

    if(login){
      return this.http.post<any>('api/authentication', login).pipe(
        map((response) => {
          localStorage.setItem('token', response.token);
          this.subjectLoggedIn.next(true);
          this.subjectUser.next(login);
          return response.user;
        })
      );
    }
  }

  public create (register: Register) :Observable<Register>{

    //Chamada ao backend

    return of(register);

    if(register){
      return this.http.post<Register>('api/signup', register).pipe(
        map((response) => {
          return response;
        })
      );
    }
  }

  logout(){
    this.subjectLoggedIn.next(false);
    this.subjectUser.next(null);
    localStorage.removeItem('token');
  }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if(token){
      this.subjectLoggedIn.next(true);
    }
    return this.subjectLoggedIn.asObservable();
  }

  getUser(): Observable<any>{
    return this.subjectUser.asObservable()
   }


}
