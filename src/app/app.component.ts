import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ConnectionService } from 'ng-connection-service';
import { ModalDisplayService } from './services/shared/modal-display.service';
import { ModalConnectionErrorComponent } from './shared-components/components/modal-connection-error/modal-connection-error.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InterconnexFront';
  modalRef: MDBModalRef;
  constructor(
    public translate: TranslateService,
    private connectionService: ConnectionService,
    private mdbModalService: MDBModalService,
    private modalDisplayService: ModalDisplayService
  ){
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use('en');
    this.connectionService.monitor().subscribe((isConnected) => {
      if (!isConnected){
        this.openModal();
      }
      else if (this.modalRef) {
        this.modalRef.hide();
      }
    });
  }

    openModal(): void {
      this.modalRef = this.mdbModalService.show(ModalConnectionErrorComponent, this.modalDisplayService.getModalOptions({},
        'modal-dialog modal-frame modal-bottom modal-warning', true));
    }

}
