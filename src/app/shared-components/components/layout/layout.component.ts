import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ConnectionService } from 'ng-connection-service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalConnectionErrorComponent } from '../modal-connection-error/modal-connection-error.component';

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
  modalOptions: any;
  modalRef: MDBModalRef;
  constructor(
    private authService: AuthManagerService,
    private connectionService: ConnectionService,
    private mdbModalService: MDBModalService
  ) {

    this.modalOptions = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog modal-frame modal-bottom modal-warning',
      containerClass: '',
      animated: true,
      data: {
      }
    };
    this.connectionService.monitor().subscribe( (isConnected) => {
      this.isConnected = isConnected;
      console.log(isConnected);
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
  }

  openModal(): void {
    this.modalRef = this.mdbModalService.show(ModalConnectionErrorComponent, this.modalOptions);
  }

  logout(): void {
    this.authService.logout();
  }
}
