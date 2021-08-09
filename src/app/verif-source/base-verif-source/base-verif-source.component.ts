import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-verif-source',
  templateUrl: './base-verif-source.component.html',
  styleUrls: ['./base-verif-source.component.scss']
})
export class BaseVerifSourceComponent implements OnInit {

  navLinks: {name: string, iconClass: string, url: string}[];

  constructor() {
    this.navLinks = [
      {name: 'SOURCEVERIFIER.receivedddia', iconClass: 'fas fa-inbox', url: '/sourceverifier/receivedddia'},
      {name: 'SOURCEVERIFIER.processedddia', iconClass: 'fas fa-list', url: '/sourceverifier/processedddia'},
      {name: 'SOURCEVERIFIER.stats', iconClass: 'fas fa-chart-bar', url: '/sourceverifier/stats'}
    ];
  }

  ngOnInit(): void {
  }

}
