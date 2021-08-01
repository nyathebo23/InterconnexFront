import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent  {

  passwordChangeForm: FormGroup;
  loading = false;
  showOldPassword = false;
  showNewPassword = false;
  showConfNewPassword = false;
  error: string;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.passwordChangeForm = this.formBuilder.group({
      oldPassword: ['', [ValidationService.requiredValidator]],
      newPassword: ['', [ValidationService.requiredValidator, ValidationService.passwordValidator]],
      confirmNewPassword: ['', [ValidationService.requiredValidator]]},
       {validators: ValidationService.mustMatch('newPassword', 'confirmNewPassword')}
    );
  }
  toggleOldPasswordVisibility(): void {
    this.showOldPassword = !this.showOldPassword;
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
