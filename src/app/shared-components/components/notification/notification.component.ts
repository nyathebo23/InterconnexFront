import { Component, Input, OnInit } from '@angular/core';
import { DDIA_CREATION, RECEPTION_SIGNAL_APPROBATION, RECEPTION_SUBMISSION, RECEPTION_VALIDATION, RECEPTION_VALIDATION_SOURCECOMMANDER,
   RECEPTION_VERIFICATION, RECEPTION_VERIFSUBMISSION } from 'src/app/commons/constants-events-notifs';
import { Notification } from 'src/app/models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() notification: Notification;
  contentText: string;
  date: string;
  constructor() {

  }
  ngOnInit(): void {
    this.date = this.notification.datetime.toLocaleString();
    switch (this.notification.event){
      case DDIA_CREATION:
        this.contentText = 'NOTIFICATION.ddiaCreation';
        break;
      case RECEPTION_SUBMISSION:
        this.contentText = 'NOTIFICATIONS.verifReception';
        break;
      case RECEPTION_VERIFSUBMISSION:
        this.contentText = 'NOTIFICATIONS.sourcestructReception';
        break;
      case RECEPTION_VERIFICATION:
        this.contentText = 'NOTIFICATIONS.sourcestructReception';
        break;
      case RECEPTION_VALIDATION:
        this.contentText = 'NOTIFICATIONS.nationalinfReception';
        break;
      case RECEPTION_VALIDATION_SOURCECOMMANDER:
        this.contentText = 'NOTIFICATIONS.localinfReception';
        break;
      case RECEPTION_SIGNAL_APPROBATION:
        this.contentText = 'NOTIFICATIONS.nationalInfApprobation';
        break;
    }
  }

}
