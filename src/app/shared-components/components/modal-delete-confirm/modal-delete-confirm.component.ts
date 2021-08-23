import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-delete-confirm',
  templateUrl: './modal-delete-confirm.component.html',
  styleUrls: ['./modal-delete-confirm.component.scss']
})
export class ModalDeleteConfirmComponent implements OnInit {

  contentText: string;
  loading = false;
  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

}
