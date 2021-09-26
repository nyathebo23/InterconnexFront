import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { NotificationDisplayService } from 'src/app/services/shared/notification-display.service';

@Component({
  selector: 'app-modal-notif-reject',
  templateUrl: './modal-notif-reject.component.html',
  styleUrls: ['./modal-notif-reject.component.scss']
})
export class ModalNotifRejectComponent implements OnInit {

  idNotif: string;
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
      this.notificationDisplayService.notifsNbToAddSubject.next(-1);
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
