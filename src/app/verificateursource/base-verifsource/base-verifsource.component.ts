import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-verifsource',
  templateUrl: './base-verifsource.component.html',
  styleUrls: ['./base-verifsource.component.scss']
})
export class BaseVerifsourceComponent {

  navLinks: {name: string, iconClass: string, url: string}[];

  constructor() {
    this.navLinks = [
      {name: 'DDIA reçues à traiter', iconClass: 'fas fa-inbox', url: '/verifsource/receivedddia'},
      {name: 'DDIA traitées', iconClass: 'fas fa-list', url: '/verifsource/processedddia'},
      {name: 'Statistiques DDIA', iconClass: 'fas fa-chart-bar', url: '/verifsource/stats'}
    ];
  }


}
