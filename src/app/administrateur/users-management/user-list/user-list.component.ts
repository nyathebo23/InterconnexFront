import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { User } from 'src/app/models/user.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss', '../../../../assets/css/tables.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  pref = 'AUTHFORMS.SIGNUP.';
  headUsersElements = ['username', 'email', 'firstname', 'lastname', 'sex', 'role'];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  users: User[];
  prevUsers: User[];
  constructor(private cdRef: ChangeDetectorRef) {
    this.headUsersElements = this.headUsersElements.map((elt) => this.pref + elt);
    this.headUsersElements.push('UpdateDelete.editBtn');
    this.headUsersElements.push('UpdateDelete.deleteBtn');
  }
  ngOnInit(): void {
    this.users = [
      new User('0', 'Nyat', 'franckhebo@gmail.com', 'Nyatchou', 'Franck', 'Male', 'Agent Source'),
      new User('0', 'Lomta', 'talompatrick@gmail.com', 'Talom', 'Patrick', 'Male', 'Strcture Source'),
      new User('0', 'ABBA', 'abbarapaya@ccaa.caero', 'ABBA', 'SOULEYMANOU', 'Male', 'Informateur Local'),
    ];
    this.mdbTable.setDataSource(this.users);
    this.users = this.mdbTable.getDataSource();
    this.prevUsers = this.mdbTable.getDataSource();
  }

  ngAfterViewInit(): void {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(15);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  deleteUser(user: User): void {
    console.log(user);
  }

  editUser(user: User): void{
    console.log(user);
  }
}
