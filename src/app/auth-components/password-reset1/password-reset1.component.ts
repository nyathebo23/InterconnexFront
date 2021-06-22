import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-password-reset1',
  templateUrl: './password-reset1.component.html',
  styleUrls: ['./password-reset1.component.scss']
})
export class PasswordReset1Component {

  emailForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]]
    });
  }

  submit(): void{

  }
}
