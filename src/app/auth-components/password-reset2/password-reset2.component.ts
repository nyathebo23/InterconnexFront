import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-password-reset2',
  templateUrl: './password-reset2.component.html',
  styleUrls: ['./password-reset2.component.scss']
})
export class PasswordReset2Component  {

  passwordResetForm: FormGroup;
  loading = false;
  showNewPassword = false;
  showConfNewPassword = false;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.passwordResetForm = this.formBuilder.group({
      code: ['', [ValidationService.requiredValidator]],
      newPassword: ['', [ValidationService.requiredValidator, ValidationService.passwordValidator]],
      confirmNewPassword: ['', [ValidationService.requiredValidator]]},
       {validators: ValidationService.mustMatch('newPassword', 'confirmNewPassword')}
    );
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }
  toggleConfNewPasswordVisibility(): void {
    this.showConfNewPassword = !this.showConfNewPassword;
  }
  submit(): void{

  }
}
