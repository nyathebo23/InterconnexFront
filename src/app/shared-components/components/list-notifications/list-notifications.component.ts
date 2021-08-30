import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/models/notification.model';
import { NotificationDisplayService } from 'src/app/services/shared/notification-display.service';

@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.scss']
})
export class ListNotificationsComponent implements OnInit {

  @Input() notificationsList: Notification[];
  constructor() { }

  ngOnInit(): void {

  }

}
