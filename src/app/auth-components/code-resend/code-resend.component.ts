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
  selector: 'app-code-resend',
  templateUrl: './code-resend.component.html',
  styleUrls: ['./code-resend.component.scss']
})
export class CodeResendComponent {

  emailForm: FormGroup;
  loading = false;
  state: {
    email: string;
    userId?: string;
    action?: string
  };
  resend: (email: string, userId?: string) => Promise<any>;
  pathEnd: string;
  errors: string[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private authService: AuthManagerService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.state = navigation.extras.state as {
      email: string;
      userId?: string;
      action?: string
    };
    if (this.state) {
      if (!this.state.email){
        this.location.back();
      }
    }
    else {
      this.location.back();
    }
    this.emailForm = this.formBuilder.group({
      email: [this.state.email, [Validators.required, ValidationService.emailValidator]]
    });

  }

  submit(): void{
    this.loading = true;
    this.authService.signUpResendCode(this.state.email)
    .then((resp) => {
      this.router.navigate(['/auth/signupverif']);
    })
    .catch((err) => {

    })
    .finally(() => this.loading = false);
  }

}
