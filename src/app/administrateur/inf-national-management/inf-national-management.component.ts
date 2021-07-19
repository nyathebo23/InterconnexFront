import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import { NationalInformer } from 'src/app/models/national-informer.model';

@Component({
  selector: 'app-inf-national-management',
  templateUrl: './inf-national-management.component.html',
  styleUrls: ['./inf-national-management.component.scss', '../../../assets/css/tables.scss']
})
export class InfNationalManagementComponent implements OnInit  {

  infNationalForm: FormGroup;
  infnationaux: NationalInformer[];
  headsInfNational = ['ID', 'InformateurNational.name', 'UpdateDelete.editBtn', 'UpdateDelete.deleteBtn'];

  constructor(private formBuilder: FormBuilder) {
    this.infNationalForm = this.formBuilder.group({
      name: ['', [Validators.required, ValidationService.requiredValidator]]
    });
  }

  ngOnInit(): void{
    this.infnationaux = [
      new NationalInformer('0', 'CCAA'),
      new NationalInformer('1', 'ASECNA')
    ];
  }
  submit(): void{

  }

  edit(infnational: NationalInformer): void{

  }

  delete(infnational: NationalInformer): void{

  }
}
