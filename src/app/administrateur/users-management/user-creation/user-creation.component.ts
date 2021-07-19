import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AerodromeExtend } from 'src/app/interfaces/aerodrome-extend.interface';
import { LocalInformerI } from 'src/app/interfaces/local-informer.interface';
import { NationalInformerI } from 'src/app/interfaces/national-informer.interface';
import { UnitLite } from 'src/app/interfaces/unit-lite.interface';
import { Unit } from 'src/app/models/unit.model';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import * as ROLES from '../../../commons/constants';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnInit {

  signUpForm: FormGroup;
  showPassword = false;
  loading = false;
  aerodromeList: AerodromeExtend[] = new Array<AerodromeExtend>();
  unitList: UnitLite[];
  localInfExternsList: LocalInformerI[] = new Array<LocalInformerI>();
  nationalInfList: NationalInformerI[] = new Array<NationalInformerI>();
  aerodrome: AerodromeExtend;
  unit: UnitLite;
  localInf: LocalInformerI;
  nationalInf: NationalInformerI;
  userRoles = ROLES;
  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, ValidationService.requiredValidator]],
      email: ['', [Validators.required, ValidationService.requiredValidator, ValidationService.emailValidator]],
      firstname: ['', [Validators.required, ValidationService.requiredValidator]],
      lastname: ['', [Validators.required, ValidationService.requiredValidator]],
      password: ['', [Validators.required, ValidationService.requiredValidator]],
      function: ['', [Validators.required, ValidationService.requiredValidator]],
      quality: ['', [Validators.required, ValidationService.requiredValidator]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.unitList = this.aerodrome ?  this.aerodrome.units : [];
  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  submitUserCreate(): void {
    if (this.checkExtraFieldsValidity() && this.signUpForm.valid){
      this.submitAgentCreate();
    }
  }

  submitAgentCreate(): void{
    if (this.aerodrome) {
        if (this.localInf){

        }
        else if (this.unit) {

        }
        else {

        }
    }
    else if (this.nationalInf){

    }
    else if (this.localInf) {

    }
  }

  beforeSubmit(): void {
    if (this.aerodrome.localinformer && this.unit){
      const unitIsLocalInf = this.unit.id === this.aerodrome.localinformer.unit;
      if (unitIsLocalInf){
        this.localInf = this.aerodrome.localinformer;
      }
    }
  }

  checkExtraFieldsValidity(): boolean {
    return this.localInf !== undefined || this.nationalInf !== undefined ||
    ((this.aerodrome !== undefined && this.unit === undefined &&
      this.signUpForm.controls.role.value === ROLES.SOURCE_STRUCTURE)
      || (this.aerodrome !== undefined && this.unit !== undefined ));
  }

  changeAerodrome(event): void {
    console.log(event.target.value);
    const aerodrom = this.aerodromeList.find((elt: AerodromeExtend) => elt.id === event.target.value);
    this.unitList = aerodrom.units;
  }

  reinitAll(): void {
    this.localInfExternsList = [];
    this.aerodromeList = [];
    this.nationalInfList = [];
    this.nationalInf = undefined;
    this.aerodrome = undefined;
    this.localInf = undefined;
  }

  changeRole(event): void{
    this.reinitAll();
    const role = event.target.value;
    if (ROLES.aerodromeRoles.includes(role)){
      // if (role === ROLES.SOURCE_STRUCTURE){

      // }
      this.nationalInfList = [];
      this.localInfExternsList = [];
      this.aerodromeList = [
        {
          id: '0',
          name: 'Aéroport de Douala',
          units: [
            {
              id: '0',
              name: 'Unité MIRE'
            },
            {
              id: '1',
              name: 'Unité AIM',
            },
          ],
          localinformer: {
            id: '0',
            name: 'Unité AIM',
            unit: '1',
            aerodrome: '0'
          }
        },
        {
          id: '0',
          name: 'Aéroport de Yaoundé',
          units: [
            {
              id: '0',
              name: 'Unité MIRE'
            },
            {
              id: '1',
              name: 'Unité AIM'
            },
          ]
        },
      ];
    }
    else if (ROLES.localInformerRoles.includes(role)){
      this.localInfExternsList = [
        {
          id: '0',
          name: 'SEGC'
        }
      ];
    }
    else if (ROLES.nationalInformerRoles.includes(role)){
      this.nationalInfList = [
        {
          id: '0',
          name: 'SEGC'
        },
        {
          id: '1',
          name: 'ASECNA REPRESENTANT'
        }
      ];
    }
  }
}
