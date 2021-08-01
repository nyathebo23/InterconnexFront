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
  loading = false;
  errors: string[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthManagerService) {
    this.confirmMailChangeForm = this.formBuilder.group({
      code: ['', [Validators.required, ValidationService.requiredValidator]],
    });
  }
  submit(): void{
    this.loading = true;
    const code = this.confirmMailChangeForm.controls.code.value;
    const userId = this.authService.user.id;
    this.authService.confirmChangeEmail(userId, code)
    .then((resp) => {
      this.loading = false;
    })
    .catch((err) => {
      this.errors = this.authService.displayErrors(err);
      this.loading = false;
      setTimeout(() => this.errors = [], 10000);
    });
  }

}
