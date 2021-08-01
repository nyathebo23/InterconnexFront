import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { ADMISSION, APPROBATION, SUBMIT_TO_VERIFY, VALIDATION, VERIFICATION } from 'src/app/commons/control-actions-on-ddia';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';

@Component({
  selector: 'app-modal-control-ddia-confirm',
  templateUrl: './modal-control-ddia-confirm.component.html',
  styleUrls: ['./modal-control-ddia-confirm.component.scss']
})
export class ModalControlDDIAConfirmComponent implements OnInit {

  heading: string;
  contentText: string;
  ddiaClassName: string;
  ddiaId: string;
  ddiaType: string;
  action: string;
  loading = false;
  functionToTrigger: () => void;

  constructor(
    private sourceAgentService: AgentSourceService,
    private controlActorService: ControlActorService,
    public modalRef: MDBModalRef
  ) { }

  ngOnInit(): void {
    switch (this.action){
      case SUBMIT_TO_VERIFY:
        this.functionToTrigger = this.submitDDIAToVerif;
        this.contentText = 'MODAL.submitToVerify.helperText';
        break;
      case VERIFICATION:
        this.functionToTrigger = this.acceptVerifyDDIA;
        this.contentText = 'MODAL.verifyok.helperText';
        break;
      case ADMISSION:
        this.functionToTrigger = this.acceptAdmitDDIA;
        this.contentText = 'MODAL.admitok.helperText';
        break;
      case VALIDATION:
        this.functionToTrigger = this.acceptValidateDDIA;
        this.contentText = 'MODAL.validateok.helperText';
        break;
      case APPROBATION:
        this.functionToTrigger = this.acceptApproveDDIA;
        this.contentText = 'MODAL.approve.helperText';
        break;
    }
  }

  submitDDIAToVerif(): void {
    this.loading = true;
    const data = {decision: 'submit'};
    this.sourceAgentService.submitDDIAToVerif(this.ddiaClassName, this.ddiaId, data)
    .then((res) => {

    })
    .catch((err) => {

    })
    .finally(() => this.loading = false);
  }

  // cancelDDIA(): void {

  // }

  acceptVerifyDDIA(): void {
    this.loading = true;
    const data = {decision: 'accept'};
    this.controlActorService.verifyDDIA(this.ddiaClassName, this.ddiaId, data)
    .then((res) => {

    })
    .catch((err) => {

    })
    .finally(() => this.loading = false);
  }

  // rejectVerifyDDIA(): void {

  // }

  acceptAdmitDDIA(): void {
    this.loading = true;
    const data = {decision: 'accept'};
    this.controlActorService.admitDDIA(this.ddiaClassName, this.ddiaId, data)
    .then((res) => {

    })
    .catch((err) => {

    })
    .finally(() => this.loading = false);

  }

  // rejectAdmitDDIA(): void {

  // }

  acceptValidateDDIA(): void {
    const data = {decision: 'accept'};
    this.controlActorService.validateDDIA(this.ddiaClassName, this.ddiaId, data)
    .then((res) => {

    })
    .catch((err) => {

    })
    .finally(() => this.loading = false);

  }

  // rejectValidateDDIA(): void {

  // }

  acceptApproveDDIA(): void {
    const data = {decision: 'accept'};
    this.controlActorService.approveDDIA(this.ddiaClassName, this.ddiaId, data)
    .then((res) => {

    })
    .catch((err) => {

    })
    .finally(() => this.loading = false);

  }

  // rejectApproveDDIA(): void {

  // }

}
