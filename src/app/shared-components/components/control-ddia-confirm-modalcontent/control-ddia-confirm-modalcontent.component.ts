import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ADMISSION, APPROBATION, SUBMIT_TO_VERIFY, VALIDATION, VERIFICATION } from 'src/app/commons/control-actions-on-ddia';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';

@Component({
  selector: 'app-control-ddia-confirm-modalcontent',
  templateUrl: './control-ddia-confirm-modalcontent.component.html',
  styleUrls: ['./control-ddia-confirm-modalcontent.component.scss']
})
export class ControlDDIAConfirmModalcontentComponent implements OnInit {

  functionToTrigger: () => void;
  @Input() ddiaClassName: string;
  @Input() ddiaId: string;
  @Input() ddiaType: string;
  @Input() action: string;
  @Input() mdbModalDir: ModalDirective;
  contentText: string;
  constructor(
    private sourceAgentService: AgentSourceService,
    private controlActorService: ControlActorService,
  ) { }

  closeFunction(): void {
    this.mdbModalDir.hide();
  }

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
    const data = {decision: 'submit'};
    this.sourceAgentService.submitDDIAToVerif(this.ddiaClassName, this.ddiaId, data)
    .then((res) => {

    })
    .catch((err) => {

    });
  }

  // cancelDDIA(): void {

  // }

  acceptVerifyDDIA(): void {
    const data = {decision: 'accept'};
    this.controlActorService.verifyDDIA(this.ddiaClassName, this.ddiaId, data)
    .then((res) => {

    })
    .catch((err) => {

    });
  }

  // rejectVerifyDDIA(): void {

  // }

  acceptAdmitDDIA(): void {
    const data = {decision: 'accept'};
    this.controlActorService.admitDDIA(this.ddiaClassName, this.ddiaId, data)
    .then((res) => {

    })
    .catch((err) => {

    });
  }

  // rejectAdmitDDIA(): void {

  // }

  acceptValidateDDIA(): void {
    const data = {decision: 'accept'};
    this.controlActorService.validateDDIA(this.ddiaClassName, this.ddiaId, data)
    .then((res) => {

    })
    .catch((err) => {

    });
  }

  // rejectValidateDDIA(): void {

  // }

  acceptApproveDDIA(): void {
    const data = {decision: 'accept'};
    this.controlActorService.approveDDIA(this.ddiaClassName, this.ddiaId, data)
    .then((res) => {

    })
    .catch((err) => {

    });
  }

  // rejectApproveDDIA(): void {

  // }

}
