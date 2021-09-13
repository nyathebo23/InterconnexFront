import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MDBModalService } from 'angular-bootstrap-md';
import {  NgxUiLoaderService } from 'ngx-ui-loader';
import { DRAFT_STATE, NON_CONFORMING_STATE, NOT_ADMITTED_STATE, NOT_APPROVED_STATE, NOT_VALIDATED_STATE , DAILY_FREQ_ESTIMATED,
  DAILY_FREQ_PLANNED, NOTAM_CLASS_NAME, NOTAM_TYPE, VALIDITY_PERIOD_ESTIMATED, VALIDITY_PERIOD_PLANNED } from 'src/app/commons/constants';
import { DemandeNOTAM } from 'src/app/models/demande-notam.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalConfirmCancelDDIAComponent } from '../../components/modal-confirm-cancel-ddia/modal-confirm-cancel-ddia.component';
import { ModalSuccessCreationDDIAComponent } from '../../components/modal-success-creation-ddia/modal-success-creation-ddia.component';

@Component({
  selector: 'app-notam-modif',
  templateUrl: './notam-modif.component.html',
  styleUrls: ['./notam-modif.component.scss']
})
export class NOTAMModifComponent implements OnInit {

  notamForm: FormGroup;
  loadingDatas = true;
  loadingSave: boolean;
  errors: string[];
  demandeNOTAM: DemandeNOTAM;
  initiatorInfos: string;
  toDoAction: string;
  isOwner: boolean;
  canModify: boolean;
  modalCancelDatas: any;
  loaderId = 'notam-loader';
  constructor(
    private authService: AuthManagerService,
    private formBuilder: FormBuilder,
    private sourceAgentService: AgentSourceService,
    private controlActorService: ControlActorService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private activatedRoute: ActivatedRoute,
    private ngxUiLoaderService: NgxUiLoaderService,

  ) {
    this.toDoAction = this.activatedRoute.snapshot.data.toDoAction;
  }

  ngOnInit(): void {
    try {
      const id = atob(decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('id')));
      this.ngxUiLoaderService.startLoader(this.loaderId);
      this.controlActorService.getNOTAMDetailsById(id).subscribe(
        (demandenotam) => {
          const user = this.authService.getUser();
          this.isOwner = user.id === demandenotam.history[0].agentObject.user.id;
          this.canModify = [DRAFT_STATE, NON_CONFORMING_STATE,
            NOT_APPROVED_STATE, NOT_VALIDATED_STATE, NOT_ADMITTED_STATE].indexOf(demandenotam.state) !== -1;
          this.demandeNOTAM = demandenotam;
          this.ngxUiLoaderService.stopLoader(this.loaderId);
          this.initForm();
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
        }, error => {
          this.controlActorService.setError(error);
        },
        () => {
          this.ngxUiLoaderService.stopLoader(this.loaderId);
        }
      );
    }
    catch (err){
    }
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
    this.modalCancelDatas = {
      ddiaClassName: NOTAM_CLASS_NAME,
      ddiaType: NOTAM_TYPE,
      ddiaId: this.demandeNOTAM.id,
      action: this.toDoAction
    };
    const periodType = this.demandeNOTAM.periodType === VALIDITY_PERIOD_PLANNED ? 'planned' :
    this.demandeNOTAM.periodType === VALIDITY_PERIOD_ESTIMATED ? 'estimated' : '';
    const dailyFreqType = this.demandeNOTAM.dailyFreqType === DAILY_FREQ_PLANNED ? 'planned' :
    this.demandeNOTAM.dailyFreqType === DAILY_FREQ_ESTIMATED ? 'estimated' : '';

    this.notamForm = this.formBuilder.group({
      depositDateTime: [{value: new Date(), disabled: true}],
      rangeAction: [this.demandeNOTAM.rangeAction],
      typeNOTAM: [this.demandeNOTAM.typeNOTAM],
      text: [this.demandeNOTAM.text],
      notamTargetCode: [{value: this.demandeNOTAM.replaceorcancelNOTAMCode, disabled: this.demandeNOTAM.typeNOTAM === 'NOTAM N' },
      [Validators.required, ValidationService.requiredValidator]],
      coords: [this.demandeNOTAM.coords],
      periodType: [periodType, [Validators.required]],
      validityPeriod: [[this.demandeNOTAM.startValidityPeriod, this.demandeNOTAM.endValidityPeriod], [ValidationService.DateValidator]],
      dailyFreqType: [{value: dailyFreqType, disabled: this.demandeNOTAM.typeNOTAM === 'NOTAM C'} ],
      dailyFreqStart: [{value: this.demandeNOTAM.dailyFreqStart, disabled: this.demandeNOTAM.typeNOTAM === 'NOTAM C'}],
      dailyFreqEnd: [{value: this.demandeNOTAM.dailyFreqEnd, disabled: this.demandeNOTAM.typeNOTAM === 'NOTAM C'}],
      infLimit: [this.demandeNOTAM.lowerVerticalLimit],
      supLimit: [this.demandeNOTAM.upperVerticalLimit],
      filesForm: new FormArray([])
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

  validateAgainAndGetFormData(): FormData {
    const formData = new FormData();
    const typeNOTAM = this.notamForm.controls.typeNOTAM.value;
    const codeNOTAMReplaced = this.notamForm.controls.notamTargetCode.value;

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

    return formData;
  }

  save(): void {
    const formData = this.validateAgainAndGetFormData();
    if (!formData){
      return;
    }
    this.sourceAgentService.updateNOTAM(this.demandeNOTAM.id, formData)
    .then((res) => {
      this.errors = [];
      this.modalService.show(ModalSuccessCreationDDIAComponent,
        this.modalDisplayService.getModalOptions({typeDDIA: 'NOTAM', contentText: 'MODAL.successModifDDIA', id: res.id}, 'modal-dialog modal-notify modal-success')
      );
    })
    .catch((err) => {
      this.errors = this.sourceAgentService.displayErrors(err);
      setTimeout(() => this.errors = [], 100000);
    })
    .finally(() => this.loadingSave = false);
  }


  openCancelConfirmModal(): void {
    this.modalService.show(ModalConfirmCancelDDIAComponent,
      this.modalDisplayService.getModalOptions(this.modalCancelDatas, 'modal-dialog modal-notify modal-danger'));
  }
}
