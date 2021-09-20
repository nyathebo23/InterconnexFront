import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import { NationalInformer } from 'src/app/models/national-informer.model';
import { AdminService } from 'src/app/services/agent-services/admin.service';
import { map, catchError } from 'rxjs/operators';
import { NationalInformerI } from 'src/app/interfaces/national-informer.interface';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MDBModalService } from 'angular-bootstrap-md';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalEditNationalInformerComponent } from '../modals-for-informers/modal-edit-national-informer/modal-edit-national-informer.component';
import { ModalDeleteConfirmComponent } from 'src/app/shared-components/components/modal-delete-confirm/modal-delete-confirm.component';

@Component({
  selector: 'app-inf-national-management',
  templateUrl: './inf-national-management.component.html',
  styleUrls: ['./inf-national-management.component.scss', '../../../assets/css/tables.scss']
})
export class InfNationalManagementComponent implements OnInit  {

  infNationalForm: FormGroup;
  infnationaux: NationalInformer[];
  headsInfNational = ['InformateurNational.name', 'InformateurNational.email', 'InformateurNational.isauthority', 'UpdateDelete.editBtn', 'UpdateDelete.deleteBtn'];
  errors: string[] = [];
  createSuccess: boolean;
  loading = false;
  loaderId = 'nat-inf';
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private ngxUiLoaderService: NgxUiLoaderService
  ) {
    this.infNationalForm = this.formBuilder.group({
      name: ['', [Validators.required, ValidationService.requiredValidator]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      isAuthority: [false, [Validators.required]]
    });
  }

  ngOnInit(): void{
    this.ngxUiLoaderService.startLoader(this.loaderId);
    this.adminService.getNationalInformersList().pipe(
      map((nationalinfs: NationalInformerI[]) => nationalinfs.map(val => NationalInformer.fromJSON(val)))
    ).subscribe((nationalinfs: NationalInformer[]) => {
      this.infnationaux = nationalinfs;
    }, error => {
      this.adminService.setError(error);
    }, () => {
      this.ngxUiLoaderService.stopLoader(this.loaderId);
    });
  }

  submit(): void{
    this.loading = true;
    const formData = new FormData();
    formData.append('name', this.infNationalForm.controls.name.value);
    formData.append('email', this.infNationalForm.controls.email.value);
    formData.append('is_authority', this.infNationalForm.controls.isAuthority.value);
    this.adminService.createNationalInformer(formData)
    .then((resp) => {
      this.adminService.reloadCurrentRoute();
    })
    .catch((err) => {
      this.errors = this.adminService.displayErrors(err);
    })
    .finally(() => this.loading = false);
  }

  edit(nationalInf: NationalInformer): void{
    this.modalService.show(
      ModalEditNationalInformerComponent,
      this.modalDisplayService.getModalOptions({nationalInf}, 'modal-dialog modal-notify modal-warning')
    );
  }

  delete(id: string): void{
    this.modalService.show(ModalDeleteConfirmComponent,
      this.modalDisplayService.getModalOptions({
        id,
        deleteElementFunc: this.adminService.deleteNationalInformer}, 'modal-dialog modal-notify modal-danger'));
  }
}
