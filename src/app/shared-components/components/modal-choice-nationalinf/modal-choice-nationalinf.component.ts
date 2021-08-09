import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { ADMISSION, APPROBATION, SUBMIT_TO_VERIFY, VALIDATION, VERIFICATION } from 'src/app/commons/control-actions-on-ddia';
import { NationalInformer } from 'src/app/models/national-informer.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { VerifSourceService } from 'src/app/services/agent-services/verif-source.service';

@Component({
  selector: 'app-modal-choice-nationalinf',
  templateUrl: './modal-choice-nationalinf.component.html',
  styleUrls: ['./modal-choice-nationalinf.component.scss']
})
export class ModalChoiceNationalinfComponent implements OnInit {

  contentText: string;
  ddiaClassName: string;
  ddiaId: string;
  ddiaType: string;
  loading = false;
  action: string;
  nationalInformers: NationalInformer[];
  nationalInfId: string;
  constructor(
    private sourceAgentService: AgentSourceService,
    private verifSourceService: VerifSourceService,
    public modalRef: MDBModalRef
  ) {

  }

  ngOnInit(): void {
    this.verifSourceService.getNationalInformersList().subscribe(
      (nationalinfs) => {
        this.nationalInformers = nationalinfs;
        this.nationalInfId = nationalinfs.find(nationalinf => nationalinf.isAuthority).id;
      }
    );
    if (this.action === SUBMIT_TO_VERIFY){
      this.contentText = 'MODAL.submitByLocalinf.helperText';
    }
    else if (this.action === VERIFICATION){
      this.contentText = 'MODAL.verifyok.helperText';
    }
  }

  endSubmitAction(): void {
    this.loading = false;
    this.sourceAgentService.reloadCurrentRoute();
    this.modalRef.hide();
  }

  submit(): void {
    if (this.action === SUBMIT_TO_VERIFY){
      this.submitDDIAToAerodromeHeads();
    }
    else if (this.action === VERIFICATION){
      this.acceptVerifyDDIA();
    }
  }

  submitDDIAToAerodromeHeads(): void {
    this.loading = true;
    const data = {decision: 'submit', nationalinf_id: this.nationalInfId};
    this.sourceAgentService.submitDDIAToVerif(this.ddiaClassName, this.ddiaId, data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      alert('');
    })
    .finally(() => this.endSubmitAction());
  }

  acceptVerifyDDIA(): void {
    this.loading = true;
    const data = {decision: 'accept', nationalinf_id: this.nationalInfId};
    this.verifSourceService.verifyDDIA(this.ddiaId, this.ddiaClassName, data)
    .then((res) => {

    })
    .catch((err) => {
      alert('');
    })
    .finally(() => this.endSubmitAction());
  }

  // rejectVerifyDDIA(): void {

  // }


}
