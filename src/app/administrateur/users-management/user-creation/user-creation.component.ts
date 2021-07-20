import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AerodromeExtendI } from 'src/app/interfaces/aerodrome-extend.interface';
import { LocalInformerI } from 'src/app/interfaces/local-informer.interface';
import { NationalInformerI } from 'src/app/interfaces/national-informer.interface';
import { SignupResponse } from 'src/app/interfaces/signup-reponse.interface';
import { UnitLite } from 'src/app/interfaces/unit-lite.interface';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { LocalInformer } from 'src/app/models/local-informer.model';
import { NationalInformer } from 'src/app/models/national-informer.model';
import { Unit } from 'src/app/models/unit.model';
import { AdminService } from 'src/app/services/agent-services/admin.service';
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
  aerodromeList: AerodromeExtendI[] = new Array<AerodromeExtendI>();
  unitList: UnitLite[];
  localInfExternsList: LocalInformerI[] = new Array<LocalInformerI>();
  nationalInfList: NationalInformerI[] = new Array<NationalInformerI>();
  aerodrome: AerodromeExtendI;
  unit: UnitLite;
  localInf: LocalInformerI;
  nationalInf: NationalInformerI;
  userRoles = ROLES;
  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, ValidationService.requiredValidator]],
      email: ['', [Validators.required, ValidationService.requiredValidator, ValidationService.emailValidator]],
      firstname: ['', [Validators.required, ValidationService.requiredValidator]],
      lastname: ['', [Validators.required, ValidationService.requiredValidator]],
      password: ['', [Validators.required, ValidationService.requiredValidator]],
      function: ['', [Validators.required, ValidationService.requiredValidator]],
      quality: ['', [Validators.required, ValidationService.requiredValidator]],
      role: ['', [Validators.required]],
      sex: ['', [Validators.required]],
    });
    this.signUpForm.controls.role.valueChanges.subscribe((role: string) => {
      this.reinitAll();
    });
    const aerodromesSubscription = this.adminService.getAerodromesList('True').subscribe((aerodromes: AerodromeExtendI[]) => {
      this.aerodromeList = aerodromes;
    });
    const localinfsSubscription =  this.adminService.getLocalInformersList('True').subscribe((localinfs: LocalInformerI[]) => {
      this.localInfExternsList = localinfs;
    });
    const nationalinfsSubscription = this.adminService.getNationalInformersList().subscribe((nationalinfs: NationalInformerI[]) => {
      this.nationalInfList = nationalinfs;
    });
  }

  ngOnInit(): void {
    this.unitList = this.aerodrome ?  this.aerodrome.units : [];
  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  submitUserCreate(): void {
    this.beforeSubmit();
    const formData = new FormData();
    formData.append('username', this.signUpForm.controls.username.value);
    formData.append('email', this.signUpForm.controls.email.value);
    formData.append('first_name', this.signUpForm.controls.firstname.value);
    formData.append('last_name', this.signUpForm.controls.lastname.value);
    formData.append('password', this.signUpForm.controls.password.value);
    formData.append('function', this.signUpForm.controls.function.value);
    formData.append('quality', this.signUpForm.controls.quality.value);
    formData.append('role', this.signUpForm.controls.role.value);
    formData.append('sex', this.signUpForm.controls.sex.value);

    if (this.checkExtraFieldsValidity() && this.signUpForm.valid){
      this.adminService.signUpUser(formData).then((response: SignupResponse) => {
        this.submitAgentCreate(response.user_id);
      }).catch((err) => {

      });
    }
  }

  submitAgentCreate(userId): void{
    const formData = new FormData();
    formData.append('user_id', userId);
    if (this.aerodrome) {
        if (this.localInf){
          formData.append('localinformer', this.localInf.id);
          this.adminService.createLocalAgent(formData);
        }
        else if (this.unit) {
          formData.append('unit', this.unit.id);
          formData.append('aerodrome', this.aerodrome.id);
          this.adminService.createAgent(formData);
        }
        else {
          formData.append('aerodrome', this.aerodrome.id);
          this.adminService.createAgent(formData);
        }
    }
    else if (this.nationalInf){
      formData.append('nationalinformer', this.nationalInf.id);
      this.adminService.createNationalAgent(formData);
    }
    else if (this.localInf) {
      formData.append('localinformer', this.localInf.id);
      this.adminService.createLocalAgent(formData);
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
    const aerodrome = this.aerodromeList.find((elt: AerodromeExtendI) => elt.id === event.target.value);
    this.unitList = aerodrome.units;
  }

  reinitAll(): void {
    this.localInfExternsList = [];
    this.aerodromeList = [];
    this.nationalInfList = [];
    this.nationalInf = undefined;
    this.aerodrome = undefined;
    this.localInf = undefined;
  }
  isAerodromeAgent(): boolean{
    const role = this.signUpForm.controls.role.value;
    return ROLES.aerodromeRoles.includes(role);
  }
  isExtLocalInfAgent(): boolean{
    const role = this.signUpForm.controls.role.value;
    return ROLES.localInformerRoles.includes(role);
  }
  isNationalInfAgent(): boolean{
    const role = this.signUpForm.controls.role.value;
    return ROLES.nationalInformerRoles.includes(role);
  }

}
