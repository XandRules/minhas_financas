import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from './../../auth/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogged = false;

  constructor(private authService: AuthService, private router: Router) {

    this.authService.isLoggedIn()
      .subscribe(
        (isAuth) => {
          if (!isAuth) {
            this.router.navigateByUrl('/account/sign-in');
            this.isLogged = false;
          } else {
            this.isLogged = true;
          }
        });
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }

}
