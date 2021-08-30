import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CollapseComponent } from 'angular-bootstrap-md';
import { DDIA_CREATION, RECEPTION_SIGNAL_APPROBATION, RECEPTION_SUBMISSION, RECEPTION_VALIDATION, RECEPTION_VALIDATION_SOURCECOMMANDER,
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
        this.contentText = 'NOTIFICATION.localinfReception';
        break;
      case RECEPTION_SIGNAL_APPROBATION:
        this.contentText = 'NOTIFICATION.nationalInfApprobation';
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
