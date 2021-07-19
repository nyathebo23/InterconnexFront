import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-signup-verif',
  templateUrl: './signup-verif.component.html',
  styleUrls: ['./signup-verif.component.scss']
})
export class SignupVerifComponent {


  signupVerifForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signupVerifForm = this.formBuilder.group({
      code: ['', [Validators.required, ValidationService.requiredValidator]],
    });
  }

}
