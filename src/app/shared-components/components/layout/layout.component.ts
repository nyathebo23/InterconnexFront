import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent  {

  @Input()
  navLinks: {name: string, iconClass: string, url: string}[];

  constructor() {

  }

}
