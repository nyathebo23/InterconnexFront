import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthManagerService, UserResponse } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent{

  loginForm: FormGroup;
  showPassword = false;
  loading = false;
  errors: string[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthManagerService) {
    this.loginForm = this.formBuilder.group({
      usernameoremail: ['', [Validators.required, ValidationService.requiredValidator]],
      password: ['', [Validators.required, ValidationService.requiredValidator]],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  submit(): void{
    this.loading = true;
    const formData = new FormData();
    formData.append('login_text', this.loginForm.controls.usernameoremail.value);
    formData.append('password', this.loginForm.controls.password.value);
    this.authService.signIn(formData)
    .then((resp: UserResponse) => {
      this.authService.setUserAndOther(resp);
    })
    .catch((err: HttpErrorResponse) => {
      this.errors = this.authService.displayErrors(err);
      this.loading = false;
      setTimeout(() => this.errors = [], 10000);
    });
  }
}
