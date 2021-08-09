import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-local-informer',
  templateUrl: './base-local-informer.component.html',
  styleUrls: ['./base-local-informer.component.scss']
})
export class BaseLocalInformerComponent implements OnInit {

  navLinks: {name: string, iconClass: string, url: string}[];

  constructor() {
    this.navLinks = [
      {name: 'CCAALOCALINFORMER.receivedddia', iconClass: 'fas fa-inbox', url: '/localinformer/receivedddia'},
      {name: 'CCAALOCALINFORMER.processedddia', iconClass: 'fas fa-list', url: '/localinformer/processedddia'},
      {name: 'CCAALOCALINFORMER.stats', iconClass: 'fas fa-chart-bar', url: '/localinformer/stats'}
    ];
  }

  ngOnInit(): void {
  }

}
