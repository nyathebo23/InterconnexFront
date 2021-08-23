import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-receive-ddia-notif',
  templateUrl: './modal-receive-ddia-notif.component.html',
  styleUrls: ['./modal-receive-ddia-notif.component.scss']
})
export class ModalReceiveDDIANotifComponent implements OnInit {

  contentText: string;
  typeDDIA: string;
  refDDIA: string;
  urlDDIADetails: string;
  constructor(public modalRef: MDBModalRef, private router: Router, private zone: NgZone) { }

  ngOnInit(): void {
  }

  navigateToDetails(): void {
    this.zone.run(() => {
      this.router.navigateByUrl(this.urlDDIADetails);
      this.modalRef.hide();
    });
  }
}
