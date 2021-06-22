import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-source-unit-form',
  templateUrl: './source-unit-form.component.html',
  styleUrls: ['./source-unit-form.component.scss']
})
export class SourceUnitFormComponent {

  sourceUnitForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.sourceUnitForm = this.formBuilder.group({
      airportLocationIndicator: [''],
      name: [''],
      adress: [''],
      fax: [''],
      telephone: [''],
      email: [''],
      rsfta: [''],
      initiatorInfos: ['']
    })
  }
}
