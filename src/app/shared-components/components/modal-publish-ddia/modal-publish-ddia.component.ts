import { Component, OnInit } from '@angular/core';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
  selector: 'app-modal-publish-ddia',
  templateUrl: './modal-publish-ddia.component.html',
  styleUrls: ['./modal-publish-ddia.component.scss']
})
export class ModalPublishDDIAComponent implements OnInit {

  loading = false;
  codeDDIA: string;
  ddiaClassName: string;
  ddiaType: string;
  ddiaId: string;

  constructor(
    public modalRef: MDBModalRef,
    private controlActorService: ControlActorService,
    private modalService: MDBModalService,
    private modalDisplayService: ModalDisplayService
  ) { }

  ngOnInit(): void {
  }

  isCodeDDIAInvalid(): boolean {
    return this.codeDDIA ? this.codeDDIA.trim() === '' : true;
  }

  setPublishDDIA(): void {
    this.loading = true;
    this.controlActorService.setPublicationCode(this.ddiaClassName, this.ddiaId, this.codeDDIA)
    .then((res) => {
      this.loading = false;
      this.modalRef.hide();
      this.controlActorService.reloadCurrentRoute();
    })
    .catch((err) => {
      this.loading = false;
      this.modalService.show(ModalErrorComponent, this.modalDisplayService.getModalOptions(
        {contentText: this.controlActorService.displayErrors(err)[0]}, 'modal-dialog modal-notify modal-danger'));
    });
  }

}
