import { Component, OnInit } from '@angular/core';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';

@Component({
  selector: 'app-base-control-view',
  templateUrl: './base-control-view.component.html',
  styleUrls: ['./base-control-view.component.scss']
})
export class BaseControlViewComponent  {

  navLinks: {name: string, iconClass: string, url: string}[];

  constructor(private authService: AuthManagerService) {
    const role = this.authService.getUser().role;
    this.navLinks = [
      {name: 'DDIA reçues à traiter', iconClass: 'fas fa-inbox', url: '/controlagent/' + role + '/receivedddia'},
      {name: 'DDIA traitées', iconClass: 'fas fa-list', url: '/controlagent/' + role + '/processedddia'},
      {name: 'Statistiques DDIA', iconClass: 'fas fa-chart-bar', url: '/controlagent/' + role + '/stats'}
    ];
  }

}
