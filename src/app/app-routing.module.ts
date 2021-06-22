import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseAdminComponent } from './administrateur/base-admin/base-admin.component';
import { InfLocauxNationauxManageComponent } from './administrateur/inf-locaux-nationaux-manage/inf-locaux-nationaux-manage.component';
import { SourceEltsCreateComponent } from './administrateur/structure-source-management/source-elts-create/source-elts-create.component';
import { SourceEltsListComponent } from './administrateur/structure-source-management/source-elts-list/source-elts-list.component';
import { StructSourceManageComponent } from './administrateur/structure-source-management/struct-source-manage/struct-source-manage.component';
import { UserCreationComponent } from './administrateur/users-management/user-creation/user-creation.component';
import { UserListComponent } from './administrateur/users-management/user-list/user-list.component';
import { UsersManageComponent } from './administrateur/users-management/users-manage/users-manage.component';
import { BaseSourceComponent } from './agent-source/base-source/base-source.component';
import { DuplicateDDIAComponent } from './agent-source/duplicate-ddia/duplicate-ddia.component';
import { FormsViewComponent } from './agent-source/forms-view/forms-view.component';
import { InitDDIAViewComponent } from './agent-source/init-ddia-view/init-ddia-view.component';
import { UnitsDDIAComponent } from './agent-source/units-ddia/units-ddia.component';
import { PasswordChangeComponent } from './auth-components/password-change/password-change.component';
import { PasswordReset1Component } from './auth-components/password-reset1/password-reset1.component';
import { PasswordReset2Component } from './auth-components/password-reset2/password-reset2.component';
import { SigninComponent } from './auth-components/signin/signin.component';
import { AICComponent } from './shared-components/forms/aic/aic.component';
import { NotamComponent } from './shared-components/forms/notam/notam.component';
import { SUPPAIPComponent } from './shared-components/forms/supp-aip/supp-aip.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'signin' , pathMatch: 'full'},
      { path: 'signin', component: SigninComponent },
      { path: 'passwordreset1', component: PasswordReset1Component },
      { path: 'passwordreset2', component: PasswordReset2Component },
      { path: 'passwordchange', component: PasswordChangeComponent },
    ]
  },
  {
    path: 'ddiaforms',
    children: [
      {path: 'aic', component: AICComponent},
      {path: 'notam', component: NotamComponent},
      {path: 'suppaip', component: SUPPAIPComponent}

    ]
  },
  {
    path: 'source', component: BaseSourceComponent, children: [
        { path: '', redirectTo: 'initddia' , pathMatch: 'full'},
        { path: 'initddia', component: InitDDIAViewComponent, children: [
            { path: '', redirectTo: 'forms' , pathMatch: 'full'},
            { path: 'forms', component: FormsViewComponent},
            { path: 'cloneddia', component: DuplicateDDIAComponent}
          ]
        },
        { path: 'unitsddia', component: UnitsDDIAComponent, children: []},
    ]
  },
  {
    path: 'admin', component: BaseAdminComponent, children: [
        { path: '', redirectTo: 'manageusers' , pathMatch: 'full'},
        { path: 'manageusers', component: UsersManageComponent, children: [
            { path: '', redirectTo: 'userscreate' , pathMatch: 'full'},
            { path: 'userscreate', component: UserCreationComponent},
            { path: 'userslist', component: UserListComponent}
          ]
        },
        { path: 'structsource', component: StructSourceManageComponent, children: [
          { path: '', redirectTo: 'sourceeltscreate' , pathMatch: 'full'},
          { path: 'sourceeltscreate', component: SourceEltsCreateComponent},
          { path: 'sourceeltslist', component: SourceEltsListComponent}
        ]},
        { path: 'inflocalnational', component: InfLocauxNationauxManageComponent, children: [

        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
