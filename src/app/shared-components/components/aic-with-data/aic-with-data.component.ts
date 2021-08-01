import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MDBModalRef, MDBModalService, ModalDirective, ModalOptions } from 'angular-bootstrap-md';
import { AIC_CLASS_NAME, AIC_TYPE } from 'src/app/commons/constants';
import { DemandeAIC } from 'src/app/models/demande-aic.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { ModalControlDDIAConfirmComponent } from '../modal-control-ddia-confirm/modal-control-ddia-confirm.component';

@Component({
  selector: 'app-aic-with-data',
  templateUrl: './aic-with-data.component.html',
  styleUrls: ['./aic-with-data.component.scss']
})
export class AICWithDataComponent implements OnInit {

  aicForm: FormGroup;
  subjectChoices: Array<string> = new Array();
  subjectList: Array<string>;
  demandeAIC: DemandeAIC;
  initiatorInfos: string;
  dataLoaded = false;
  toDoAction: string;
  modalOptions: any;


  modalRef: MDBModalRef;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
    private controlActorService: ControlActorService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.toDoAction = route.snapshot.data.toDoAction;
    console.log(this.toDoAction);
  }

  ngOnInit(): void {
    // this.initiatorInfos = this.demandeAIC.c
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.controlActorService.getAICDetailsById(id).subscribe(
      (demandeaic) => {
        this.demandeAIC = demandeaic;
        this.aicForm = this.formBuilder.group({
          depositDateTime: [{value: this.demandeAIC.depositDatetime, disabled: true}],
          subject: [{value: this.demandeAIC.subject, disabled: true}],
          object: [{value: this.demandeAIC.object, disabled: true}],
          text: [{value: this.demandeAIC.text, disabled: true}],
        });
        this.dataLoaded = true;
    });
    this.modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: '',
      containerClass: '',
      animated: true,
      data: {
          ddiaClassName: AIC_CLASS_NAME,
          ddiaType: AIC_TYPE,
          ddiaId: id,
          action: this.toDoAction
      }
    };
    this.subjectList = ['Administratif', 'ATC', 'Sécurité', 'Zone à statut particulier', 'Carte'];
    this.subjectChoices.push('DDIAFORMS.aic.subject.admin');
    this.subjectChoices.push('DDIAFORMS.aic.subject.atc');
    this.subjectChoices.push('DDIAFORMS.aic.subject.security');
    this.subjectChoices.push('DDIAFORMS.aic.subject.zone');
    this.subjectChoices.push('DDIAFORMS.aic.subject.maps');
  }

  openModal(): void {
    this.modalRef = this.modalService.show(ModalControlDDIAConfirmComponent, this.modalOptions);
  }

  closeModal(): void {
    // this.mdbModal.hide();
  }
}
