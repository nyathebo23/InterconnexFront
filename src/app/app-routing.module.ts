import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseAdminComponent } from './administrateur/base-admin/base-admin.component';
import { InfLocalManagementComponent } from './administrateur/inf-local-management/inf-local-management.component';
import { InfLocauxNationauxManageComponent } from './administrateur/inf-locaux-nationaux-manage/inf-locaux-nationaux-manage.component';
import { InfNationalManagementComponent } from './administrateur/inf-national-management/inf-national-management.component';
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
// import { PasswordChangeComponent } from './auth-components/password-change/password-change.component';
import { PasswordReset1Component } from './auth-components/password-reset1/password-reset1.component';
import { PasswordReset2Component } from './auth-components/password-reset2/password-reset2.component';
import { SigninComponent } from './auth-components/signin/signin.component';
import { ListDDIAProcessedComponent } from './agent-controller/list-ddia-processed/list-ddia-processed.component';
import { ListDDIAReceivedComponent } from './agent-controller/list-ddia-received/list-ddia-received.component';
// import { ListDDIAProcessedComponent } from './verificateursource/list-ddia-processed/list-ddia-processed.component';
// import { ListDDIAReceivedComponent } from './verificateursource/list-ddia-received/list-ddia-received.component';
import { SignupVerifComponent } from './auth-components/signup-verif/signup-verif.component';
import { ChangeEmailComponent } from './auth-components/change-email/change-email.component';
import { ConfirmChangeEmailComponent } from './auth-components/confirm-change-email/confirm-change-email.component';
import { CodeResendComponent } from './auth-components/code-resend/code-resend.component';
import { PageNotFoundComponent } from './shared-components/components/page-not-found/page-not-found.component';
import { AuthGuardService } from './helpers/auth-guard.service';
import { CanActivateSourceAgent } from './helpers/can-activate-sourceagent';
import { BaseControlViewComponent } from './agent-controller/base-control-view/base-control-view.component';
import { CanActivateAdmin } from './helpers/can-activate-admin';
import { DDIAPresentComponent } from './agent-source/ddia-present/ddia-present.component';
import { NOTAMWithDataComponent } from './shared-components/components/notam-with-data/notam-with-data.component';
import { SUPPAIPWithDataComponent } from './shared-components/components/suppaip-with-data/suppaip-with-data.component';
import { AICWithDataComponent } from './shared-components/components/aic-with-data/aic-with-data.component';
import { DDIAReceivedContainerComponent } from './agent-controller/ddia-received-container/ddia-received-container.component';
// tslint:disable-next-line:max-line-length
import { DDIAProcessedContainerComponent } from './agent-controller/ddia-processed-container/ddia-processed-container.component';
import { CanActivateControlAgent } from './helpers/can-activate-controlagent';
import { CanActivateAuth } from './helpers/can-activate-auth';
import { UnitsDDIAListComponent } from './agent-source/units-ddia-list/units-ddia-list.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'signin' , pathMatch: 'full'},
      { path: 'signin', component: SigninComponent },
      { path: 'requestpasswordreset', component: PasswordReset1Component },
      { path: 'passwordreset', component: PasswordReset2Component },
      { path: 'signupverif/:user_id', component: SignupVerifComponent  },
      { path: 'emailchange', component: ChangeEmailComponent },
      { path: 'emailchangeconfirm', component: ConfirmChangeEmailComponent },
      { path: 'resendcode', component: CodeResendComponent },
    ]
  },
  // {
  //   path: 'ddiaforms',
  //   children: [
  //     {path: 'aic', component: AICComponent},
  //     {path: 'notam', component: NotamComponent},
  //     {path: 'suppaip', component: SUPPAIPComponent}

  //   ]
  // },
  {
    path: 'source', component: BaseSourceComponent, canActivate: [CanActivateAuth, CanActivateSourceAgent],
    children: [
      { path: '', redirectTo: 'initddia' , pathMatch: 'full'},
      { path: 'initddia', component: InitDDIAViewComponent, children: [
          { path: '', redirectTo: 'forms' , pathMatch: 'full'},
          { path: 'forms', component: FormsViewComponent},
          { path: 'cloneddia', component: DuplicateDDIAComponent}
        ]
      },
      { path: 'unitsddia', component: UnitsDDIAComponent, children: [
          { path: '', redirectTo: 'list' , pathMatch: 'full'},
          { path: 'list', component: UnitsDDIAListComponent },
          { path: 'present-ddia', component: DDIAPresentComponent, children: [
              { path: 'notam/:id', component: NOTAMWithDataComponent, data: {toDoAction: 'submittoverify'} },
              { path: 'suppaip/:id', component: SUPPAIPWithDataComponent, data: {toDoAction: 'submittoverify'} },
              { path: 'aic/:id', component: AICWithDataComponent, data: {toDoAction: 'submittoverify'} },
            ]
          }
        ]
      },
    ]
  },
  {
    path: 'admin', component: BaseAdminComponent, canActivate: [CanActivateAuth, CanActivateAdmin],
    children: [
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
        ]
      },
      { path: 'informers', component: InfLocauxNationauxManageComponent, children: [
          { path: '', redirectTo: 'inflocal' , pathMatch: 'full'},
          { path: 'inflocal', component: InfLocalManagementComponent },
          { path: 'infnational', component: InfNationalManagementComponent},
        ]
      },
    ]
  },
  {
    path: 'controlagent/:agentRole', component: BaseControlViewComponent, canActivate: [CanActivateAuth, CanActivateControlAgent],
    children: [
      { path: '', redirectTo: 'receivedddia' , pathMatch: 'full'},
      { path: 'receivedddia', component: ListDDIAReceivedComponent},
      { path: 'processedddia', component: ListDDIAProcessedComponent},
      { path: 'received/present-ddia', component: DDIAReceivedContainerComponent, children: [
          { path: 'notam/:id', component: NOTAMWithDataComponent },
          { path: 'suppaip/:id', component: SUPPAIPWithDataComponent },
          { path: 'aic/:id', component: AICWithDataComponent },
        ]
      },
      { path: 'processed/present-ddia', component: DDIAProcessedContainerComponent, children: [
        { path: 'notam/:id', component: NOTAMWithDataComponent },
        { path: 'suppaip/:id', component: SUPPAIPWithDataComponent },
        { path: 'aic/:id', component: AICWithDataComponent },
        ]
      },
    ]
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
