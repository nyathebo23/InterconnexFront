import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnInit {

  signUpForm: FormGroup;
  showPassword = false;
  loading = false;

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, ValidationService.requiredValidator]],
      email: ['', [Validators.required, ValidationService.requiredValidator, ValidationService.emailValidator]],
      firstname: ['', [Validators.required, ValidationService.requiredValidator]],
      lastname: ['', [Validators.required, ValidationService.requiredValidator]],
      password: ['', [Validators.required, ValidationService.requiredValidator]],
      structure: ['', [Validators.required]],
      function: [{value: '', disabled: true}, [Validators.required]],
      quality: [{value: '', disabled: true}, [Validators.required]],
      role: [{value: '', disabled: true}, [Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  submit(): void{

  }

}
