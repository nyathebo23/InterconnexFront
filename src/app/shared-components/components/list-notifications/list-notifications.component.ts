import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notification } from 'src/app/models/notification.model';
import { NotificationDisplayService } from 'src/app/services/shared/notification-display.service';

@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.scss']
})
export class ListNotificationsComponent implements OnInit {

  notificationsList: Notification[];
  constructor(
    private notifiationDisplayService: NotificationDisplayService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const url = this.activatedRoute.snapshot.data.url;
    this.notifiationDisplayService.getNotifications(url).subscribe((notifs) => {
      this.notificationsList = notifs;
    });
  }

}
