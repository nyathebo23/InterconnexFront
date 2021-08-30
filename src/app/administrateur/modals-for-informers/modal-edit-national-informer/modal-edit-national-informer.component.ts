import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { NationalInformer } from 'src/app/models/national-informer.model';
import { AdminService } from 'src/app/services/agent-services/admin.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-modal-edit-national-informer',
  templateUrl: './modal-edit-national-informer.component.html',
  styleUrls: ['./modal-edit-national-informer.component.scss']
})
export class ModalEditNationalInformerComponent implements OnInit {

  infNationalForm: FormGroup;
  errors: string[] = [];
  loading = false;
  nationalInf: NationalInformer;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MDBModalRef,
  ) {}

  ngOnInit(): void{
    this.infNationalForm = this.formBuilder.group({
      name: [this.nationalInf.name, [Validators.required, ValidationService.requiredValidator]],
      email: [this.nationalInf.email, [Validators.required, ValidationService.emailValidator]],
      isAuthority: [this.nationalInf.isAuthority, [Validators.required]]
    });
  }

  submit(): void{
    this.loading = true;
    const formData = new FormData();
    formData.append('name', this.infNationalForm.controls.name.value);
    formData.append('email', this.infNationalForm.controls.email.value);
    formData.append('is_authority', this.infNationalForm.controls.isAuthority.value);
    this.adminService.updateNationalInformer(this.nationalInf.id, formData)
    .then((resp) => {
      this.modalRef.hide();
      this.adminService.reloadCurrentRoute();
    })
    .catch((err) => {
      this.errors = this.adminService.displayErrors(err);
    })
    .finally(() => this.loading = false);
  }

}
