import { Component, OnInit } from '@angular/core';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { MDBModalRef } from 'angular-bootstrap-md';

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

  constructor(public modalRef: MDBModalRef, private controlActorService: ControlActorService) { }

  ngOnInit(): void {
  }

  isCodeDDIAInvalid(): boolean {
    return this.codeDDIA ? this.codeDDIA.trim() === '' : true;
  }

  setPublishDDIA(): void {
    this.loading = true;
    this.controlActorService.setPublicationCode(this.ddiaClassName, this.ddiaId, this.codeDDIA)
    .then((res) => {

    })
    .catch((err) => {
      alert(this.controlActorService.displayErrors(err));
    })
    .finally(() => {
      this.loading = false;
    });
  }

}
