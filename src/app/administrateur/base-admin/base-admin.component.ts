import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-admin',
  templateUrl: './base-admin.component.html',
  styleUrls: ['./base-admin.component.scss']
})
export class BaseAdminComponent implements OnInit {

  navLinks: {name: string, iconClass: string, url: string}[];

  constructor() {
    this.navLinks = [
      {name: 'Gestion des utilisateurs', iconClass: 'fas fa-users-cog', url: 'manageusers'},
      {name: 'Gestion des unités et structures sources', iconClass: 'fas fa-plane-departure', url: 'structsource'},
      {name: 'Gestion des Informateurs locaux et nationaux', iconClass: 'fas fa-passport', url: 'informers'},
      // {name: 'Gestion des attributs d\'utilisateurs', iconClass: 'fas fa-passport', url: ''},
    ];
   }

  ngOnInit(): void {
  }

}
