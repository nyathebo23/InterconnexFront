import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth-components/signin/signin.component';
import { PasswordReset1Component } from './auth-components/password-reset1/password-reset1.component';
import { PasswordReset2Component } from './auth-components/password-reset2/password-reset2.component';
import { ControlMessagesComponent } from './auth-components/control-messages/control-messages.component';
import { ValidationService } from './services/auth-services/validation.service';
import { PasswordChangeComponent } from './auth-components/password-change/password-change.component';
import { NotamComponent } from './shared-components/forms/notam/notam.component';
import { SUPPAIPComponent } from './shared-components/forms/supp-aip/supp-aip.component';
import { AICComponent } from './shared-components/forms/aic/aic.component';
import { SourceUnitFormComponent } from './shared-components/forms/source-unit-form/source-unit-form.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

import {  ButtonsModule, WavesModule, CollapseModule, CarouselModule, TableModule } from 'angular-bootstrap-md';
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

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader{
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    PasswordReset1Component,
    PasswordReset2Component,
    ControlMessagesComponent,
    PasswordChangeComponent,
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
    SourceEltsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    CarouselModule.forRoot(),
    WavesModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    TableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory ,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
