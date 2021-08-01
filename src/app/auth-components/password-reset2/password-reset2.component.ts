import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
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
  errors: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthManagerService
  ) {
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
    this.loading = true;
    const userId = this.authService.user.id;
    const code = this.passwordResetForm.controls.code.value;
    const password  = this.passwordResetForm.controls.newPassword.value;
    this.authService.resetPassword(userId, code, password)
    .then((resp) => {
      this.loading = false;
      this.router.navigate(['passwordreset']);
    })
    .catch((err) => {
      this.errors = this.authService.displayErrors(err);
      this.loading = false;
      setTimeout(() => this.errors = [], 10000);
    });
  }
}
