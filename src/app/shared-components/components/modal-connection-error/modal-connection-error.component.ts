import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-connection-error',
  templateUrl: './modal-connection-error.component.html',
  styleUrls: ['./modal-connection-error.component.scss']
})
export class ModalConnectionErrorComponent implements OnInit {

  constructor(public modalRef: MDBModalRef, private router: Router) { }

  ngOnInit(): void {
  }

  reloadPage(): void {

  }

}
