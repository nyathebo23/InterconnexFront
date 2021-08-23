import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-success-creation-ddia',
  templateUrl: './modal-success-creation-ddia.component.html',
  styleUrls: ['./modal-success-creation-ddia.component.scss']
})
export class ModalSuccessCreationDDIAComponent implements OnInit {

  typeDDIA: string;
  contentText: string;
  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

}
