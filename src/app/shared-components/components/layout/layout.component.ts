import { Component, Input, OnChanges, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,
  ElementRef, ViewChild, AfterViewInit, HostListener, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalConnectionErrorComponent } from '../modal-connection-error/modal-connection-error.component';
import * as ROLES from '../../../commons/constants-roles';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { NotificationDisplayService } from 'src/app/services/shared/notification-display.service';
import { Notification } from 'src/app/models/notification.model';
import { ErrorHandlingService } from 'src/app/services/agent-services/error-handling.service';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit,  AfterViewInit {

  @Input() navLinks: {name: string, iconClass: string, url: string}[];
  user: User;
  isConnected: boolean;
  modalRef: MDBModalRef;
  @Input() accessibleViews: {label: string, url: string}[];
  notificationsList: Notification[] = [];
  notifsNb: number;
  errorReqMessage: string;
  isHamburgerBtnVisible: boolean;
  backDark = false;
  @ViewChild('sidenav', { static: false }) sidenav: ElementRef;
  @ViewChild('main', { static: false }) main: ElementRef;

  constructor(
    private ref: ChangeDetectorRef,
    private authService: AuthManagerService,
    private notificationDisplayService: NotificationDisplayService,
    private errorHandlingService: ErrorHandlingService
  ) {
    this.errorHandlingService.errorsSubject.subscribe(
      (errorMessage) => {
        this.errorReqMessage = errorMessage;
      }
    );
    this.setHumburgerBtn();
  }

  @HostListener('window:resize', ['$event'])
  setHumburgerBtn(event?): void {
    if (window.innerWidth < 800) {
      this.isHamburgerBtnVisible = true;
      if (this.sidenav){
        this.sidenav.nativeElement.style.width = '0px';
      }
    }
    else {
      this.isHamburgerBtnVisible = false;
      if (this.sidenav){
        this.sidenav.nativeElement.style.width = '265px';
      }
    }
  }


  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.notificationDisplayService.notifToAddSubject.subscribe(
      (notif) => {
        this.notificationsList.unshift(notif);
        this.notifsNb += 1;
        this.ref.detectChanges();
      }
    );
    this.notificationDisplayService.notifsListSubject.subscribe(
      (notifs) => {
        this.notificationsList = notifs;
        this.notifsNb = this.notificationsList.filter((val) => !val.read).length;
      }
    );
    this.notificationDisplayService.notifsNbToAddSubject.subscribe(
      (numb) => {
        if (this.notifsNb > 0){
          this.notifsNb += numb;
        }
      }
    );
  }


  ngAfterViewInit(): void {
  }

  notifReadEvent(nb: number): void {
    this.notificationDisplayService.notifsNbToAddSubject.next(-1);
  }

  logout(): void {
    this.authService.logout();
  }

  openNav(): void {
    this.sidenav.nativeElement.style.width = '265px';
    this.backDark = true;
  }

  closeNav(): void {
    this.sidenav.nativeElement.style.width = '0px';
    this.backDark = false;
  }

}
