import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-source',
  templateUrl: './base-source.component.html',
  styleUrls: ['./base-source.component.scss']
})
export class BaseSourceComponent  {

  navLinks: {name: string, iconClass: string, url: string}[];

  constructor() {
    this.navLinks =  [
      {name: 'SOURCEAGENT.initddia', iconClass: 'fab fa-wpforms', url: '/source/initddia/'},
      {name: 'SOURCEAGENT.unitsddia',  iconClass: 'fas fa-list',  url: '/source/unitsddia/'},
      {name: 'SOURCEAGENT.stats', iconClass: 'fas fa-chart-bar',  url: '/source/stats/'},
    ];
  }

}
