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
  selector: 'app-signup-verif',
  templateUrl: './signup-verif.component.html',
  styleUrls: ['./signup-verif.component.scss']
})
export class SignupVerifComponent {


  signupVerifForm: FormGroup;
  loading = false;
  errors: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthManagerService
  ) {
    this.signupVerifForm = this.formBuilder.group({
      code: ['', [Validators.required, ValidationService.requiredValidator]],
    });

  }

  submit(): void {
    this.loading = true;
    const userId = this.activatedRoute.snapshot.paramMap.get('user_id');
    const code = this.signupVerifForm.controls.code.value;
    this.authService.signUpActivateUser(userId, code)
    .then((resp) => {
      console.log(resp);
      this.loading = false;
      this.authService.setTokens(resp.access_token, resp.refresh_token);
    })
    .catch((err) => {
      this.errors = this.authService.displayErrors(err);
      this.loading = false;
      setTimeout(() => this.errors = [], 10000);
    });
  }
}
