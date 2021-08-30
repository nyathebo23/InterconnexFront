import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalService } from 'angular-bootstrap-md';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AIC_CLASS_NAME, AIC_TYPE, CANCELLED_STATE } from 'src/app/commons/constants';
import { DemandeAIC } from 'src/app/models/demande-aic.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalConfirmCancelDDIAComponent } from '../../components/modal-confirm-cancel-ddia/modal-confirm-cancel-ddia.component';
import { ModalSuccessCreationDDIAComponent } from '../../components/modal-success-creation-ddia/modal-success-creation-ddia.component';

@Component({
  selector: 'app-aic-modif',
  templateUrl: './aic-modif.component.html',
  styleUrls: ['./aic-modif.component.scss']
})
export class AICModifComponent implements OnInit {

  aicForm: FormGroup;
  subjectChoices: Array<{val: string, label: string}> = new Array();
  subjectList: Array<string>;
  loadingDatas = true;
  errors: string[];
  loadingSave: boolean;
  demandeAIC: DemandeAIC;
  isOwner: boolean;
  isCancelled: boolean;
  initiatorInfos: string;
  modalCancelDatas: any;
  toDoAction: string;
  loaderId = 'aic-loader';
  constructor(
    private authService: AuthManagerService,
    private formBuilder: FormBuilder,
    private sourceAgentService: AgentSourceService,
    private controlActorService: ControlActorService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private activatedRoute: ActivatedRoute,
    private ngxUiLoaderService: NgxUiLoaderService
  ) {
    this.subjectChoices.push({val: 'Administratif', label: 'DDIAFORMS.aic.subject.admin'});
    this.subjectChoices.push({val: 'ATC', label: 'DDIAFORMS.aic.subject.atc'});
    this.subjectChoices.push({val: 'Sécurité', label: 'DDIAFORMS.aic.subject.security'});
    this.subjectChoices.push({val: 'Zone à statut particulier', label: 'DDIAFORMS.aic.subject.zone'});
    this.subjectChoices.push({val: 'Carte', label: 'DDIAFORMS.aic.subject.maps'});
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.ngxUiLoaderService.startLoader(this.loaderId);
    this.controlActorService.getAICDetailsById(id).subscribe(
      (demandeaic) => {
        const user = this.authService.getUser();
        this.isOwner = user.id === demandeaic.history[0].agentObject.user.id;
        this.isCancelled = demandeaic.state === CANCELLED_STATE;
        this.demandeAIC = demandeaic;
        this.ngxUiLoaderService.stopLoader(this.loaderId);
        this.initForm();
      }
    );
  }

  initForm(): void {
    this.modalCancelDatas = {
      ddiaClassName: AIC_CLASS_NAME,
      ddiaType: AIC_TYPE,
      ddiaId: this.demandeAIC.id,
      action: this.toDoAction
    };
    this.aicForm = this.formBuilder.group({
      depositDateTime: [{value: new Date(), disabled: true}],
      subject: [this.demandeAIC.subject],
      object: [this.demandeAIC.object],
      text: [this.demandeAIC.text],
      filesForm: new FormArray([
        this.formBuilder.group({
          file: [null, [Validators.required]],
          filename: [{value: '', disabled: true}]
        })
      ])
    });
  }

  get form(): {[key: string]: any}{
    return this.aicForm.controls;
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
      filename: event.target.files[0].name
    });
  }

  save(): void {
    this.loadingSave = true;
    const formData = new FormData();
    formData.append('subject', this.aicForm.controls.subject.value);
    formData.append('object', this.aicForm.controls.object.value);
    formData.append('descriptive_text', this.aicForm.controls.text.value);
    const nbAttachs = this.files.length;
    for (let i = 0; i < nbAttachs; i++){
      const fileform = this.files.controls[i] as FormGroup;
      formData.append(`attachments[${i}]file`, fileform.controls.file.value);
    }

    this.sourceAgentService.updateAIC(this.demandeAIC.id, formData)
    .then(() => {
      this.errors = [];
      this.modalService.show(ModalSuccessCreationDDIAComponent,
        this.modalDisplayService.getModalOptions({typeDDIA: 'AIC', contentText: 'MODAL.successModifDDIA'}, 'modal-dialog modal-notify modal-success')
      );
    })
    .catch((err) => {
      console.log(err);
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
