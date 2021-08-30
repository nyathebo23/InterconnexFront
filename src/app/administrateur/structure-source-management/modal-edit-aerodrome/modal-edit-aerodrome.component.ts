import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { AdminService } from 'src/app/services/agent-services/admin.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-modal-edit-aerodrome',
  templateUrl: './modal-edit-aerodrome.component.html',
  styleUrls: ['./modal-edit-aerodrome.component.scss']
})
export class ModalEditAerodromeComponent implements OnInit {

  aerodromeForm: FormGroup;
  errors: string[] = [];
  loading: boolean;
  aerodrome: Aerodrome;
  constructor(
    public modalRef: MDBModalRef,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.aerodromeForm = this.formBuilder.group({
      name: [this.aerodrome.name, [Validators.required, ValidationService.requiredValidator]],
      locationInd: [this.aerodrome.locationInd, [Validators.required, ValidationService.requiredValidator]],
      isConceded: [this.aerodrome.isConceded, [Validators.required]],
    });
  }

  submit(): void {
    this.loading = true;
    // if (this.unitsForms.length === 0){
    const formData = new FormData();
    formData.append('name', this.aerodromeForm.controls.name.value);
    formData.append('location_ind', this.aerodromeForm.controls.locationInd.value);
    formData.append('is_conceded', this.aerodromeForm.controls.isConceded.value);
    this.adminService.updateAerodrome(this.aerodrome.id, formData)
    .then((resp) => {
      this.modalRef.hide();
      this.adminService.reloadCurrentRoute();
    })
    .catch((err) => {
      this.errors = this.adminService.displayErrors(err);
      setTimeout(() => this.errors = [], 10000);
    })
    .finally(() => this.loading = false);
  }

}
