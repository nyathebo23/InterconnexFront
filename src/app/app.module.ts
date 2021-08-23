import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth-components/signin/signin.component';
import { PasswordReset1Component } from './auth-components/password-reset1/password-reset1.component';
import { PasswordReset2Component } from './auth-components/password-reset2/password-reset2.component';
import { ControlMessagesComponent } from './auth-components/control-messages/control-messages.component';
import { ValidationService } from './services/auth-services/validation.service';
import { NotamComponent } from './shared-components/forms/notam/notam.component';
import { SUPPAIPComponent } from './shared-components/forms/supp-aip/supp-aip.component';
import { AICComponent } from './shared-components/forms/aic/aic.component';
import { SourceUnitFormComponent } from './shared-components/forms/source-unit-form/source-unit-form.component';
import { ButtonsModule, WavesModule, CollapseModule, CarouselModule,
  TableModule, NavbarModule, CheckboxModule, ModalModule, IconsModule } from 'angular-bootstrap-md';
import { LeftNavComponent } from './shared-components/components/left-nav/left-nav.component';
import { DDIAItemComponent } from './shared-components/components/ddia-item/ddia-item.component';
import { LayoutComponent } from './shared-components/components/layout/layout.component';
import { FormsViewComponent } from './agent-source/forms-view/forms-view.component';
import { InitDDIAViewComponent } from './agent-source/init-ddia-view/init-ddia-view.component';
import { DuplicateDDIAComponent } from './agent-source/duplicate-ddia/duplicate-ddia.component';
import { NOTAMItemComponent } from './shared-components/components/notam-item/notam-item.component';
import { UnitsDDIAComponent } from './agent-source/units-ddia/units-ddia.component';
import { SUPPAIPItemComponent } from './shared-components/components/suppaip-item/suppaip-item.component';
import { AICItemComponent } from './shared-components/components/aic-item/aic-item.component';
import { DDIAListComponent } from './shared-components/components/ddia-list/ddia-list.component';
import { UserCreationComponent } from './administrateur/users-management/user-creation/user-creation.component';
import { UserListComponent } from './administrateur/users-management/user-list/user-list.component';
import { UsersManageComponent } from './administrateur/users-management/users-manage/users-manage.component';
import { BaseAdminComponent } from './administrateur/base-admin/base-admin.component';
import { BaseSourceComponent } from './agent-source/base-source/base-source.component';
import { BaseComponent } from './shared-components/components/base/base.component';
import { StructSourceManageComponent } from './administrateur/structure-source-management/struct-source-manage/struct-source-manage.component';
import { InfLocauxNationauxManageComponent } from './administrateur/inf-locaux-nationaux-manage/inf-locaux-nationaux-manage.component';
import { SourceEltsCreateComponent } from './administrateur/structure-source-management/source-elts-create/source-elts-create.component';
import { SourceEltsListComponent } from './administrateur/structure-source-management/source-elts-list/source-elts-list.component';
import { ListAerodromesComponent } from './administrateur/structure-source-management/list-aerodromes/list-aerodromes.component';
import { ListUnitsComponent } from './administrateur/structure-source-management/list-units/list-units.component';
import { InfLocalManagementComponent } from './administrateur/inf-local-management/inf-local-management.component';
import { InfNationalManagementComponent } from './administrateur/inf-national-management/inf-national-management.component';
import { JwtModule } from '@auth0/angular-jwt';
import * as URLS from './commons/urls-backend';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SignupVerifComponent } from './auth-components/signup-verif/signup-verif.component';
import { ChangeEmailComponent } from './auth-components/change-email/change-email.component';
import { ConfirmChangeEmailComponent } from './auth-components/confirm-change-email/confirm-change-email.component';
import { CodeResendComponent } from './auth-components/code-resend/code-resend.component';
import { ListDDIAProcessedComponent } from './agent-controller/list-ddia-processed/list-ddia-processed.component';
import { ListDDIAReceivedComponent } from './agent-controller/list-ddia-received/list-ddia-received.component';
import { BaseControlViewComponent } from './agent-controller/base-control-view/base-control-view.component';
import { PageNotFoundComponent } from './shared-components/components/page-not-found/page-not-found.component';
import { AuthManagerService } from './services/auth-services/auth-manager.service';
import { AdminService } from './services/agent-services/admin.service';
import { DDIAReceivedContainerComponent } from './shared-components/components/ddia-received-container/ddia-received-container.component';
// tslint:disable-next-line:max-line-length
import { DDIAProcessedContainerComponent } from './shared-components/components/ddia-processed-container/ddia-processed-container.component';
import { CanActivateAdmin } from './helpers/can-activate-admin';
import { CanActivateSourceAgent } from './helpers/can-activate-sourceagent';
import { StateBoxComponent } from './shared-components/components/state-box/state-box.component';
import { ListStatesBoxComponent } from './shared-components/components/list-states-box/list-states-box.component';
import { AICWithDataComponent } from './shared-components/components/aic-with-data/aic-with-data.component';
import { SUPPAIPWithDataComponent } from './shared-components/components/suppaip-with-data/suppaip-with-data.component';
import { NOTAMWithDataComponent } from './shared-components/components/notam-with-data/notam-with-data.component';
import { DDIAPresentComponent } from './agent-source/ddia-present/ddia-present.component';
import { CanActivateControlAgent } from './helpers/can-activate-controlagent';
import { CanActivateAuth } from './helpers/can-activate-auth';
import { ControlActorService } from './services/agent-services/control-actor.service';
import { UnitsDDIAListComponent } from './agent-source/units-ddia-list/units-ddia-list.component';
import { ControlDDIAConfirmModalcontentComponent } from './shared-components/components/control-ddia-confirm-modalcontent/control-ddia-confirm-modalcontent.component';
import { ModalControlDDIAConfirmComponent } from './shared-components/components/modal-control-ddia-confirm/modal-control-ddia-confirm.component';
import { BaseVerifSourceComponent } from './verif-source/base-verif-source/base-verif-source.component';
import { VerifSourceListDDIAReceivedComponent } from './verif-source/verif-source-list-ddia-received/verif-source-list-ddia-received.component';
import { VerifSourceListDDIAProcessedComponent } from './verif-source/verif-source-list-ddia-processed/verif-source-list-ddia-processed.component';
import { SourceStructureListDDIAReceivedComponent } from './source-structure/source-structure-list-ddia-received/source-structure-list-ddia-received.component';
import { SourceStructureListDDIAProcessedComponent } from './source-structure/source-structure-list-ddia-processed/source-structure-list-ddia-processed.component';
import { BaseSourceStructureComponent } from './source-structure/base-source-structure/base-source-structure.component';
import { BaseLocalInformerComponent } from './local-informer-extern/base-local-informer/base-local-informer.component';
import { LocalinfListDDIAReceivedComponent } from './local-informer-extern/localinf-list-ddia-received/localinf-list-ddia-received.component';
import { LocalinfListDDIAProcessedComponent } from './local-informer-extern/localinf-list-ddia-processed/localinf-list-ddia-processed.component';
import { BaseNationalInformerComponent } from './national-informer/base-national-informer/base-national-informer.component';
import { NationalinfListDDIAReceivedComponent } from './national-informer/nationalinf-list-ddia-received/nationalinf-list-ddia-received.component';
import { NationalinfListDDIAProcessedComponent } from './national-informer/nationalinf-list-ddia-processed/nationalinf-list-ddia-processed.component';
import { DDIAReceivedBaseContainerComponent } from './shared-components/components/ddia-received-base-container/ddia-received-base-container.component';
import { DDIAProcessedBaseContainerComponent } from './shared-components/components/ddia-processed-base-container/ddia-processed-base-container.component';
import { AccessControlDirective } from './directives/access-control.directive';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoaderComponent } from './shared-components/components/loader/loader.component';
import { EmptyDDIAListComponent } from './shared-components/components/empty-ddia-list/empty-ddia-list.component';
import { LoadDataErrorComponent } from './shared-components/components/load-data-error/load-data-error.component';
import { HistoryBoxComponent } from './shared-components/components/history-box/history-box.component';
import { ItemHistoryBoxComponent } from './shared-components/components/item-history-box/item-history-box.component';
import { ModalConnectionErrorComponent } from './shared-components/components/modal-connection-error/modal-connection-error.component';
// tslint:disable-next-line:max-line-length
import { ModalChoiceNationalinfComponent } from './shared-components/components/modal-choice-nationalinf/modal-choice-nationalinf.component';
import { ModalDisplayService } from './services/shared/modal-display.service';
import { DDIAActionsListComponent } from './shared-components/components/ddia-actions-list/ddia-actions-list.component';
import { DDIAActionItemComponent } from './shared-components/components/ddia-action-item/ddia-action-item.component';
import { ModalDeleteConfirmComponent } from './shared-components/components/modal-delete-confirm/modal-delete-confirm.component';
import { ModalRejectDDIAComponent } from './shared-components/components/modal-reject-ddia/modal-reject-ddia.component';
import { ModalSuccessCreationDDIAComponent } from './shared-components/components/modal-success-creation-ddia/modal-success-creation-ddia.component';
import { DisabledWhenLoadingDirective } from './directives/disabled-when-loading.directive';
import { DisableControlDirective } from './directives/disable-control.directive';
import { NotificationComponent } from './shared-components/components/notification/notification.component';
import { ListNotificationsComponent } from './shared-components/components/list-notifications/list-notifications.component';
import { PusherSourceService } from './services/pusher/pusher-source.service';
import { PusherNationalInformerService } from './services/pusher/pusher-national-informer.service';
import { PusherAuthorityLocalinfService } from './services/pusher/pusher-authority-localinf.service';
import { PusherSourceVerifierService } from './services/pusher/pusher-source-verifier.service';
import { PusherSourceStructureService } from './services/pusher/pusher-source-structure.service';
import { ModalReceiveDDIANotifComponent } from './shared-components/components/modal-receive-ddia-notif/modal-receive-ddia-notif.component';
import { ModalNotifStateChangeComponent } from './shared-components/components/modal-notif-state-change/modal-notif-state-change.component';
import { NotificationDisplayService } from './services/shared/notification-display.service';
import { AicWithDatasForSourcestructureComponent } from './shared-components/components/aic-with-datas-for-sourcestructure/aic-with-datas-for-sourcestructure.component';
import { NOTAMWithDatasForSourcestructureComponent } from './shared-components/components/notam-with-datas-for-sourcestructure/notam-with-datas-for-sourcestructure.component';
import { SUPPAIPWithDatasForSourcestructureComponent } from './shared-components/components/suppaip-with-datas-for-sourcestructure/suppaip-with-datas-for-sourcestructure.component';
import { ModalConfirmCancelDDIAComponent } from './shared-components/components/modal-confirm-cancel-ddia/modal-confirm-cancel-ddia.component';
import { ModalPublishDDIAComponent } from './shared-components/components/modal-publish-ddia/modal-publish-ddia.component';
import { ModalConfirmRelanceComponent } from './shared-components/components/modal-confirm-relance/modal-confirm-relance.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader{
  // console.log(localStorage.getItem('access_token'));
  return new TranslateHttpLoader(http);
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#150734',
  // bgsOpacity: 0.5,
  // bgsPosition: POSITION.bottomLeft,
  // bgsSize: 60,
  // bgsType: SPINNER.chasingDots,
  // blur: 5,
  // delay: 0,
  fastFadeOut: true,
  fgsColor: '#150734',
  // fgsPosition: POSITION.centerCenter,
  // fgsSize: 60,
  // fgsType: SPINNER.chasingDots,
  // gap: 24,
  // overlayBorderRadius: '0',
  // overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: '#150734',
  // pbDirection: PB_DIRECTION.leftToRight,
  // pbThickness: 5,
  hasProgressBar: false,
  // text: 'Welcome to ngx-ui-loader',
  // textColor: '#FFFFFF',
  // textPosition: POSITION.centerCenter,
  // maxTime: -1,
  // minTime: 500
};

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    PasswordReset1Component,
    PasswordReset2Component,
    ControlMessagesComponent,
    // PasswordChangeComponent,
    NotamComponent,
    SUPPAIPComponent,
    AICComponent,
    SourceUnitFormComponent,
    LeftNavComponent,
    DDIAItemComponent,
    LayoutComponent,
    FormsViewComponent,
    InitDDIAViewComponent,
    DuplicateDDIAComponent,
    NOTAMItemComponent,
    UnitsDDIAComponent,
    SUPPAIPItemComponent,
    AICItemComponent,
    DDIAListComponent,
    UserCreationComponent,
    UserListComponent,
    UsersManageComponent,
    BaseComponent,
    BaseSourceComponent,
    BaseAdminComponent,
    StructSourceManageComponent,
    InfLocauxNationauxManageComponent,
    SourceEltsCreateComponent,
    SourceEltsListComponent,
    ListAerodromesComponent,
    ListUnitsComponent,
    InfLocalManagementComponent,
    InfNationalManagementComponent,
    ListDDIAReceivedComponent,
    ListDDIAProcessedComponent,
    SignupVerifComponent,
    ChangeEmailComponent,
    ConfirmChangeEmailComponent,
    CodeResendComponent,
    BaseControlViewComponent,
    PageNotFoundComponent,
    StateBoxComponent,
    ListStatesBoxComponent,
    AICWithDataComponent,
    SUPPAIPWithDataComponent,
    NOTAMWithDataComponent,
    DDIAPresentComponent,
    DDIAReceivedContainerComponent,
    DDIAProcessedContainerComponent,
    UnitsDDIAListComponent,
    ControlDDIAConfirmModalcontentComponent,
    ModalControlDDIAConfirmComponent,
    BaseVerifSourceComponent,
    VerifSourceListDDIAReceivedComponent,
    VerifSourceListDDIAProcessedComponent,
    SourceStructureListDDIAReceivedComponent,
    SourceStructureListDDIAProcessedComponent,
    BaseSourceStructureComponent,
    BaseLocalInformerComponent,
    LocalinfListDDIAReceivedComponent,
    LocalinfListDDIAProcessedComponent,
    BaseNationalInformerComponent,
    NationalinfListDDIAReceivedComponent,
    NationalinfListDDIAProcessedComponent,
    DDIAReceivedBaseContainerComponent,
    DDIAProcessedBaseContainerComponent,
    AccessControlDirective,
    LoaderComponent,
    EmptyDDIAListComponent,
    LoadDataErrorComponent,
    HistoryBoxComponent,
    ItemHistoryBoxComponent,
    ModalConnectionErrorComponent,
    ModalChoiceNationalinfComponent,
    DDIAActionsListComponent,
    DDIAActionItemComponent,
    ModalDeleteConfirmComponent,
    ModalRejectDDIAComponent,
    ModalSuccessCreationDDIAComponent,
    DisabledWhenLoadingDirective,
    DisableControlDirective,
    NotificationComponent,
    ListNotificationsComponent,
    ModalReceiveDDIANotifComponent,
    ModalNotifStateChangeComponent,
    AicWithDatasForSourcestructureComponent,
    NOTAMWithDatasForSourcestructureComponent,
    SUPPAIPWithDatasForSourcestructureComponent,
    ModalConfirmCancelDDIAComponent,
    ModalPublishDDIAComponent,
    ModalConfirmRelanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TimepickerModule.forRoot(),
    CarouselModule.forRoot(),
    WavesModule.forRoot(),
    IconsModule,
    CheckboxModule,
    NavbarModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    TableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory ,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: [URLS.HOST_URL.replace('http://', '')],
        disallowedRoutes: [
          URLS.LOGIN,
          URLS.REFRESH_TOKEN_URL,
        ],
        authScheme: 'Bearer ', // Default value,
        skipWhenExpired: true,
      },
    }),
  ],
  providers: [
    ValidationService,
    AuthManagerService,
    ControlActorService,
    CanActivateAuth,
    CanActivateAdmin,
    CanActivateSourceAgent,
    CanActivateControlAgent,
    ModalDisplayService,
    PusherSourceService,
    PusherSourceVerifierService,
    PusherSourceStructureService,
    PusherNationalInformerService,
    PusherAuthorityLocalinfService,
    NotificationDisplayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
