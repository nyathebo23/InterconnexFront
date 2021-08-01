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
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent {

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
    const userId = this.authService.user.id;
    this.authService.requestEmailChange(userId, email)
    .then((resp) => {
      this.loading = false;
      this.router.navigate(['emailchangeconfirm', userId]);
    })
    .catch((err) => {
      this.errors = this.authService.displayErrors(err);
      this.loading = false;
      setTimeout(() => this.errors = [], 10000);
    });
  }

}
