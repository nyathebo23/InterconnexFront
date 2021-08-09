import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-source-structure',
  templateUrl: './base-source-structure.component.html',
  styleUrls: ['./base-source-structure.component.scss']
})
export class BaseSourceStructureComponent implements OnInit {

  navLinks: {name: string, iconClass: string, url: string}[];

  constructor() {
    this.navLinks = [
      {name: 'SOURCESTRUCTURE.receivedddia', iconClass: 'fas fa-inbox', url: '/sourcestructure/receivedddia'},
      {name: 'SOURCESTRUCTURE.processedddia', iconClass: 'fas fa-list', url: '/sourcestructure/processedddia'},
      {name: 'SOURCESTRUCTURE.stats', iconClass: 'fas fa-chart-bar', url: '/sourcestructure/stats'}
    ];
  }

  ngOnInit(): void {
  }

}
