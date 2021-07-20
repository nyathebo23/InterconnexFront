import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AerodromeExtendI } from 'src/app/interfaces/aerodrome-extend.interface';
import { LocalInformerI } from 'src/app/interfaces/local-informer.interface';
import { UnitLite } from 'src/app/interfaces/unit-lite.interface';
import { LocalInformer } from 'src/app/models/local-informer.model';
import { AdminService } from 'src/app/services/agent-services/admin.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-inf-local-management',
  templateUrl: './inf-local-management.component.html',
  styleUrls: ['./inf-local-management.component.scss', '../../../assets/css/tables.scss']
})
export class InfLocalManagementComponent implements OnInit {

  infLocalForm: FormGroup;
  inflocaux: LocalInformer[];
  headsInfLocal = ['ID', 'InformateurLocal.name', 'UpdateDelete.editBtn', 'UpdateDelete.deleteBtn'];
  aerodromesList: AerodromeExtendI[];
  unitsList: UnitLite;
  constructor(private formBuider: FormBuilder, private adminService: AdminService) {
    this.infLocalForm = this.formBuider.group({
      name: ['', [Validators.required, ValidationService.requiredValidator]],
      aerodrome: [''],
      unit: ['']
    });
    const aerodromesSubscription = this.adminService.getAerodromesList('True').subscribe((aerodromes: AerodromeExtendI[]) => {
      this.aerodromesList = aerodromes;
    });
    const localInfsSubscription = this.adminService.getLocalInformersList().pipe(
      catchError(this.adminService.handleError),
      map((localinfs: LocalInformerI[]) => {
        const localinformers = new Array<LocalInformer>();
        localinfs.forEach((localinf) => {
          localinformers.push(LocalInformer.fromJSON(localinf));
        });
        return localinformers;
      })
    ).subscribe((localinfs: LocalInformer[]) => {
      this.inflocaux = localinfs;
    });
  }

  isAerodromeLocalInf(): boolean {
    const value = this.infLocalForm.controls.aerodrome.value;
    return value !== null && value !== undefined;
  }

  ngOnInit(): void{
  }

  submit(): void{
    const formData = new FormData();
    formData.append('name', this.infLocalForm.controls.name.value);
    const unitValue = this.infLocalForm.controls.name.value;
    if (unitValue ){
      formData.append('unit', this.infLocalForm.controls.unit.value);
    }
    this.adminService.createLocalInformer(formData)
    .then(() => {

    })
    .catch((err) => {

    });
  }

  edit(inflocal: LocalInformer): void{
    console.log(inflocal);
  }

  delete(inflocal: LocalInformer): void{

  }
}
