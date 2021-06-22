import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {


  @Input() navLinks: Array<{name: string, iconClass: string}>;
  activeNavLink: {name: string, iconClass: string};
  constructor() { }

  ngOnInit(): void {
    this.activeNavLink = this.navLinks[0];
  }

  changeNavLink(link: {name: string, iconClass: string}): void{
    this.activeNavLink = link;
  }
}
