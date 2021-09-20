import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { User } from 'src/app/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminService } from 'src/app/services/agent-services/admin.service';
import { NavigationExtras, Router } from '@angular/router';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss', '../../../../assets/css/tables.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  pref = 'AUTHFORMS.SIGNUP.';
  headUsersElements = ['email', 'firstname', 'lastname', 'sex', 'role', 'function', 'quality', 'isactive'];
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  users: User[] = [];
  prevUsers: User[] = [];
  loaderId = 'users-list';
  loadActivation = false;
  constructor(
    private cdRef: ChangeDetectorRef,
    private ngxUiLoaderService: NgxUiLoaderService,
    private adminService: AdminService,
    private authService: AuthManagerService,
    private router: Router
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
    // console.log(user);
  }

  activateUser(email: string): void {
    this.loadActivation = true;
    this.authService.signUpResendCode(email)
    .then((resp) => {
      const userid = resp.user_id;
      const navigationExtras: NavigationExtras = {
        state: {
          userId: userid
        }
      };
      this.router.navigate(['/auth/signupverif'], navigationExtras);
    })
    .catch((err) => {

    })
    .finally(() => {
      this.loadActivation = false;
    });
  }

}
