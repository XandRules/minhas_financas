import { Register } from './models/Register';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import toastr from "toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public register: Register;

  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.isLogged();
   }

  ngOnInit(): void {

    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]);
    let repeatPassword = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]), CustomValidators.equalTo(password)]);

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: password,
      repeatPassword: repeatPassword
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

  signUp(){
    this.register = Object.assign('', new Register(), this.registerForm.value)

    this.auth.create(this.register).subscribe(
      register => {
        toastr.success("Solicitação processada com sucesso!");
      }
    );
  }

}
