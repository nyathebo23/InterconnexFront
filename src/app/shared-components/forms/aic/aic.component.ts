import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { MDBModalService } from 'angular-bootstrap-md';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalSuccessCreationDDIAComponent } from '../../components/modal-success-creation-ddia/modal-success-creation-ddia.component';

@Component({
  selector: 'app-aic',
  templateUrl: './aic.component.html',
  styleUrls: ['./aic.component.scss']
})
export class AICComponent implements OnInit {

  aicForm: FormGroup;
  subjectChoices: Array<{val: string, label: string}> = new Array();
  subjectList: Array<string>;
  loadingDatas = true;
  errors: string[];
  loadingSave: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private sourceAgentService: AgentSourceService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
  ) {
    this.subjectChoices.push({val: 'Administratif', label: 'DDIAFORMS.aic.subject.admin'});
    this.subjectChoices.push({val: 'ATC', label: 'DDIAFORMS.aic.subject.atc'});
    this.subjectChoices.push({val: 'Sécurité', label: 'DDIAFORMS.aic.subject.security'});
    this.subjectChoices.push({val: 'Zone à statut particulier', label: 'DDIAFORMS.aic.subject.zone'});
    this.subjectChoices.push({val: 'Carte', label: 'DDIAFORMS.aic.subject.maps'});
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.aicForm = this.formBuilder.group({
      depositDateTime: [{value: null, disabled: true}],
      subject: ['Administratif', [Validators.required]],
      object: ['', [Validators.required, ValidationService.requiredValidator]],
      text: ['', [Validators.required, ValidationService.requiredValidator]],
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

    this.sourceAgentService.createAIC(formData)
    .then((res) => {
      this.errors = [];
      this.modalService.show(ModalSuccessCreationDDIAComponent,
        this.modalDisplayService.getModalOptions({typeDDIA: 'AIC', contentText: 'MODAL.successCreateDDIA', id: res.id}, 'modal-dialog modal-notify modal-success')
      );
    })
    .catch((err) => {
      this.errors = this.sourceAgentService.displayErrors(err);
      setTimeout(() => this.errors = [], 100000);
    })
    .finally(() => this.loadingSave = false);
  }

}
