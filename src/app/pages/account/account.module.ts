import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../../core/auth/auth-service.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SignInComponent, RegisterComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService]
})
export class AccountModule { }
