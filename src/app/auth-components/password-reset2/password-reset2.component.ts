import { Location } from '@angular/common';
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
  loadingResend = false;
  showNewPassword = false;
  showConfNewPassword = false;
  errors: string[] = [];
  userId: string;
  email: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthManagerService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.passwordResetForm = this.formBuilder.group({
      code: ['', [ValidationService.requiredValidator]],
      newPassword: ['', [ValidationService.requiredValidator, ValidationService.passwordValidator]],
      confirmNewPassword: ['', [ValidationService.requiredValidator]]},
       {validators: ValidationService.mustMatch('newPassword', 'confirmNewPassword')}
    );
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.userId = navigation.extras.state.userId;
      this.email = navigation.extras.state.email;
      if (!this.userId){
        this.location.back();
      }
    }
    else {
      this.location.back();
    }
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfNewPasswordVisibility(): void {
    this.showConfNewPassword = !this.showConfNewPassword;
  }

  submit(): void{
    this.loading = true;
    const code = this.passwordResetForm.controls.code.value;
    const password  = this.passwordResetForm.controls.newPassword.value;
    this.authService.resetPassword(this.userId, code, password)
    .then((resp) => {
      alert('success');
      this.router.navigate(['/auth/signin']);
    })
    .catch((err) => {
      this.errors = this.authService.displayErrors(err);
    })
    .finally(() => {
      this.loading = false;
    });
  }

  resend(): void {
    this.loadingResend = true;
    this.authService.resendCodeChangeEmail(this.email, this.userId)
    .then((resp) => {
      // alert('successfully resend');
    })
    .catch((err) => {
      this.errors = this.authService.displayErrors(err);
    })
    .finally(() => {
      this.loadingResend = false;
    });
  }
}
