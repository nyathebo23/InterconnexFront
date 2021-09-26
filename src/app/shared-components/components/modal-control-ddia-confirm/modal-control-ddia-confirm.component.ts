import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ADMISSION, APPROBATION, SUBMIT_TO_VERIFY, VALIDATION, VERIFICATION } from 'src/app/commons/control-actions-on-ddia';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
  selector: 'app-modal-control-ddia-confirm',
  templateUrl: './modal-control-ddia-confirm.component.html',
  styleUrls: ['./modal-control-ddia-confirm.component.scss']
})
export class ModalControlDDIAConfirmComponent implements OnInit {

  contentText: string;
  ddiaClassName: string;
  ddiaId: string;
  ddiaType: string;
  action: string;
  loading = false;
  approbationAfter: string;
  functionToTrigger: () => void;

  constructor(
    private controlActorService: ControlActorService,
    public modalRef: MDBModalRef,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService
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
        this.contentText = 'MODAL.approveok.helperText';
        break;
    }
  }

  endSubmitAction(): void {
    this.loading = false;
    this.controlActorService.reloadCurrentRoute();
    this.modalRef.hide();
  }


  submitDDIAToVerif(): void {
    this.loading = true;
    const data = {decision: 'submit'};
    this.controlActorService.submitDDIAToVerif(this.ddiaClassName, this.ddiaId, data)
    .then((res) => {
      if (res.message !== 'Ok'){
        alert(res.message);
      }
      this.endSubmitAction();
    })
    .catch((err) => {
      this.loading = false;
      this.modalService.show(ModalErrorComponent, this.modalDisplayService.getModalOptions(
        {contentText: this.controlActorService.displayErrors(err)[0]}, 'modal-dialog modal-notify modal-danger'));
      });
  }

  // cancelDDIA(): void {

  // }

  acceptVerifyDDIA(): void {
    this.loading = true;
    const data = {decision: 'accept'};
    this.controlActorService.verifyDDIA(this.ddiaId, this.ddiaClassName, data)
    .then((res) => {
      if (res.message !== 'Ok'){
        alert(res.message);
      }
      this.endSubmitAction();
    })
    .catch((err) => {
      this.loading = false;
      this.modalService.show(ModalErrorComponent, this.modalDisplayService.getModalOptions(
        {contentText: this.controlActorService.displayErrors(err)[0]}, 'modal-dialog modal-notify modal-danger'));
      });
  }

  // rejectVerifyDDIA(): void {

  // }

  acceptAdmitDDIA(): void {
    this.loading = true;
    const data = {decision: 'accept', afterapprove: this.approbationAfter ? this.approbationAfter : 'no'};
    this.controlActorService.admitDDIA(this.ddiaId, this.ddiaClassName, data)
    .then((res) => {
      if (res.message !== 'Ok'){
        alert(res.message);
      }
      this.endSubmitAction();
    })
    .catch((err) => {
      this.loading = false;
      this.modalService.show(ModalErrorComponent, this.modalDisplayService.getModalOptions(
        {contentText: this.controlActorService.displayErrors(err)[0]}, 'modal-dialog modal-notify modal-danger'));
    });

  }

  // rejectAdmitDDIA(): void {

  // }

  acceptValidateDDIA(): void {
    this.loading = true;
    const data = {decision: 'accept'};
    this.controlActorService.validateDDIA(this.ddiaId, this.ddiaClassName, data)
    .then((res) => {
      if (res.message !== 'Ok'){
        alert(res.message);
      }
      this.endSubmitAction();
    })
    .catch((err) => {
      this.loading = false;
      this.modalService.show(ModalErrorComponent, this.modalDisplayService.getModalOptions(
        {contentText: this.controlActorService.displayErrors(err)[0]}, 'modal-dialog modal-notify modal-danger'));
      });

  }


  acceptApproveDDIA(): void {
    this.loading = true;
    const data = {decision: 'accept'};
    this.controlActorService.approveDDIA(this.ddiaId, this.ddiaClassName, data)
    .then((res) => {
      if (res.message !== 'Ok'){
        alert(res.message);
      }
      this.endSubmitAction();
    })
    .catch((err) => {
      this.loading = false;
      this.modalService.show(ModalErrorComponent, this.modalDisplayService.getModalOptions(
        {contentText: this.controlActorService.displayErrors(err)[0]}, 'modal-dialog modal-notify modal-danger'));
      });

  }


}
