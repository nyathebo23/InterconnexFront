import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AerodromeExtendI } from 'src/app/interfaces/aerodrome-extend.interface';
import { LocalInformerI } from 'src/app/interfaces/local-informer.interface';
import { UnitLite } from 'src/app/interfaces/unit-lite.interface';
import { LocalInformer } from 'src/app/models/local-informer.model';
import { AdminService } from 'src/app/services/agent-services/admin.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-inf-local-management',
  templateUrl: './inf-local-management.component.html',
  styleUrls: ['./inf-local-management.component.scss', '../../../assets/css/tables.scss']
})
export class InfLocalManagementComponent implements OnInit {

  infLocalForm: FormGroup;
  inflocaux: LocalInformer[];
  headsInfLocal = ['InformateurLocal.name', 'UpdateDelete.editBtn', 'UpdateDelete.deleteBtn'];
  aerodromesList: AerodromeExtendI[] = [];
  unitsList: UnitLite[];
  errors: string[] = [];
  loading = false;
  createSuccess: boolean;
  aerodromesSubscription;
  loaderId = 'loc-inf';
  constructor(
    private formBuider: FormBuilder,
    private adminService: AdminService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private router: Router
  ) {
    this.infLocalForm = this.formBuider.group({
      name: ['', [Validators.required, ValidationService.requiredValidator]],
      aerodrome: [''],
      unit: ['']
    });
    this.infLocalForm.controls.aerodrome.valueChanges.subscribe((val) => {
      this.infLocalForm.controls.unit.setValue('');
    });
    this.ngxUiLoaderService.startLoader(this.loaderId);
    const localInfsSubscription = this.adminService.getLocalInformersList().pipe(
      map((localinfs: LocalInformerI[]) => localinfs.map((val) => LocalInformer.fromJSON(val)))
    ).subscribe((localinfs: LocalInformer[]) => {
      this.inflocaux = localinfs;
    }, error => {
      this.adminService.setError(error);
    }, () => {
      this.ngxUiLoaderService.stopLoader(this.loaderId);
    });
  }

  isAerodromeLocalInf(): boolean {
    const value = this.infLocalForm.controls.aerodrome.value;
    return value !== null && value !== undefined && value !== '';
  }

  ngOnInit(): void{
    this.aerodromesSubscription = this.adminService.getAerodromesList('True').subscribe((aerodromes: AerodromeExtendI[]) => {
      this.aerodromesList = aerodromes;
      console.log(aerodromes);
    }, error => {
      this.adminService.setError(error);
    });
    this.infLocalForm.controls.aerodrome.valueChanges.subscribe((value) => {
      const aerodrome = this.aerodromesList.find((elt: AerodromeExtendI) => {
        return elt.id.toString() === value;
      });
      if (aerodrome){
        this.unitsList = aerodrome.units;
      }
    });
  }

  submit(): void{
    this.loading = true;
    const formData = new FormData();
    formData.append('name', this.infLocalForm.controls.name.value);
    console.log(this.infLocalForm.controls.name.value);
    const unitValue = this.infLocalForm.controls.unit.value;
    if (unitValue ){
      formData.append('unit', this.infLocalForm.controls.unit.value);
      // formData.append('aerodrome', this.infLocalForm.controls.aerodrome.value);
    }
    this.adminService.createLocalInformer(formData)
    .then((resp) => {
      this.adminService.reloadCurrentRoute();
    })
    .catch((err) => {
      this.errors = this.adminService.displayErrors(err);
    })
    .finally(() => this.loading = false);
  }

  isFormValid(): boolean {
    const aerodrome = this.infLocalForm.controls.aerodrome.value;
    const unit = this.infLocalForm.controls.unit.value;
    if (aerodrome){
      return unit !== '' && this.infLocalForm.valid;
    }
    return this.infLocalForm.valid;
  }

  edit(inflocal: LocalInformer): void{
    console.log(inflocal);
  }

  delete(id: string): void{
    // this.adminService.deleteLocalInformer(id)
    // .then(() => {
    //   this.adminService.reloadCurrentRoute();
    // })
    // .catch((err) => {

    // });
  }

}
