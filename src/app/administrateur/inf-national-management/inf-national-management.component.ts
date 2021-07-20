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

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {
    this.infNationalForm = this.formBuilder.group({
      name: ['', [Validators.required, ValidationService.requiredValidator]]
    });
    this.adminService.getNationalInformersList().pipe(
      catchError(this.adminService.handleError),
      map((localinfs: NationalInformerI[]) => {
        const localinformers = new Array<NationalInformer>();
        localinfs.forEach((localinf) => {
          localinformers.push(NationalInformer.fromJSON(localinf));
        });
        return localinformers;
      })
    ).subscribe((localinfs: NationalInformer[]) => {
      this.infnationaux = localinfs;
    });

  }

  ngOnInit(): void{

  }

  submit(): void{
    const formData = new FormData();
    formData.append('name', this.infNationalForm.controls.name.value);
    this.adminService.createNationalInformer(formData)
    .then(() => {

    })
    .catch((err) => {

    });
  }

  edit(infnational: NationalInformer): void{

  }

  delete(infnational: NationalInformer): void{

  }
}
