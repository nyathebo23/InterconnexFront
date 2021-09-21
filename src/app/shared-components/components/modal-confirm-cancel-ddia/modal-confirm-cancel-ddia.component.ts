import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
  selector: 'app-modal-confirm-cancel-ddia',
  templateUrl: './modal-confirm-cancel-ddia.component.html',
  styleUrls: ['./modal-confirm-cancel-ddia.component.scss']
})
export class ModalConfirmCancelDDIAComponent implements OnInit {

  loading = false;
  ddiaClassName: string;
  ddiaId: string;
  ddiaType: string;
  constructor(
    public modalRef: MDBModalRef,
    private agentSourceService: AgentSourceService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService
    ) { }

  ngOnInit(): void {
  }

  cancelDDIA(): void {
    this.loading = true;
    this.agentSourceService.cancelDDIA(this.ddiaClassName, this.ddiaId)
    .then((res) => {

    })
    .catch((err) => {
      this.modalService.show(ModalErrorComponent, this.modalDisplayService.getModalOptions(
        {contentText: this.agentSourceService.displayErrors(err)[0]}, 'modal-dialog modal-notify modal-danger'));
      })
    .finally(() => {
      this.loading = false;
      this.modalRef.hide();
      this.agentSourceService.reloadCurrentRoute();
    });
  }
}
