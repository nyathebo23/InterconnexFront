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
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import * as ROLES from '../../../commons/constants-roles';



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
  unitList: UnitLite[] = [];
  localInfExternsList: LocalInformerI[] = new Array<LocalInformerI>();
  nationalInfList: NationalInformerI[] = new Array<NationalInformerI>();
  aerodrome: AerodromeExtendI;
  aerodromeId: string;
  unitId: string;
  localInfId: string;
  nationalInfId: string;
  userRoles = ROLES;
  errors: string[] = [];
  aerodromesSubscription;
  localinfsSubscription;
  nationalinfsSubscription;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private authService: AuthManagerService
  ) {
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
      this.aerodromesSubscription = this.adminService.getAerodromesList('True').subscribe((aerodromes: AerodromeExtendI[]) => {
        this.aerodromeList = aerodromes;
      });
      this.localinfsSubscription =  this.adminService.getLocalInformersList('True').subscribe((localinfs: LocalInformerI[]) => {
        this.localInfExternsList = localinfs;
      });
      this.nationalinfsSubscription = this.adminService.getNationalInformersList().subscribe((nationalinfs: NationalInformerI[]) => {
        this.nationalInfList = nationalinfs;
      });
    });

  }

  ngOnInit(): void {
    this.aerodromesSubscription = this.adminService.getAerodromesList('True').subscribe((aerodromes: AerodromeExtendI[]) => {
      this.aerodromeList = aerodromes;
    });
    this.localinfsSubscription =  this.adminService.getLocalInformersList('True').subscribe((localinfs: LocalInformerI[]) => {
      this.localInfExternsList = localinfs;
    });
    this.nationalinfsSubscription = this.adminService.getNationalInformersList().subscribe((nationalinfs: NationalInformerI[]) => {
      this.nationalInfList = nationalinfs;
    });
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
        const userid = response.user_id;
        this.loading = true;
        this.submitAgentCreate(userid)
        .then((res) => {
          console.log(res);
          this.router.navigate(['/auth/signupverif', userid]);
        })
        .catch((err) => {
          this.errors = this.authService.displayErrors(err);
          this.adminService.deleteUser(userid);
          setTimeout(() => this.errors = [], 10000);
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 0){
          const error = 'Errors.serverconnection';
          this.errors = [error];
        }
        else{
          this.errors = this.authService.displayErrors(err);
        }
        setTimeout(() => this.errors = [], 10000);
      })
      .finally(() => this.loading = false);
    }
  }

  submitAgentCreate(userId): Promise<any>{
    const formData = new FormData();
    formData.append('user', userId);
    if (this.aerodrome) {
        console.log(this.localInfId);
        if (this.localInfId){
          formData.append('localinformer', this.localInfId);
          return this.adminService.createLocalAgent(formData).toPromise();
        }
        else if (this.unitId) {
          formData.append('unit', this.unitId);
          formData.append('aerodrome', this.aerodromeId);
          return this.adminService.createAgent(formData).toPromise();
        }
        else {
          formData.append('aerodrome', this.aerodrome.id);
          return this.adminService.createAgent(formData).toPromise();
        }
    }
    else if (this.nationalInfId){
      formData.append('nationalinformer', this.nationalInfId);
      return this.adminService.createNationalAgent(formData).toPromise();
    }
    else if (this.localInfId) {
      formData.append('localinformer', this.localInfId);
      return this.adminService.createLocalAgent(formData).toPromise();
    }
  }

  beforeSubmit(): void {
    if (this.aerodrome){
      if (this.aerodrome.localinformer && this.unitId){
        const unitIsLocalInf = this.unitId === this.aerodrome.localinformer.unit.toString();
        if (unitIsLocalInf){
          this.localInfId = this.aerodrome.localinformer.id;
        }
      }
    }
  }

  checkExtraFieldsValidity(): boolean {
    const role = this.signUpForm.controls.role.value;
    const hasAerodromeConformity = this.aerodrome !== undefined && this.unitId === undefined && role === ROLES.SOURCE_STRUCTURE;
    if (this.aerodrome && this.aerodrome.localinformer){
      if (role === ROLES.SOURCE_VERIFIER ){
        return this.aerodrome.localinformer.unit.toString() === this.unitId;
      }
    }
    if (this.localInfId){
      return  role === ROLES.SOURCE_VERIFIER || role === ROLES.LOCAL_INFORMER || role === ROLES.LOCAL_VERIFIER;
    }
    return this.nationalInfId !== undefined ||
           hasAerodromeConformity || (this.aerodrome !== undefined && this.unitId !== undefined);
  }

  changeAerodrome(event): void {
    console.log(event.target.value);
    const aerodrome = this.aerodromeList.find((elt: AerodromeExtendI) => elt.id.toString() === event.target.value);
    this.aerodrome = aerodrome;
    this.unitList = aerodrome.units;
  }

  reinitAll(): void {
    this.localInfExternsList = [];
    this.aerodromeList = [];
    this.nationalInfList = [];
    this.nationalInfId = undefined;
    this.aerodrome = undefined;
    this.localInfId = undefined;
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
