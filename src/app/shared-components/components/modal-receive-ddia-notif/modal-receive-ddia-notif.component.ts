import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NotificationDisplayService } from 'src/app/services/shared/notification-display.service';

@Component({
  selector: 'app-modal-receive-ddia-notif',
  templateUrl: './modal-receive-ddia-notif.component.html',
  styleUrls: ['./modal-receive-ddia-notif.component.scss']
})
export class ModalReceiveDDIANotifComponent implements OnInit {

  idNotif: string;
  contentText: string;
  typeDDIA: string;
  refDDIA: string;
  urlDDIADetails: string;
  loading = false;
  constructor(
    private notificationDisplayService: NotificationDisplayService,
    public modalRef: MDBModalRef,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
  }

  navigateToDetails(): void {
    this.loading = true;
    this.notificationDisplayService.markAsRead(this.idNotif)
    .then((res) => {
      this.zone.run(() => {
        this.router.navigateByUrl(this.urlDDIADetails);
        this.modalRef.hide();
      });
    })
    .catch((err) => {

    })
    .finally(() => this.loading = false);

  }
}
