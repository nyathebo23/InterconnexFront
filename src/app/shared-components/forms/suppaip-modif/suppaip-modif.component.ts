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
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DRAFT_STATE, NON_CONFORMING_STATE, NOT_ADMITTED_STATE, NOT_APPROVED_STATE, NOT_VALIDATED_STATE,
  SUPPAIP_CLASS_NAME, SUPPAIP_TYPE } from 'src/app/commons/constants';
import { DemandeSUPPAIP } from 'src/app/models/demande-suppaip.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ValidationService } from 'src/app/services/auth-services/validation.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalConfirmCancelDDIAComponent } from '../../components/modal-confirm-cancel-ddia/modal-confirm-cancel-ddia.component';
import { ModalSuccessCreationDDIAComponent } from '../../components/modal-success-creation-ddia/modal-success-creation-ddia.component';

@Component({
  selector: 'app-suppaip-modif',
  templateUrl: './suppaip-modif.component.html',
  styleUrls: ['./suppaip-modif.component.scss']
})
export class SUPPAIPModifComponent implements OnInit {

  suppaipForm: FormGroup;
  loadingDatas = true;
  errors: string[];
  loadingSave: boolean;
  createSuccess = false;
  demandeSUPP: DemandeSUPPAIP;
  initiatorInfos: string;
  isOwner: boolean;
  modalCancelDatas: any;
  canModify: boolean;
  toDoAction: string;
  loaderId = 'suppaip-loader';
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
  }

  ngOnInit(): void {
    try {
      const id = atob(this.activatedRoute.snapshot.paramMap.get('id'));
      this.ngxUiLoaderService.startLoader(this.loaderId);

      this.controlActorService.getSUPPAIPDetailsById(id).subscribe(
        (demandesupp) => {
          const user = this.authService.getUser();
          this.isOwner = user.id === demandesupp.history[0].agentObject.user.id;
          this.canModify = [DRAFT_STATE, NON_CONFORMING_STATE,
            NOT_APPROVED_STATE, NOT_VALIDATED_STATE, NOT_ADMITTED_STATE].indexOf(demandesupp.state) !== -1;
          this.demandeSUPP = demandesupp;
          this.initForm();
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
        }, error => {
          this.controlActorService.setError(error);
        },
        () => {
          this.ngxUiLoaderService.stopLoader(this.loaderId);
        }
      );
    }
    catch (err) {

    }
  }

  initForm(): void {
    this.modalCancelDatas = {
      ddiaClassName: SUPPAIP_CLASS_NAME,
      ddiaType: SUPPAIP_TYPE,
      ddiaId: this.demandeSUPP.id,
      action: this.toDoAction
    };
    this.suppaipForm = this.formBuilder.group({
      depositDateTime: [{value: new Date(), disabled: true}],
      typeSUPPAIP: [this.demandeSUPP.typeSUPPAIP],
      object: [this.demandeSUPP.object, [Validators.required, ValidationService.requiredValidator]],
      codeDDIAToReplace: [{value: this.demandeSUPP.replacedDDIACode, disabled: this.demandeSUPP.typeSUPPAIP === 'SUPP AIP N'} ],
      // aipTargetSections: [''],
      aipTargetSectForm: new FormArray( this.demandeSUPP.targetSection.split('*-----*').slice(1)
      .map((val) => new FormControl(val, [Validators.required, ValidationService.requiredValidator ]))
      ),
      validityPeriod: [[this.demandeSUPP.startValidityPeriod, this.demandeSUPP.endValidityPeriod], [ValidationService.DateValidator]],
      descriptionText: [this.demandeSUPP.descriptionText],
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

    this.sourceAgentService.updateSUPPAIP(this.demandeSUPP.id, formData)
    .then((res) => {
      this.errors = [];
      this.modalService.show(ModalSuccessCreationDDIAComponent,
        this.modalDisplayService.getModalOptions({typeDDIA: 'SUPP AIP', contentText: 'MODAL.successModifDDIA', id: res.id}, 'modal-dialog modal-notify modal-success')
      );
    })
    .catch((err) => {
      this.errors = this.sourceAgentService.displayErrors(err);
      setTimeout(() => this.errors = [], 10000);
    })
    .finally(() => this.loadingSave = false);
  }

  openCancelConfirmModal(): void {
    this.modalService.show(ModalConfirmCancelDDIAComponent,
      this.modalDisplayService.getModalOptions(this.modalCancelDatas, 'modal-dialog modal-notify modal-danger'));
  }
}
