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

import { SignupVerifComponent } from './auth-components/signup-verif/signup-verif.component';
import { ChangeEmailComponent } from './auth-components/change-email/change-email.component';
import { ConfirmChangeEmailComponent } from './auth-components/confirm-change-email/confirm-change-email.component';
import { CodeResendComponent } from './auth-components/code-resend/code-resend.component';
import { PageNotFoundComponent } from './shared-components/components/page-not-found/page-not-found.component';
import { CanActivateSourceAgent } from './helpers/can-activate-sourceagent';
import { BaseControlViewComponent } from './agent-controller/base-control-view/base-control-view.component';
import { CanActivateAdmin } from './helpers/can-activate-admin';
import { DDIAPresentComponent } from './agent-source/ddia-present/ddia-present.component';
import { NOTAMWithDataComponent } from './shared-components/components/notam-with-data/notam-with-data.component';
import { SUPPAIPWithDataComponent } from './shared-components/components/suppaip-with-data/suppaip-with-data.component';
import { AICWithDataComponent } from './shared-components/components/aic-with-data/aic-with-data.component';
import { DDIAReceivedContainerComponent } from './shared-components/components/ddia-received-container/ddia-received-container.component';
// tslint:disable-next-line:max-line-length
import { DDIAProcessedContainerComponent } from './shared-components/components/ddia-processed-container/ddia-processed-container.component';
import { CanActivateControlAgent } from './helpers/can-activate-controlagent';
import { CanActivateAuth } from './helpers/can-activate-auth';
import { UnitsDDIAListComponent } from './agent-source/units-ddia-list/units-ddia-list.component';
import { BaseVerifSourceComponent } from './verif-source/base-verif-source/base-verif-source.component';
import { VerifSourceListDDIAReceivedComponent } from './verif-source/verif-source-list-ddia-received/verif-source-list-ddia-received.component';
import { VerifSourceListDDIAProcessedComponent } from './verif-source/verif-source-list-ddia-processed/verif-source-list-ddia-processed.component';
import { BaseSourceStructureComponent } from './source-structure/base-source-structure/base-source-structure.component';
import { SourceStructureListDDIAReceivedComponent } from './source-structure/source-structure-list-ddia-received/source-structure-list-ddia-received.component';
import { SourceStructureListDDIAProcessedComponent } from './source-structure/source-structure-list-ddia-processed/source-structure-list-ddia-processed.component';
import { BaseLocalInformerComponent } from './local-informer-extern/base-local-informer/base-local-informer.component';
import { LocalinfListDDIAReceivedComponent } from './local-informer-extern/localinf-list-ddia-received/localinf-list-ddia-received.component';
import { LocalinfListDDIAProcessedComponent } from './local-informer-extern/localinf-list-ddia-processed/localinf-list-ddia-processed.component';
import { DDIAReceivedBaseContainerComponent } from './shared-components/components/ddia-received-base-container/ddia-received-base-container.component';
import { DDIAProcessedBaseContainerComponent } from './shared-components/components/ddia-processed-base-container/ddia-processed-base-container.component';
import { NationalinfListDDIAReceivedComponent } from './national-informer/nationalinf-list-ddia-received/nationalinf-list-ddia-received.component';
import { NationalinfListDDIAProcessedComponent } from './national-informer/nationalinf-list-ddia-processed/nationalinf-list-ddia-processed.component';
import { ADMISSION, APPROBATION, MODIFICATION, PUBLISH_OR_RESENDREQ, SUBMIT_TO_VERIFY,
  VALIDATION, VERIFICATION } from './commons/control-actions-on-ddia';
