import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { UnitSource } from 'src/app/models/unit-source.model';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-source-unit-form',
  templateUrl: './source-unit-form.component.html',
  styleUrls: ['./source-unit-form.component.scss']
})
export class SourceUnitFormComponent implements OnInit {

  sourceUnitForm: FormGroup;
  // les 03 input suivants ne sont pas initialisés par un composant parent quand on a affaire à
  // une initiation de demande de diffusion d'information aéronautique
  @Input() locationInd: string;
  @Input() unit: UnitSource;
  @Input() initiatorInfos: string;
  loadingDatas = true;
  loaderId = 'unit-ddia';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthManagerService,
    private ngxUiLoaderService: NgxUiLoaderService
  ) {

  }

  ngOnInit(): void {
    if (this.unit){
      this.sourceUnitForm = this.formBuilder.group({
        airportLocationIndicator: [{value: this.locationInd ? this.locationInd : '', disabled: true}],
        name: [{value: this.unit ? this.unit.name : '', disabled: true}],
        adress: [{value: this.unit ? this.unit.address : '', disabled: true}],
        fax: [{value: this.unit ? this.unit.fax : '', disabled: true}],
        telephone: [{value: this.unit ? this.unit.phonenumber : '', disabled: true}],
        email: [{value: this.unit ? this.unit.email : '', disabled: true}],
        rsfta: [{value: this.unit ? this.unit.rsfta : '', disabled: true}],
        initiatorInfos: [{value: this.initiatorInfos, disabled: true}]
      });
      this.loadingDatas = false;
    }
    else {
      this.ngxUiLoaderService.startLoader(this.loaderId);
      this.authService.getAgentInfos()
      .then((data) => {
        if (data.localinformer){
          this.unit = UnitSource.fromJSON(data.localinformer.unit) ;
          this.locationInd = Aerodrome.fromJSON(data.localinformer.aerodrome).locationInd;
          this.initiatorInfos = data.user.last_name + ' ' + data.user.first_name + ',  ' + data.user.function + ',  ' + data.user.quality;
        }
        else{
          this.unit = UnitSource.fromJSON(data.unit);
          this.locationInd = Aerodrome.fromJSON(data.aerodrome).locationInd;
          this.initiatorInfos = data.user.last_name + ' ' + data.user.first_name + ',  ' + data.user.function + ',  ' + data.user.quality;
        }
        this.sourceUnitForm = this.formBuilder.group({
          airportLocationIndicator: [{value: this.locationInd, disabled: true}],
          name: [{value: this.unit.name, disabled: true}],
          adress: [{value: this.unit.address, disabled: true}],
          fax: [{value: this.unit.fax, disabled: true}],
          telephone: [{value: this.unit.phonenumber, disabled: true}],
          email: [{value: this.unit.email, disabled: true}],
          rsfta: [{value: this.unit.rsfta ? this.unit.rsfta : '', disabled: true}],
          initiatorInfos: [{value: this.initiatorInfos, disabled: true}]
        });
        this.loadingDatas = false;
        this.ngxUiLoaderService.stopLoader(this.loaderId);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
