import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
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
    .then((res) => {
      const navigationExtras: NavigationExtras = {
        state: {
          userId: res.user_id,
          email
        }
      };
      this.router.navigate(['/auth/passwordreset'], navigationExtras);
    })
    .catch((err) => {
      this.errors = this.authService.displayErrors(err);
    })
    .finally(() => {
      this.loading = false;
    });
  }
}
