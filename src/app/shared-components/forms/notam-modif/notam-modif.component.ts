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
import { CANCELLED_STATE, DAILY_FREQ_ESTIMATED, DAILY_FREQ_PLANNED, NOTAM_CLASS_NAME,
  NOTAM_TYPE, VALIDITY_PERIOD_ESTIMATED, VALIDITY_PERIOD_PLANNED } from 'src/app/commons/constants';
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
  isCancelled: boolean;
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
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.ngxUiLoaderService.startLoader(this.loaderId);
    this.controlActorService.getNOTAMDetailsById(id).subscribe(
      (demandenotam) => {
        const user = this.authService.getUser();
        this.isOwner = user.id === demandenotam.history[0].agentObject.user.id;
        this.isCancelled = demandenotam.state === CANCELLED_STATE;
        this.demandeNOTAM = demandenotam;
        this.ngxUiLoaderService.stopLoader(this.loaderId);
        this.initForm();
      }
    );
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
      notamTargetCode: [this.demandeNOTAM.replaceorcancelNOTAMCode],
      coords: [this.demandeNOTAM.coords],
      periodType: [periodType],
      validityPeriod: [[this.demandeNOTAM.startValidityPeriod, this.demandeNOTAM.endValidityPeriod], [ValidationService.DateValidator]],
      dailyFreqType: [dailyFreqType],
      dailyFreqStart: [this.demandeNOTAM.dailyFreqStart],
      dailyFreqEnd: [this.demandeNOTAM.dailyFreqEnd],
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
    const codeNOTAMReplaced: string = this.notamForm.controls.notamTargetCode.value;
    if (typeNOTAM === 'NOTAM N' && codeNOTAMReplaced.trim() !== ''){
      this.errors = ['DDIAFORMS.errors.replacedCodeNOTAMN'];
      return null;
    }
    else if (typeNOTAM !== 'NOTAM N' && codeNOTAMReplaced.trim() === ''){
      this.errors = ['DDIAFORMS.errors.replacedCodeNOTAMRC'];
      return null;
    }
    const dailyFreqStart = this.notamForm.controls.dailyFreqStart.value;
    const dailyFreqEnd = this.notamForm.controls.dailyFreqEnd.value;
    if (dailyFreqEnd || dailyFreqStart){
      if (!dailyFreqEnd || !dailyFreqStart){
        this.errors = ['DDIAFORMS.errors.timeInvalid'];
        return null;
      }
      if (this.timeValGreaterThan(dailyFreqStart, dailyFreqEnd)){
        this.errors = ['DDIAFORMS.errors.timeInvalid'];
        return null;
      }
    }
    this.loadingSave = true;
    formData.append('type_notam', this.notamForm.controls.typeNOTAM.value);
    formData.append('descriptive_text', this.notamForm.controls.text.value);
    formData.append('range_action', this.notamForm.controls.rangeAction.value);
    formData.append('coords', this.notamForm.controls.coords.value);
    formData.append('start_val_period', this.notamForm.controls.validityPeriod.value[0].toISOString());
    formData.append('end_val_period', this.notamForm.controls.validityPeriod.value[1].toISOString());
    formData.append('daily_freq_start', dailyFreqStart);
    formData.append('daily_freq_end', dailyFreqEnd);
    formData.append('lower_vertical_limit', this.notamForm.controls.infLimit.value);
    formData.append('upper_vertical_limit', this.notamForm.controls.supLimit.value);
    const validityPeriod = this.notamForm.controls.periodType.value === 'planned' ? VALIDITY_PERIOD_PLANNED : VALIDITY_PERIOD_ESTIMATED;
    formData.append('validity_period_type', validityPeriod);
    const dailyFreqType = this.notamForm.controls.dailyFreqType.value === 'planned' ? DAILY_FREQ_PLANNED : DAILY_FREQ_ESTIMATED;
    formData.append('daily_freq_type', dailyFreqType);
    formData.append('code_notam_replaceorcancel', this.notamForm.controls.notamTargetCode.value);
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
    .then(() => {
      this.errors = [];
      this.modalService.show(ModalSuccessCreationDDIAComponent,
        this.modalDisplayService.getModalOptions({typeDDIA: 'NOTAM', contentText: 'MODAL.successModifDDIA'}, 'modal-dialog modal-notify modal-success')
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
