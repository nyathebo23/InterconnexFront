import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AIC_TYPE, NOTAM_TYPE, SUPPAIP_TYPE } from 'src/app/commons/constants';

@Component({
  selector: 'app-modal-success-creation-ddia',
  templateUrl: './modal-success-creation-ddia.component.html',
  styleUrls: ['./modal-success-creation-ddia.component.scss']
})
export class ModalSuccessCreationDDIAComponent implements OnInit {

  typeDDIA: string;
  contentText: string;
  id: string;
  constructor(public modalRef: MDBModalRef, private router: Router) { }

  ngOnInit(): void {
  }

  redirect(): void {
    let ddiaType = '';
    switch (this.typeDDIA){
      case NOTAM_TYPE:
        ddiaType = 'notam';
        break;
      case AIC_TYPE:
        ddiaType = 'aic';
        break;
      case SUPPAIP_TYPE:
        ddiaType = 'suppaip';
        break;
    }
    this.router.navigate(['/source/unitsddia/present-ddia/' + ddiaType, this.id]);
    this.modalRef.hide();
  }

}
