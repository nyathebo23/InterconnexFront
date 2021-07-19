import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent {

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
