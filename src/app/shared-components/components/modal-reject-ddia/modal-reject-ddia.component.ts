import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';

@Component({
  selector: 'app-modal-reject-ddia',
  templateUrl: './modal-reject-ddia.component.html',
  styleUrls: ['./modal-reject-ddia.component.scss']
})
export class ModalRejectDDIAComponent implements OnInit {

  contentText: string;
  ddiaClassName: string;
  ddiaId: string;
  ddiaType: string;
  action: string;
  loading = false;
  message: string;
  functionToTrigger: (ddiaId: string, ddiaClassName: string, data: {[key: string]: string}) => Promise<any>;
  // Les services 'authService', 'http', et 'router' sont utilisés dans le context de la fonction
  // 'functionToTrigger' car celle-ci n'est pas liée au contexte de la classe ControlActorService dans laquelle elle est implémentée
  constructor(
    public modalRef: MDBModalRef,
    private authService: AuthManagerService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  endSubmitAction(): void {
    this.loading = false;
    this.reloadCurrentRoute();
    this.modalRef.hide();
  }

  isMessageInvalid(): boolean {
    return !this.message || this.message.trim() === '' || this.message.length < 20;
  }

  executeRejectFunc(): void {
    this.loading = true;
    this.functionToTrigger(this.ddiaId, this.ddiaClassName, {decision: 'reject', message: this.message})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      alert(err.error);
    })
    .finally(() => this.endSubmitAction());
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
