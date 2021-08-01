import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { VALIDITY_PERIOD_ESTIMATED, VALIDITY_PERIOD_PLANNED } from 'src/app/commons/constants';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { UnitSource } from 'src/app/models/unit-source.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';

@Component({
  selector: 'app-notam',
  templateUrl: './notam.component.html',
  styleUrls: ['./notam.component.scss']
})
export class NotamComponent implements OnInit {

  notamForm: FormGroup;
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
    this.notamForm = this.formBuilder.group({
      depositDateTime: [{value: new Date(), disabled: true}],
      rangeAction: [''],
      typeNOTAM: ['NOTAM N'],
      text: [''],
      notamTargetCode: [''],
      coords: [''],
      periodType: ['planned'],
      validityPeriod: [[new Date(), new Date()], [ValidationService.DateValidator]],
      dailyFreqStart: [''],
      dailyFreqEnd: [''],
      infLimit: [''],
      supLimit: [''],
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
    return this.notamForm.controls;
  }

  get files(): FormArray{
    return this.form.filesForm as FormArray;
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
      // filename: event.target.files[0].name
    });

  }

  isReplaceNOTAM(): boolean {
    return this.notamForm.controls.typeNOTAM.value !== 'NOTAM N';
  }

  save(): void {
    const formData = new FormData();
    formData.append('type_notam', this.notamForm.controls.typeNOTAM.value);
    formData.append('descriptive_text', this.notamForm.controls.text.value);
    formData.append('range_action', this.notamForm.controls.rangeAction.value);
    formData.append('coords', this.notamForm.controls.coords.value);
    formData.append('start_val_period', this.notamForm.controls.validityPeriod.value[0].toISOString());
    formData.append('end_val_period', this.notamForm.controls.validityPeriod.value[1].toISOString());
    // formData.append('daily_freq_start', this.notamForm.controls.dailyFreqStart.value);
    // formData.append('daily_freq_end', this.notamForm.controls.dailyFreqEnd.value);
    formData.append('lower_vertical_limit', this.notamForm.controls.infLimit.value);
    formData.append('upper_vertical_limit', this.notamForm.controls.supLimit.value);
    const validityPeriod = this.notamForm.controls.periodType.value === 'planned' ? VALIDITY_PERIOD_PLANNED : VALIDITY_PERIOD_ESTIMATED;
    formData.append('validity_period_type', validityPeriod);
    formData.append('code_notam_replaceorcancel', this.notamForm.controls.notamTargetCode.value);
    const nbAttachs = this.files.length;
    for (let i = 0; i < nbAttachs; i++){
      const fileform = this.files.controls[i] as FormGroup;
      formData.append(`attachments[${i}]file`, fileform.controls.file.value);
    }
    this.sourceAgentService.createNOTAM(formData)
    .then(() => {
      this.createSuccess = true;
      setTimeout(() => this.createSuccess = false, 100000);
    })
    .catch((err) => {
      this.errors = this.sourceAgentService.displayErrors(err);
      setTimeout(() => this.errors = [], 100000);
    });
  }
}
