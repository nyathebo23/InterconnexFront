import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-password-reset1',
  templateUrl: './password-reset1.component.html',
  styleUrls: ['./password-reset1.component.scss']
})
export class PasswordReset1Component {

  emailForm: FormGroup;
  loading = false;
  errors: string[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthManagerService) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]]
    });
  }

  submit(): void{
    this.loading = true;
    const email = this.emailForm.controls.email.value;
    this.authService.requestResetPassword(email)
    .then(() => {
      this.loading = false;
    })
    .catch((err) => {
      this.errors = this.authService.displayErrors(err);
      this.loading = false;
      setTimeout(() => this.errors = [], 10000);
    });
  }
}
