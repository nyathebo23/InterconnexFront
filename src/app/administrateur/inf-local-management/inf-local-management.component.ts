import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalInformer } from 'src/app/models/local-informer.model';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-inf-local-management',
  templateUrl: './inf-local-management.component.html',
  styleUrls: ['./inf-local-management.component.scss', '../../../assets/css/tables.scss']
})
export class InfLocalManagementComponent implements OnInit {

  infLocalForm: FormGroup;
  inflocaux: LocalInformer[];
  headsInfLocal = ['ID', 'InformateurLocal.name', 'UpdateDelete.editBtn', 'UpdateDelete.deleteBtn'];

  constructor(private formBuider: FormBuilder) {
    this.infLocalForm = this.formBuider.group({
      name: ['', [Validators.required, ValidationService.requiredValidator]]
    });
  }

  ngOnInit(): void{
    this.inflocaux = [
      new LocalInformer('0', 'SEGC')
    ];
  }

  submit(): void{

  }

  edit(inflocal: LocalInformer): void{
    console.log(inflocal);
  }

  delete(inflocal: LocalInformer): void{

  }
}
