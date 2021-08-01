import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { UnitSource } from 'src/app/models/unit-source.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-supp-aip',
  templateUrl: './supp-aip.component.html',
  styleUrls: ['./supp-aip.component.scss']
})
export class SUPPAIPComponent implements OnInit {

  suppaipForm: FormGroup;
  locationInd: string;
  initiatorInfos: string;
  unit: UnitSource;
  loadingDatas = true;
  errors: string[];
  createSuccess = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthManagerService,
    private sourceAgentService: AgentSourceService
  ) {
    this.suppaipForm = this.formBuilder.group({
      depositDateTime: [{value: new Date(), disabled: true}],
      typeSUPPAIP: ['SUPP AIP N'],
      text: [''],
      object: [''],
      codeDDIAToReplace: [''],
      aipTargetSections: [''],
      // aipTargetSectForm: new FormArray([]),
      validityPeriod: [[new Date(), new Date()], [ValidationService.DateValidator]],
      descriptionText: [''],
      filesForm: new FormArray([])
    });
  }

  ngOnInit(): void {
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
      this.loadingDatas = false;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  get form(): {[key: string]: AbstractControl}{
    return this.suppaipForm.controls;
  }

  get files(): FormArray{
    return this.form.filesForm as FormArray;
  }

  get aipTargetSections(): FormArray{
    return this.form.aipTargetSectForm as FormArray;
  }

  addAIPTargetSection(): void {
    this.aipTargetSections.push(
       new FormControl('', [Validators.required, ValidationService.requiredValidator])
    );
  }

  removeAIPTargetSection(): void {
    this.aipTargetSections.removeAt(this.aipTargetSections.length - 1);
  }

  addFileForm(): void{
    this.files.push(
      this.formBuilder.group({
        file: ['', [Validators.required]],
        filename: [{value: '', disabled: true}]
      })
    );
  }

  removeFileForm(): void{
    this.files.removeAt(this.files.length - 1);
  }

  onFileSelected(event: any, fileForm: any): void{
    console.log(fileForm);
    console.log(this.files);
    fileForm.patchValue({
      file: event.target.files[0],
      filename: event.target.files[0].name
    });
  }

  isReplaceSUPPAIP(): boolean {
    return this.suppaipForm.controls.typeSUPPAIP.value !== 'SUPP AIP N';
  }

  save(): void {
    const formData = new FormData();
    formData.append('type_suppaip', this.suppaipForm.controls.typeSUPPAIP.value);
    formData.append('object', this.suppaipForm.controls.object.value);
    formData.append('descriptive_text', this.suppaipForm.controls.text.value);
    formData.append('aip_target_sections', this.suppaipForm.controls.aipTargetSections.value);
    formData.append('start_val_period', this.suppaipForm.controls.validityPeriod.value[0].toISOString());
    formData.append('end_val_period', this.suppaipForm.controls.validityPeriod.value[1].toISOString());
    formData.append('code_ddia_replaced', this.suppaipForm.controls.codeDDIAToReplace.value);
    const nbAttachs = this.files.length;
    for (let i = 0; i < nbAttachs; i++){
      const fileform = this.files.controls[i] as FormGroup;
      formData.append(`attachments[${i}]file`, fileform.controls.file.value);
    }

    this.sourceAgentService.createSUPPAIP(formData)
    .then(() => {
      this.createSuccess = true;
      setTimeout(() => this.createSuccess = false, 10000);
    })
    .catch((err) => {
      this.errors = this.sourceAgentService.displayErrors(err);
      setTimeout(() => this.errors = [], 10000);
    });
  }

}
