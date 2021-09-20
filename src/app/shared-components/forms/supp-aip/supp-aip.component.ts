import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MDBModalService } from 'angular-bootstrap-md';
import { DemandeSUPPAIP } from 'src/app/models/demande-suppaip.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalSuccessCreationDDIAComponent } from '../../components/modal-success-creation-ddia/modal-success-creation-ddia.component';

@Component({
  selector: 'app-supp-aip',
  templateUrl: './supp-aip.component.html',
  styleUrls: ['./supp-aip.component.scss']
})
export class SUPPAIPComponent implements OnInit {

  suppaipForm: FormGroup;
  loadingDatas = true;
  errors: string[];
  loadingSave: boolean;
  createSuccess = false;
  constructor(
    private formBuilder: FormBuilder,
    private sourceAgentService: AgentSourceService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.form.typeSUPPAIP.valueChanges.subscribe(
      (value) => {
        if (value === 'SUPP AIP N'){
           this.form.codeDDIAToReplace.setValue('');
           this.form.codeDDIAToReplace.disable();
        }
        else {
          this.form.codeDDIAToReplace.enable();
        }
      }
    );
  }

  initForm(): void {
    this.suppaipForm = this.formBuilder.group({
      depositDateTime: [{value: null, disabled: true}],
      typeSUPPAIP: ['SUPP AIP N'],
      object: ['', [Validators.required, ValidationService.requiredValidator]],
      codeDDIAToReplace: [{value: '', disabled: true}],
      aipTargetSectForm: new FormArray([
        new FormControl('', [Validators.required, ValidationService.requiredValidator])
      ]),
      validityPeriod: [[new Date(), new Date()], [ValidationService.DateValidator]],
      descriptionText: ['', [Validators.required, ValidationService.requiredValidator]],
      filesForm: new FormArray([
        this.formBuilder.group({
          file: [null, [Validators.required]],
          filename: [{value: '', disabled: true}]
        })
      ])
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
    const formData = new FormData();
    const typeSUPP = this.suppaipForm.controls.typeSUPPAIP.value;
    const codeDDIAReplaced = this.suppaipForm.controls.codeDDIAToReplace.value;

    this.loadingSave = true;
    formData.append('type_suppaip', typeSUPP);
    formData.append('object', this.suppaipForm.controls.object.value);
    formData.append('descriptive_text', this.suppaipForm.controls.descriptionText.value);
    formData.append('start_val_period', this.suppaipForm.controls.validityPeriod.value[0].toISOString());
    formData.append('end_val_period', this.suppaipForm.controls.validityPeriod.value[1].toISOString());
    formData.append('code_ddia_replaced', codeDDIAReplaced);
    const aipSectionsNb = this.aipTargetSections.length;
    let aipTargSections = '';
    for (let i = 0; i < aipSectionsNb; i++){
      aipTargSections += '*-----*' + this.aipTargetSections.controls[i].value;
    }
    formData.append(`aip_target_sections`, aipTargSections);

    const nbAttachs = this.files.length;
    for (let i = 0; i < nbAttachs; i++){
      const fileform = this.files.controls[i] as FormGroup;
      formData.append(`attachments[${i}]file`, fileform.controls.file.value);
    }

    this.sourceAgentService.createSUPPAIP(formData)
    .then((res) => {
      this.errors = [];
      this.modalService.show(ModalSuccessCreationDDIAComponent,
        this.modalDisplayService.getModalOptions({typeDDIA: 'SUPP AIP', contentText: 'MODAL.successCreateDDIA', id: res.id}, 'modal-dialog modal-notify modal-success')
      );
    })
    .catch((err) => {
      this.errors = this.sourceAgentService.displayErrors(err);
      setTimeout(() => this.errors = [], 10000);
    })
    .finally(() => this.loadingSave = false);
  }

}
