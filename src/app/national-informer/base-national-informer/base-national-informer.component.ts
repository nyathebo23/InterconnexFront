import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-national-informer',
  templateUrl: './base-national-informer.component.html',
  styleUrls: ['./base-national-informer.component.scss']
})
export class BaseNationalInformerComponent implements OnInit {

  navLinks: {name: string, iconClass: string, url: string}[];

  constructor() {
    this.navLinks = [
      {name: 'NATIONALINFORMER.receivedddia', iconClass: 'fas fa-inbox', url: '/nationalinformer/receivedddia'},
      {name: 'NATIONALINFORMER.processedddia', iconClass: 'fas fa-list', url: '/nationalinformer/processedddia'},
      {name: 'NATIONALINFORMER.stats', iconClass: 'fas fa-chart-bar', url: '/nationalinformer/stats'}
    ];
  }

  ngOnInit(): void {
  }

}
