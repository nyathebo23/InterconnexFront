import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';

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
  constructor(public modalRef: MDBModalRef, private agentSourceService: AgentSourceService) { }

  ngOnInit(): void {
  }

  cancelDDIA(): void {
    this.loading = true;
    this.agentSourceService.cancelDDIA(this.ddiaClassName, this.ddiaId)
    .then((res) => {

    })
    .catch((err) => {
      alert(this.agentSourceService.displayErrors(err));
    })
    .finally(() => {
      this.loading = false;
    });
  }
}
