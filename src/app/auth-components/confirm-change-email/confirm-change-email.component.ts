import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
@Component({
  selector: 'app-confirm-change-email',
  templateUrl: './confirm-change-email.component.html',
  styleUrls: ['./confirm-change-email.component.scss']
})
export class ConfirmChangeEmailComponent {

  confirmMailChangeForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.confirmMailChangeForm = this.formBuilder.group({
      code: ['', [Validators.required, ValidationService.requiredValidator]],
    });
  }
}