import { NotamComponent } from './shared-components/forms/notam/notam.component';
import { SUPPAIPComponent } from './shared-components/forms/supp-aip/supp-aip.component';
import { AICComponent } from './shared-components/forms/aic/aic.component';
import { NotificationComponent } from './shared-components/components/notification/notification.component';
import * as URLS from './commons/urls-backend';
import { ListNotificationsComponent } from './shared-components/components/list-notifications/list-notifications.component';
import { NOTAMWithDatasForSourcestructureComponent } from './shared-components/components/notam-with-datas-for-sourcestructure/notam-with-datas-for-sourcestructure.component';
import { AicWithDatasForSourcestructureComponent } from './shared-components/components/aic-with-datas-for-sourcestructure/aic-with-datas-for-sourcestructure.component';
import { SUPPAIPWithDatasForSourcestructureComponent } from './shared-components/components/suppaip-with-datas-for-sourcestructure/suppaip-with-datas-for-sourcestructure.component';
import { BaseNationalInformerComponent } from './national-informer/base-national-informer/base-national-informer.component';
import { StatisticPageSourceComponent } from './agent-source/statistic-page-source/statistic-page-source.component';
import { StatisticPageSourceVerifComponent } from './verif-source/statistic-page-source-verif/statistic-page-source-verif.component';
import { StatisticPageSourceStructureComponent } from './source-structure/statistic-page-source-structure/statistic-page-source-structure.component';
import { StatisticPageLocalInformerComponent } from './local-informer-extern/statistic-page-local-informer/statistic-page-local-informer.component';
import { StatisticPageNationalInformerComponent } from './national-informer/statistic-page-national-informer/statistic-page-national-informer.component';
import { UnitsErroneousDDIAComponent } from './agent-source/units-erroneous-ddia/units-erroneous-ddia.component';
import { NOTAMModifComponent } from './shared-components/forms/notam-modif/notam-modif.component';
import { SUPPAIPModifComponent } from './shared-components/forms/suppaip-modif/suppaip-modif.component';
import { AICModifComponent } from './shared-components/forms/aic-modif/aic-modif.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth' , pathMatch: 'full'},
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'signin' , pathMatch: 'full'},
      { path: 'signin', component: SigninComponent },
      { path: 'requestpasswordreset', component: PasswordReset1Component },
      { path: 'passwordreset', component: PasswordReset2Component},
      { path: 'signupverif/:user_id', component: SignupVerifComponent, canActivate: [CanActivateAuth]  },
      { path: 'emailchange', component: ChangeEmailComponent, canActivate: [CanActivateAuth] },
      { path: 'emailchangeconfirm', component: ConfirmChangeEmailComponent, canActivate: [CanActivateAuth] },
      { path: 'resendcode', component: CodeResendComponent, canActivate: [CanActivateAuth] },
    ]
  },
  {
    path: 'source', component: BaseSourceComponent, canActivate: [CanActivateAuth, CanActivateSourceAgent],
    children: [
      { path: '', redirectTo: 'initddia' , pathMatch: 'full'},
      { path: 'initddia', component: InitDDIAViewComponent, children: [
          { path: '', redirectTo: 'forms' , pathMatch: 'full'},
          { path: 'forms', component: FormsViewComponent, children: [
            { path: '', redirectTo: 'notam' , pathMatch: 'full'},
            { path: 'notam', component: NotamComponent},
            { path: 'suppaip', component: SUPPAIPComponent},
            { path: 'aic', component: AICComponent},
           ]
          },
          // { path: 'cloneddia', component: DuplicateDDIAComponent}
        ]
      },
      { path: 'unitsddia', component: UnitsDDIAComponent, children: [
          { path: '', redirectTo: 'list' , pathMatch: 'full'},
          { path: 'list', component: UnitsDDIAListComponent },
          { path: 'present-ddia', component: DDIAPresentComponent, children: [
              { path: 'notam/:id', component: NOTAMWithDataComponent, data: {toDoAction: SUBMIT_TO_VERIFY} },
              { path: 'suppaip/:id', component: SUPPAIPWithDataComponent, data: {toDoAction: SUBMIT_TO_VERIFY} },
              { path: 'aic/:id', component: AICWithDataComponent, data: {toDoAction: SUBMIT_TO_VERIFY} },
            ]
          }
        ]
      },
      { path: 'unitsddia-erroneous', component: UnitsDDIAComponent, children: [
        { path: '', redirectTo: 'list' , pathMatch: 'full'},
        { path: 'list', component: UnitsErroneousDDIAComponent },
        { path: 'present-ddia', component: DDIAPresentComponent, children: [
              { path: 'notam/:id', component: NOTAMModifComponent, data: {toDoAction: MODIFICATION} },
              { path: 'suppaip/:id', component: SUPPAIPModifComponent, data: {toDoAction: MODIFICATION} },
              { path: 'aic/:id', component: AICModifComponent, data: {toDoAction: MODIFICATION} },
            ]
          }
        ]
      },
      { path: 'stats', component: StatisticPageSourceComponent}
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
    path: 'sourceverifier', component: BaseVerifSourceComponent, canActivate: [CanActivateAuth, CanActivateControlAgent],
    children: [
      { path: '', redirectTo: 'receivedddia' , pathMatch: 'full'},
      { path: 'receivedddia', component: DDIAReceivedBaseContainerComponent, children: [
        { path: '', redirectTo: 'list' , pathMatch: 'full'},
         { path: 'list', component: VerifSourceListDDIAReceivedComponent},
         { path: 'present-ddia', component: DDIAReceivedContainerComponent, children: [
            { path: 'notam/:id', component: NOTAMWithDataComponent, data: {toDoAction: VERIFICATION} },
            { path: 'suppaip/:id', component: SUPPAIPWithDataComponent, data: {toDoAction: VERIFICATION} },
            { path: 'aic/:id', component: AICWithDataComponent, data: {toDoAction: VERIFICATION} },
          ]
         }
        ]
      },
      { path: 'processedddia', component: DDIAProcessedBaseContainerComponent, children: [
          { path: '', redirectTo: 'list' , pathMatch: 'full'},
          { path: 'list', component: VerifSourceListDDIAProcessedComponent},
          { path: 'present-ddia', component: DDIAProcessedContainerComponent, children: [
             { path: 'notam/:id', component: NOTAMWithDataComponent },
             { path: 'suppaip/:id', component: SUPPAIPWithDataComponent },
             { path: 'aic/:id', component: AICWithDataComponent },
            ]
          }
        ]
      },
      { path: 'stats', component: StatisticPageSourceVerifComponent}

    ]
  },
  {
    path: 'sourcestructure', component: BaseSourceStructureComponent, canActivate: [CanActivateAuth, CanActivateControlAgent],
    children: [
      { path: '', redirectTo: 'receivedddia' , pathMatch: 'full'},
      { path: 'receivedddia', component: DDIAReceivedBaseContainerComponent, children: [
         { path: '', redirectTo: 'list' , pathMatch: 'full'},
         { path: 'list', component: SourceStructureListDDIAReceivedComponent},
         { path: 'present-ddia', component: DDIAReceivedContainerComponent, children: [
            { path: 'notam/:id', component: NOTAMWithDatasForSourcestructureComponent,  data: {toDoAction: ADMISSION}  },
            { path: 'suppaip/:id', component: SUPPAIPWithDatasForSourcestructureComponent,  data: {toDoAction: ADMISSION}  },
            { path: 'aic/:id', component: AicWithDatasForSourcestructureComponent,  data: {toDoAction: ADMISSION}  },
          ]
         }
        ]
      },
      { path: 'processedddia', component: DDIAProcessedBaseContainerComponent, children: [
          { path: '', redirectTo: 'list' , pathMatch: 'full'},
          { path: 'list', component: SourceStructureListDDIAProcessedComponent},
          { path: 'present-ddia', component: DDIAProcessedContainerComponent, children: [
             { path: 'notam/:id', component: NOTAMWithDataComponent },
             { path: 'suppaip/:id', component: SUPPAIPWithDataComponent },
             { path: 'aic/:id', component: AICWithDataComponent },
            ]
          }
        ]
      },
      { path: 'stats', component: StatisticPageSourceStructureComponent}

    ]
  },
  {
    path: 'localinformer', component: BaseLocalInformerComponent, canActivate: [CanActivateAuth, CanActivateControlAgent],
    children: [
      { path: '', redirectTo: 'receivedddia' , pathMatch: 'full'},
      { path: 'receivedddia', component: DDIAReceivedBaseContainerComponent, children: [
        { path: '', redirectTo: 'list' , pathMatch: 'full'},
         { path: 'list', component: LocalinfListDDIAReceivedComponent},
         { path: 'present-ddia', component: DDIAReceivedContainerComponent, children: [
            { path: 'notam/:id', component: NOTAMWithDataComponent,  data: {toDoAction: VALIDATION}   },
            { path: 'suppaip/:id', component: SUPPAIPWithDataComponent,  data: {toDoAction: VALIDATION}   },
            { path: 'aic/:id', component: AICWithDataComponent,  data: {toDoAction: VALIDATION}   },
          ]
         }
        ]
      },
      { path: 'processedddia', component: DDIAProcessedBaseContainerComponent, children: [
          { path: '', redirectTo: 'list' , pathMatch: 'full'},
          { path: 'list', component: LocalinfListDDIAProcessedComponent},
          { path: 'present-ddia', component: DDIAProcessedContainerComponent, children: [
             { path: 'notam/:id', component: NOTAMWithDataComponent,  data: {toDoAction: PUBLISH_OR_RESENDREQ}  },
             { path: 'suppaip/:id', component: SUPPAIPWithDataComponent,  data: {toDoAction: PUBLISH_OR_RESENDREQ}  },
             { path: 'aic/:id', component: AICWithDataComponent,  data: {toDoAction: PUBLISH_OR_RESENDREQ}  },
            ]
          }
        ]
      },
      { path: 'stats', component: StatisticPageLocalInformerComponent}

    ]
  },
  {
    path: 'nationalinformer', component: BaseNationalInformerComponent, canActivate: [CanActivateAuth, CanActivateControlAgent],
    children: [
      { path: '', redirectTo: 'receivedddia' , pathMatch: 'full'},
      { path: 'receivedddia', component: DDIAReceivedBaseContainerComponent, children: [
         { path: '', redirectTo: 'list' , pathMatch: 'full'},
         { path: 'list', component: NationalinfListDDIAReceivedComponent},
         { path: 'present-ddia', component: DDIAReceivedContainerComponent, children: [
            { path: 'notam/:id', component: NOTAMWithDataComponent,  data: {toDoAction: APPROBATION}   },
            { path: 'suppaip/:id', component: SUPPAIPWithDataComponent,  data: {toDoAction: APPROBATION}   },
            { path: 'aic/:id', component: AICWithDataComponent,  data: {toDoAction: APPROBATION}   },
          ]
         }
        ]
      },
      { path: 'processedddia', component: DDIAProcessedBaseContainerComponent, children: [
          { path: '', redirectTo: 'list' , pathMatch: 'full'},
          { path: 'list', component: NationalinfListDDIAProcessedComponent},
          { path: 'present-ddia', component: DDIAProcessedContainerComponent, children: [
             { path: 'notam/:id', component: NOTAMWithDataComponent,  data: {toDoAction: PUBLISH_OR_RESENDREQ} },
             { path: 'suppaip/:id', component: SUPPAIPWithDataComponent,  data: {toDoAction: PUBLISH_OR_RESENDREQ}  },
             { path: 'aic/:id', component: AICWithDataComponent,  data: {toDoAction: PUBLISH_OR_RESENDREQ}  },
            ]
          }
        ]
      },
      { path: 'stats', component: StatisticPageNationalInformerComponent}

    ]
  },
  // {
  //   path: 'controlagent/:agentRole', component: BaseControlViewComponent, canActivate: [CanActivateAuth, CanActivateControlAgent],
  //   children: [
  //     { path: '', redirectTo: 'receivedddia' , pathMatch: 'full'},
  //     { path: 'receivedddia', component: ListDDIAReceivedComponent},
  //     { path: 'processedddia', component: ListDDIAProcessedComponent},
  //     { path: 'received/present-ddia', component: DDIAReceivedContainerComponent, children: [
  //         { path: 'notam/:id', component: NOTAMWithDataComponent },
  //         { path: 'suppaip/:id', component: SUPPAIPWithDataComponent },
  //         { path: 'aic/:id', component: AICWithDataComponent },
  //       ]
  //     },
  //     { path: 'processed/present-ddia', component: DDIAProcessedContainerComponent, children: [
  //       { path: 'notam/:id', component: NOTAMWithDataComponent },
  //       { path: 'suppaip/:id', component: SUPPAIPWithDataComponent },
  //       { path: 'aic/:id', component: AICWithDataComponent },
  //       ]
  //     },
  //   ]
  // },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
