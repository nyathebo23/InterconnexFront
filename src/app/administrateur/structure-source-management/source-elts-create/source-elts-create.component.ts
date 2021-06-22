import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-source-elts-create',
  templateUrl: './source-elts-create.component.html',
  styleUrls: ['./source-elts-create.component.scss']
})
export class SourceEltsCreateComponent implements OnInit {

  loadingss: boolean;
  loadingsu: boolean;
  sourceUnitForm: FormGroup;
  structsourceForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {


  }

  ngOnInit(): void {
    this.structsourceForm = this.formBuilder.group({
      name: ['', [Validators.required, ValidationService.requiredValidator]],
      code: ['', [Validators.required, ValidationService.requiredValidator]],
      locationInd: ['', [Validators.required, ValidationService.requiredValidator]],
      inflocal: ['', [Validators.required]],
      units: new FormArray([])
    });

    this.sourceUnitForm = this.formBuilder.group({
      name: ['', [Validators.required, ValidationService.requiredValidator]],
      telephone: ['', [Validators.required, ValidationService.requiredValidator]],
      fax: ['', [Validators.required, ValidationService.requiredValidator]],
      email: ['', [Validators.required, ValidationService.requiredValidator, ValidationService.emailValidator]],
      rsfta: [''],
      address: ['', [Validators.required, ValidationService.requiredValidator]],
      structsource: ['', [Validators.required]]
    });
  }

  get aerodromeForm(): {[key: string]: any}{
    return this.structsourceForm.controls;
  }

  get unitsForms(): FormArray {
    return this.aerodromeForm.units as FormArray;
  }

  removeUnitForm(): void{
    this.unitsForms.removeAt(0);
  }

  addUnitForm(): void{
    this.aerodromeForm.units.push(
      this.formBuilder.group({
        name: ['', [Validators.required, ValidationService.requiredValidator]],
        telephone: ['', [Validators.required, ValidationService.requiredValidator]],
        fax: ['', [Validators.required, ValidationService.requiredValidator]],
        email: ['', [Validators.required, ValidationService.requiredValidator, ValidationService.emailValidator]],
        rsfta: [''],
        address: ['', [Validators.required, ValidationService.requiredValidator]],
      })
    );
  }
}
