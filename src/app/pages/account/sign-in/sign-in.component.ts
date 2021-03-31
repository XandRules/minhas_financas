import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Login } from './../../../core/auth/models/login';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthService } from './../../../core/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public loginForm: FormGroup;
  public authLogin: Login;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.isLogged();
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: [
          '',
          Validators.compose([
              Validators.required,
              Validators.minLength(4)
          ])
      ]
  });
  }

  login(){

    this.authLogin = Object.assign('', this.authLogin, this.loginForm.value);

    this.auth.signIn(this.authLogin).subscribe( user => {
      if(user?.id){
        this.router.navigate(['reports']);
      }
    });
  }

  isLogged(){
    return this.auth.isLoggedIn().subscribe(user => {
      if(user){
        let path: string = localStorage.getItem('page');
        if(path){
          this.router.navigate([path]);
        }
        return true;
      }else{
        return false;
      }
    })
  }

}
