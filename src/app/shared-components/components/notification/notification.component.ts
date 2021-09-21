import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { PENDING_APPROVAL_STATE, PENDING_VALIDATION_STATE } from 'src/app/commons/constants';
import { DDIA_CREATION, DDIA_MUST_BE_PUBLISHED, DDIA_VALIDITY_EXP, RECEPTION_SIGNAL_APPROBATION,
  RECEPTION_SUBMISSION, RECEPTION_VALIDATION, RECEPTION_VALIDATION_SOURCECOMMANDER,
   RECEPTION_VERIFICATION, RECEPTION_VERIFSUBMISSION } from 'src/app/commons/constants-events-notifs';
import { Notification } from 'src/app/models/notification.model';
import { NotificationDisplayService } from 'src/app/services/shared/notification-display.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() notification: Notification;
  contentText: string;
  contentTitle = 'DDIA RECEPTION';
  date: string;
  @Output() notifRead = new EventEmitter<number>();
  displayTextNotif = false;
  displayToggler = true;
  constructor(private notificationDisplayService: NotificationDisplayService) {}

  ngOnInit(): void {
    this.date = this.notification.datetime.toLocaleString();
    switch (this.notification.event){
      case DDIA_CREATION:
        this.contentText = 'NOTIFICATION.ddiaCreation';
        this.contentTitle = 'DDIA CREATION';
        break;
      case RECEPTION_SUBMISSION:
        this.contentText = 'NOTIFICATION.verifReception';
        break;
      case RECEPTION_VERIFSUBMISSION:
        this.contentText = 'NOTIFICATION.sourcestructReception';
        break;
      case RECEPTION_VERIFICATION:
        this.contentText = 'NOTIFICATION.sourcestructReception';
        break;
      case RECEPTION_VALIDATION:
        this.contentText = 'NOTIFICATION.nationalinfReception';
        break;
      case RECEPTION_VALIDATION_SOURCECOMMANDER:
        if (this.notification.newDDIAState === PENDING_APPROVAL_STATE){
          this.contentText = 'NOTIFICATION.nationalinfReception';
        }
        else if (this.notification.newDDIAState === PENDING_VALIDATION_STATE){
          this.contentText = 'NOTIFICATION.localinfReception';
        }
        break;
      case RECEPTION_SIGNAL_APPROBATION:
        this.contentText = 'NOTIFICATION.nationalInfApprobation';
        break;
      case DDIA_MUST_BE_PUBLISHED:
        this.contentTitle = 'DDIA MUST BE PUBLISHED';
        this.contentText = 'NOTIFICATION.ddiaMustBePublished';
        break;
      case DDIA_VALIDITY_EXP:
        this.contentTitle = 'DDIA EXPIRES SOON';
        this.contentText = 'NOTIFICATION.ddiaNearExpiration';
        break;
    }
  }

  markNotifAsRead(): void {
    if (this.notification.read){
      this.displayTextNotif = !this.displayTextNotif;
    }
    else {
      this.displayToggler = false;
      this.notificationDisplayService.markAsRead(this.notification.id)
      .then((res) => {
        this.notification.read = true;
        this.displayTextNotif = !this.displayTextNotif;
        this.notifRead.emit(1);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      })
      .finally(() => this.displayToggler = true);
    }
  }



}
