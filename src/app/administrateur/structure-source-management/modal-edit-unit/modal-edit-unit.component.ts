import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { SourceUnit } from 'src/app/models/source-unit.model';
import { AdminService } from 'src/app/services/agent-services/admin.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-modal-edit-unit',
  templateUrl: './modal-edit-unit.component.html',
  styleUrls: ['./modal-edit-unit.component.scss']
})
export class ModalEditUnitComponent implements OnInit {

  sourceUnitForm: FormGroup;
  errors: string[] = [];
  loading: boolean;
  aerodromes: Aerodrome[];
  unit: SourceUnit;
  constructor(
    public modalRef: MDBModalRef,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.sourceUnitForm = this.formBuilder.group({
      name: [this.unit.name, [Validators.required, ValidationService.requiredValidator]],
      telephone: [this.unit.telephone, [Validators.required, ValidationService.requiredValidator]],
      fax: [this.unit.fax, [Validators.required, ValidationService.requiredValidator]],
      email: [this.unit.email, [Validators.required, ValidationService.requiredValidator, ValidationService.emailValidator]],
      rsfta: [this.unit.rsfta],
      address: [this.unit.adress, [Validators.required, ValidationService.requiredValidator]],
      aerodrome: [this.unit.aerodrome, [Validators.required]]
    });
    this.adminService.getAerodromesList().subscribe((aerodromes) => {
      this.aerodromes = aerodromes;
    });
  }

  submit(): void {
    this.loading = true;
    // if (this.unitsForms.length === 0){
    const formData = new FormData();
    formData.append('name', this.sourceUnitForm.controls.name.value);
    formData.append('fax', this.sourceUnitForm.controls.fax.value);
    formData.append('email', this.sourceUnitForm.controls.email.value);
    formData.append('rsfta', this.sourceUnitForm.controls.rsfta.value);
    formData.append('phone_number', this.sourceUnitForm.controls.telephone.value);
    formData.append('address', this.sourceUnitForm.controls.address.value);
    formData.append('aerodrome', this.sourceUnitForm.controls.aerodrome.value);

    this.adminService.updateUnit(this.unit.id, formData)
    .then((resp) => {
      this.modalRef.hide();
      this.adminService.reloadCurrentRoute();
    })
    .catch((err) => {
      this.errors = this.adminService.displayErrors(err);
      setTimeout(() => this.errors = [], 5000);
    })
    .finally(() => this.loading = false);
  }

}
