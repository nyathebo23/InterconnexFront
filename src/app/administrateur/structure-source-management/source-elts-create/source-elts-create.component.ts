import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Aerodrome } from 'src/app/models/aerodrome.model';
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
  aerodromes: Aerodrome[];
  unitErrors: string[] = [];
  aerodromeErrors: string[] = [];
  createUnitSuccess: boolean;
  createAerodromeSuccess: boolean;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {

  }

  ngOnInit(): void {
    this.aerodromeForm = this.formBuilder.group({
      name: ['', [Validators.required, ValidationService.requiredValidator]],
      locationInd: ['', [Validators.required, ValidationService.requiredValidator]],
      isConceded: [false, [Validators.required]],
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
    this.adminService.getAerodromesList().subscribe((aerodromes) => {
      this.aerodromes = aerodromes;
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

    this.loadingsu = true;
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
      this.createUnitSuccess = true;
      setTimeout(() => {
        this.loadingsu = false;
        this.adminService.reloadCurrentRoute();
      }, 5000);
    })
    .catch((err) => {
      this.loadingsu = false;
      setTimeout(() => this.unitErrors = [], 5000);
    });
  }

  submitAerodrome(): void {
      this.loadingss = true;
    // if (this.unitsForms.length === 0){
      const formData = new FormData();
      formData.append('name', this.aerodromeForm.controls.name.value);
      formData.append('location_ind', this.aerodromeForm.controls.locationInd.value);
      formData.append('is_conceded', this.aerodromeForm.controls.isConceded.value);
      this.adminService.createAerodrome(formData)
      .then((resp) => {
        console.log(resp);
        this.createAerodromeSuccess = true;
        setTimeout(() => {
          this.loadingss = false;
          this.adminService.reloadCurrentRoute();
        }, 5000);
      })
      .catch((err) => {
        this.loadingss = false;
        setTimeout(() => this.aerodromeErrors = [], 5000);
      });
    }
  // }
}
