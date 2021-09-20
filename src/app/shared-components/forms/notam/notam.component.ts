import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';
import { DAILY_FREQ_ESTIMATED, DAILY_FREQ_PLANNED, VALIDITY_PERIOD_ESTIMATED, VALIDITY_PERIOD_PLANNED } from 'src/app/commons/constants';
import { DemandeNOTAM } from 'src/app/models/demande-notam.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalSuccessCreationDDIAComponent } from '../../components/modal-success-creation-ddia/modal-success-creation-ddia.component';

@Component({
  selector: 'app-notam',
  templateUrl: './notam.component.html',
  styleUrls: ['./notam.component.scss']
})
export class NotamComponent implements OnInit {

  notamForm: FormGroup;
  loadingDatas = true;
  loadingSave: boolean;
  errors: string[];
  isDisabledDaily = true;
  constructor(
    private formBuilder: FormBuilder,
    private sourceAgentService: AgentSourceService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.form.validityPeriod.valueChanges.subscribe(
      value => {
        if (value[0] == null || value[1] == null){
          if (this.form.dailyFreqType.enabled){
            this.setTimeFieldsEmpty();
            this.disableTimeFields();
          }
        }
        else {
          if (this.form.dailyFreqType.disabled){
            this.enableTimeFields();
          }
        }
      }
    );
    this.form.typeNOTAM.valueChanges.subscribe(
      (value) => {
        if (value === 'NOTAM N'){
           this.form.notamTargetCode.setValue('');
           this.form.notamTargetCode.disable();
           if (this.form.dailyFreqType.disabled){
            this.enableTimeFields();
           }
        }
        else {
          this.form.notamTargetCode.enable();
          if (value === 'NOTAM C'){
            if (this.form.dailyFreqType.enabled){
            this.disableTimeFields();
            }
          }
        }
      }
    );
  }

  disableTimeFields(): void {
    this.form.dailyFreqStart.disable();
    this.form.dailyFreqEnd.disable();
    this.form.dailyFreqType.disable();
  }

  enableTimeFields(): void {
    this.form.dailyFreqStart.enable();
    this.form.dailyFreqEnd.enable();
    this.form.dailyFreqType.enable();
  }

  setTimeFieldsEmpty(): void {
    this.form.dailyFreqStart.setValue('');
    this.form.dailyFreqEnd.setValue('');
    this.form.dailyFreqType.setValue('');

  }

  initForm(): void {
    this.notamForm = this.formBuilder.group({
      depositDateTime: [{value: null, disabled: true}],
      rangeAction: [''],
      typeNOTAM: ['NOTAM N'],
      text: ['', [Validators.required, ValidationService.requiredValidator]],
      notamTargetCode: [{value: '', disabled: true}, [Validators.required, ValidationService.requiredValidator]],
      coords: [''],
      periodType: ['planned', [Validators.required]],
      validityPeriod: [[new Date(), new Date()], [ValidationService.DateValidator]],
      dailyFreqType: [''],
      dailyFreqStart: [''],
      dailyFreqEnd: [''],
      infLimit: [''],
      supLimit: [''],
      filesForm: new FormArray([])});
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
        file: [null, [Validators.required]],
        filename: [{value: '', disabled: true}]
      })
    );
  }
  removeFileForm(): void{
    this.files.removeAt(this.files.length - 1);
  }

  onFileSelected(event: any, fileForm: any): void{
    if (event.target.files[0].size > 10000000){
      alert('file size is too high');
      return;
    }
    fileForm.patchValue({
      file: event.target.files[0],
      // filename: event.target.files[0].name
    });

  }


  timeValGreaterThan(value1: string, value2: string): boolean {
    const time1 = value1.split(':').map((val) => parseInt(val, 10));
    const time2 = value2.split(':').map((val) => parseInt(val, 10));
    if ( time1[0] > time2[0]){
      return true;
    }
    else {
      if (time1[0] === time2[0]){
        return time1[1] > time2[1];
      }
      return false;
    }
  }

  save(): void {
    const formData = new FormData();
    const typeNOTAM = this.notamForm.controls.typeNOTAM.value;
    const codeNOTAMReplaced: string = this.notamForm.controls.notamTargetCode.value;

    const valPeriod = this.notamForm.controls.validityPeriod.value;
    const periodType = this.notamForm.controls.periodType.value;
    const dailyFreqStart = this.notamForm.controls.dailyFreqStart.value;
    const dailyFreqEnd = this.notamForm.controls.dailyFreqEnd.value;
    const dailyFreqType = this.notamForm.controls.dailyFreqType.value;

    if (valPeriod[0] && valPeriod[1]){

      formData.append('validity_period_type', periodType === 'planned' ? VALIDITY_PERIOD_PLANNED : VALIDITY_PERIOD_ESTIMATED);
      formData.append('start_val_period', valPeriod[0].toISOString());
      formData.append('end_val_period', valPeriod[1].toISOString());

      if (dailyFreqEnd || dailyFreqStart){
        if (!dailyFreqStart || !dailyFreqEnd){
          this.errors = ['DDIAFORMS.errors.timeInvalid'];
          return;
        }
        if (this.timeValGreaterThan(dailyFreqStart, dailyFreqEnd)){
          this.errors = ['DDIAFORMS.errors.timeInvalid'];
          return;
        }
        if (!dailyFreqType){
          this.errors = ['DDIAFORMS.errors.emptyTypeDailyFreq'];
        }
      }
      else if (dailyFreqType){
        this.errors = ['DDIAFORMS.errors.timeInvalid'];
        return;
      }
      if (dailyFreqType){
        formData.append('daily_freq_type', dailyFreqType === 'planned' ? DAILY_FREQ_PLANNED : DAILY_FREQ_ESTIMATED);
        formData.append('daily_freq_start', dailyFreqStart);
        formData.append('daily_freq_end', dailyFreqEnd);
      }
    }
    formData.append('type_notam', typeNOTAM);
    formData.append('descriptive_text', this.notamForm.controls.text.value);
    formData.append('range_action', this.notamForm.controls.rangeAction.value);
    formData.append('coords', this.notamForm.controls.coords.value);

    formData.append('lower_vertical_limit', this.notamForm.controls.infLimit.value);
    formData.append('upper_vertical_limit', this.notamForm.controls.supLimit.value);
    formData.append('code_notam_replaceorcancel', codeNOTAMReplaced);
    const nbAttachs = this.files.length;
    for (let i = 0; i < nbAttachs; i++){
      const fileform = this.files.controls[i] as FormGroup;
      formData.append(`attachments[${i}]file`, fileform.controls.file.value);
    }
    this.loadingSave = true;
    this.sourceAgentService.createNOTAM(formData)
    .then((res) => {
      this.errors = [];
      this.modalService.show(ModalSuccessCreationDDIAComponent,
        this.modalDisplayService.getModalOptions({typeDDIA: 'NOTAM', contentText: 'MODAL.successCreateDDIA', id: res.id}, 'modal-dialog modal-notify modal-success')
      );
    })
    .catch((err) => {
      this.errors = this.sourceAgentService.displayErrors(err);
      setTimeout(() => this.errors = [], 100000);
    })
    .finally(() => this.loadingSave = false);
  }

}
