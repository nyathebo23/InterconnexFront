import { Component, Input, OnInit } from '@angular/core';
import { LOCAL_VERIFIER, SOURCE_AGENT, SOURCE_STRUCTURE, SOURCE_VERIFIER } from 'src/app/commons/constants-roles';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';

@Component({
  selector: 'app-base-admin',
  templateUrl: './base-admin.component.html',
  styleUrls: ['./base-admin.component.scss']
})
export class BaseAdminComponent implements OnInit {

  navLinks: {name: string, iconClass: string, url: string}[];
  accessibleViews: {label: string, url: string}[] = [];
  constructor(private authService: AuthManagerService) {
    this.navLinks = [
      {name: 'Gestion des utilisateurs', iconClass: 'fas fa-users-cog', url: 'manageusers'},
      {name: 'Gestion des unités et structures sources', iconClass: 'fas fa-plane-departure', url: 'structsource'},
      {name: 'Gestion des Informateurs locaux et nationaux', iconClass: 'fas fa-passport', url: 'informers'},
      // {name: 'Gestion des attributs d\'utilisateurs', iconClass: 'fas fa-passport', url: ''},
    ];
   }

  ngOnInit(): void {
    const user = this.authService.getUser();
    switch (user.role) {
      case SOURCE_AGENT:
        this.accessibleViews.push({label: 'DDIA Initiation', url: '/source'});
        break;
      case SOURCE_VERIFIER:
        this.accessibleViews.push({label: 'DDIA Initiation', url: '/source'});
        this.accessibleViews.push({label: 'DDIA Verification', url: '/sourceverifier'});
        break;
      case SOURCE_STRUCTURE:
        this.accessibleViews.push({label: 'DDIA Admission', url: '/sourcestructure'});
        break;
      case LOCAL_VERIFIER:
        this.accessibleViews.push({label: 'DDIA Validation (only read)', url: '/localinformer'});
        break;
      case SOURCE_STRUCTURE:
        this.accessibleViews.push({label: 'DDIA Validation', url: '/localinformer'});
        break;
      case SOURCE_STRUCTURE:
        this.accessibleViews.push({label: 'DDIA Approbation', url: '/nationalinformer'});
        break;
    }
  }

}
