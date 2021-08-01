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

@Component({
  selector: 'app-inf-national-management',
  templateUrl: './inf-national-management.component.html',
  styleUrls: ['./inf-national-management.component.scss', '../../../assets/css/tables.scss']
})
export class InfNationalManagementComponent implements OnInit  {

  infNationalForm: FormGroup;
  infnationaux: NationalInformer[];
  headsInfNational = ['ID', 'InformateurNational.name', 'UpdateDelete.editBtn', 'UpdateDelete.deleteBtn'];
  errors: string[] = [];
  createSuccess: boolean;
  loading = false;
  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {
    this.infNationalForm = this.formBuilder.group({
      name: ['', [Validators.required, ValidationService.requiredValidator]],
      isAuthority: [false, [Validators.required]]
    });
  }

  ngOnInit(): void{
    this.adminService.getNationalInformersList().pipe(
      catchError(this.adminService.handleError),
      map((localinfs: NationalInformerI[]) => {
        const nationalinformers = new Array<NationalInformer>();
        localinfs.forEach((nationalinf) => {
          nationalinformers.push(NationalInformer.fromJSON(nationalinf));
        });
        return nationalinformers;
      })
    ).subscribe((nationalinfs: NationalInformer[]) => {
      this.infnationaux = nationalinfs;
    });
  }

  submit(): void{
    this.loading = true;
    const formData = new FormData();
    formData.append('name', this.infNationalForm.controls.name.value);
    this.adminService.createNationalInformer(formData)
    .then((resp) => {
      console.log(resp);
      this.loading = false;
      this.adminService.reloadCurrentRoute();
    })
    .catch((err) => {
      this.loading = false;
    });
  }

  edit(infnational: NationalInformer): void{
  }

  delete(id: string): void{
    this.adminService.deleteNationalInformer(id)
    .then(() => {
      this.adminService.reloadCurrentRoute();
    })
    .catch((err) => {

    });
  }
}
