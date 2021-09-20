import { Location } from '@angular/common';
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
  selector: 'app-confirm-change-email',
  templateUrl: './confirm-change-email.component.html',
  styleUrls: ['./confirm-change-email.component.scss']
})
export class ConfirmChangeEmailComponent {

  confirmMailChangeForm: FormGroup;
  email: string;
  loading = false;
  loadingResend = false;
  errors: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthManagerService,
    private location: Location
  ) {
    this.confirmMailChangeForm = this.formBuilder.group({
      code: ['', [Validators.required, ValidationService.requiredValidator]],
    });
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.email = navigation.extras.state.email;
      if (!this.email){
        this.location.back();
      }
    }
    else {
      this.location.back();
    }
  }
  submit(): void{
    this.loading = true;
    const code = this.confirmMailChangeForm.controls.code.value;
    const userId = this.authService.user.id;
    this.authService.confirmChangeEmail(userId, code)
    .then((resp) => {

    })
    .catch((err) => {
      this.errors = this.authService.displayErrors(err);
      setTimeout(() => this.errors = [], 10000);
    })
    .finally(() => {
      this.loading = false;
    });
  }

  resend(): void {
    this.loadingResend = true;
    const userId = this.authService.user.id;
    this.authService.resendCodeChangeEmail(this.email, userId)
    .then((resp) => {
      // alert('successfully resend');
    })
    .catch((err) => {
      this.errors = this.authService.displayErrors(err);
      setTimeout(() => this.errors = [], 10000);
    })
    .finally(() => {
      this.loadingResend = false;
    });
  }
}
