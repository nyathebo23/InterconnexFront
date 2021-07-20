import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/agent-services/admin.service';
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
  aerodromeForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {

  }

  ngOnInit(): void {
    this.aerodromeForm = this.formBuilder.group({
      name: ['', [Validators.required, ValidationService.requiredValidator]],
      locationInd: ['', [Validators.required, ValidationService.requiredValidator]],
      units: new FormArray([])
    });

    this.sourceUnitForm = this.formBuilder.group({
      name: ['', [Validators.required, ValidationService.requiredValidator]],
      telephone: ['', [Validators.required, ValidationService.requiredValidator]],
      fax: ['', [Validators.required, ValidationService.requiredValidator]],
      email: ['', [Validators.required, ValidationService.requiredValidator, ValidationService.emailValidator]],
      rsfta: [''],
      address: ['', [Validators.required, ValidationService.requiredValidator]],
      aerodrome: ['', [Validators.required]]
    });
  }

  get aerodromForm(): {[key: string]: any}{
    return this.aerodromeForm.controls;
  }

  get unitsForms(): FormArray {
    return this.aerodromForm.units as FormArray;
  }

  removeUnitForm(): void{
    this.unitsForms.removeAt(0);
  }

  addUnitForm(): void{
    this.aerodromForm.units.push(
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

  submitUnit(): void {
    const formData = new FormData();
    formData.append('name', this.sourceUnitForm.controls.name.value);
    formData.append('fax', this.sourceUnitForm.controls.fax.value);
    formData.append('email', this.sourceUnitForm.controls.email.value);
    formData.append('rsfta', this.sourceUnitForm.controls.rsfta.value);
    formData.append('phone_number', this.sourceUnitForm.controls.telephone.value);
    formData.append('address', this.sourceUnitForm.controls.address.value);
    formData.append('aerodrome', this.sourceUnitForm.controls.aerodrome.value);

    this.adminService.createUnit(formData)
    .then(() => {

    })
    .catch((err) => {

    });
  }

  submitAerodrome(): void {
    if (this.unitsForms.length === 0){
      const formData = new FormData();
      formData.append('name', this.aerodromeForm.controls.name.value);
      formData.append('location_ind', this.aerodromeForm.controls.locationInd.value);
      this.adminService.createAerodrome(formData)
      .then(() => {

      })
      .catch((err) => {

      });
    }
  }
}
