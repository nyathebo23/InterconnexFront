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
  selector: 'app-signup-verif',
  templateUrl: './signup-verif.component.html',
  styleUrls: ['./signup-verif.component.scss']
})
export class SignupVerifComponent {


  signupVerifForm: FormGroup;
  loading = false;
  errors: string[] = [];
  userId: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthManagerService,
    private location: Location
  ) {
    this.signupVerifForm = this.formBuilder.group({
      code: ['', [Validators.required, ValidationService.requiredValidator]],
    });
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.userId = navigation.extras.state.userId;
      if (!this.userId){
        this.location.back();
      }
    }
    else {
      this.location.back();
    }
  }

  submit(): void {
    this.loading = true;
    const code = this.signupVerifForm.controls.code.value;
    this.authService.signUpActivateUser(this.userId, code)
    .then((resp) => {
      this.loading = false;
      console.log(resp.access_token, resp.refresh_token, resp);
      // this.authService.setTokens(resp.access_token, resp.refresh_token);
    })
    .catch((err) => {
      this.errors = this.authService.displayErrors(err);
      this.loading = false;
      setTimeout(() => this.errors = [], 10000);
    });
  }
}
