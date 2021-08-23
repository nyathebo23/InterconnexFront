import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-confirm-relance',
  templateUrl: './modal-confirm-relance.component.html',
  styleUrls: ['./modal-confirm-relance.component.scss']
})
export class ModalConfirmRelanceComponent implements OnInit {

  loading = false;
  ddiaClassName: string;
  ddiaType: string;
  ddiaId: string;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

  submit(): void {

  }
}
