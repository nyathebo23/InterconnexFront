import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-source-elts-list',
  templateUrl: './source-elts-list.component.html',
  styleUrls: ['./source-elts-list.component.scss']
})
export class SourceEltsListComponent  {

  pref = 'AUTHFORMS.SIGNUP.';
  headUsersElements = ['username', 'email', 'firstname', 'lastname', 'role', 'editBtn', 'deleteBtn'];
  users: User[];
  constructor() {
    this.headUsersElements.map((elt) => this.pref + elt);
    this.users = [
      new User('0', 'Nyat', 'franckhebo@gmail.com', 'Nyatchou', 'Franck', 'Agent Source'),
      new User('0', 'Lomta', 'talompatrick@gmail.com', 'Talom', 'Patrick', 'Strcture Source'),
      new User('0', 'ABBA', 'abbarapaya@ccaa.caero', 'ABBA', 'SOULEYMANOU', 'Informateur Local'),
    ];
  }

}
