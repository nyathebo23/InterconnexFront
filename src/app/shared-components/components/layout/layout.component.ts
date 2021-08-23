import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ConnectionService } from 'ng-connection-service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalConnectionErrorComponent } from '../modal-connection-error/modal-connection-error.component';
import * as ROLES from '../../../commons/constants-roles';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { NotificationDisplayService } from 'src/app/services/shared/notification-display.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @Input()
  navLinks: {name: string, iconClass: string, url: string}[];
  user: User;
  isConnected: boolean;
  modalRef: MDBModalRef;
  roles: any;
  accessibleViews: {label: string, url: string}[] = [];
  constructor(
    private authService: AuthManagerService,
    private connectionService: ConnectionService,
    private mdbModalService: MDBModalService,
    private modalDisplayService: ModalDisplayService,
    private notificationDisplayService: NotificationDisplayService
  ) {
    this.accessibleViews.push({label: 'DDIA Initiation', url: '/source'});
    this.accessibleViews.push({label: 'DDIA Verification', url: '/sourceverifier'});
    this.connectionService.monitor().subscribe( (isConnected) => {
      this.isConnected = isConnected;
      if (!isConnected){
        this.openModal();
      }
      else if (this.modalRef) {
        this.modalRef.hide();
      }
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user.role === ROLES.SOURCE_VERIFIER){
      this.accessibleViews.push({label: 'DDIA Initiation', url: '/source'});
      this.accessibleViews.push({label: 'DDIA Verification', url: '/sourceverifier'});
    }
    if (this.user.role && this.user.isStaff){
      this.accessibleViews.push({label: 'Administrator', url: '/admin'});
    }
  }

  openModal(): void {
    this.modalRef = this.mdbModalService.show(ModalConnectionErrorComponent, this.modalDisplayService.getModalOptions({},
      'modal-dialog modal-frame modal-bottom modal-warning'));
  }

  logout(): void {
    this.authService.logout();
  }
}
