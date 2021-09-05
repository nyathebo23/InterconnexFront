import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { User } from 'src/app/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminService } from 'src/app/services/agent-services/admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss', '../../../../assets/css/tables.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  pref = 'AUTHFORMS.SIGNUP.';
  headUsersElements = ['email', 'firstname', 'lastname', 'sex', 'role', 'function', 'quality'];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  users: User[] = [];
  prevUsers: User[] = [];
  loaderId = 'users-list';
  constructor(
    private cdRef: ChangeDetectorRef,
    private ngxUiLoaderService: NgxUiLoaderService,
    private adminService: AdminService
  ) {
    this.headUsersElements = this.headUsersElements.map((elt) => this.pref + elt);
    this.headUsersElements.push('UpdateDelete.deleteBtn');
  }
  ngOnInit(): void {
    this.adminService.getUsersList().subscribe(
      (users) => {
        this.users = users;
        this.mdbTable.setDataSource(this.users);
        this.users = this.mdbTable.getDataSource();
        this.prevUsers = this.mdbTable.getDataSource();
      },
      error => {
        this.adminService.setError(error);
      }, () => {
        this.ngxUiLoaderService.stopLoader(this.loaderId);
      });
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

}
