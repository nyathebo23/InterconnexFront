import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AIC_CLASS_NAME, AIC_TYPE } from 'src/app/commons/constants';
import { SOURCE_VERIFIER } from 'src/app/commons/constants-roles';
import { DemandeAIC } from 'src/app/models/demande-aic.model';
import { User } from 'src/app/models/user.model';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalChoiceNationalinfComponent } from '../modal-choice-nationalinf/modal-choice-nationalinf.component';
import { ModalControlDDIAConfirmComponent } from '../modal-control-ddia-confirm/modal-control-ddia-confirm.component';
import { ModalRejectDDIAComponent } from '../modal-reject-ddia/modal-reject-ddia.component';
import { ModalPublishDDIAComponent } from '../modal-publish-ddia/modal-publish-ddia.component';
import { ModalConfirmRelanceComponent } from '../modal-confirm-relance/modal-confirm-relance.component';
import { ModalConfirmCancelDDIAComponent } from '../modal-confirm-cancel-ddia/modal-confirm-cancel-ddia.component';

@Component({
  selector: 'app-aic-with-data',
  templateUrl: './aic-with-data.component.html',
  styleUrls: ['./aic-with-data.component.scss']
})
export class AICWithDataComponent implements OnInit {

  aicForm: FormGroup;
  subjectChoices: Array<{val: string, label: string}> = new Array();
  demandeAIC: DemandeAIC;
  initiatorInfos: string;
  dataLoaded = false;
  toDoAction: string;
  modalDatas: any;
  user: User;
  modalRef: MDBModalRef;
  loaderId = 'ddia-loader';
  isAerodromeConceded: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: MDBModalService,
    private controlActorService: ControlActorService,
    private modalDisplayService: ModalDisplayService,
    private authService: AuthManagerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngxUiLoaderService: NgxUiLoaderService,
  ) {
    this.toDoAction = activatedRoute.snapshot.data.toDoAction;
    this.user = this.authService.getUser();
    this.isAerodromeConceded = this.authService.getAerodrome() ? this.authService.getAerodrome().isConceded : false;
  }

  ngOnInit(): void {
    try {
      const id = atob(decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('id')));
      this.modalDatas = {
        ddiaClassName: AIC_CLASS_NAME,
        ddiaType: AIC_TYPE,
        ddiaId: id,
        action: this.toDoAction
      };

      // this.initiatorInfos = this.demandeAIC.c
      this.ngxUiLoaderService.startLoader(this.loaderId);
      this.controlActorService.getAICDetailsById(id).subscribe(
        (demandeaic) => {
          this.demandeAIC = demandeaic;
          const user = demandeaic.initiator;
          this.initiatorInfos = user.lastname + '  ' + user.lastname + ',  ' + user.quality + ',  ' + user.function;
          this.aicForm = this.formBuilder.group({
            depositDateTime: [{value: this.demandeAIC.depositDatetime, disabled: true}],
            subject: [{value: this.demandeAIC.subject, disabled: true}],
            object: [{value: this.demandeAIC.object, disabled: true}],
            text: [{value: this.demandeAIC.text, disabled: true}],
          });
          this.dataLoaded = true;
      }, error => {
        this.controlActorService.setError(error);
      },
      () => {
        this.ngxUiLoaderService.stopLoader(this.loaderId);
      });

    }
    catch (err){

    }
    this.subjectChoices.push({val: 'Administratif', label: 'DDIAFORMS.aic.subject.admin'});
    this.subjectChoices.push({val: 'ATC', label: 'DDIAFORMS.aic.subject.atc'});
    this.subjectChoices.push({val: 'Sécurité', label: 'DDIAFORMS.aic.subject.security'});
    this.subjectChoices.push({val: 'Zone à statut particulier', label: 'DDIAFORMS.aic.subject.zone'});
    this.subjectChoices.push({val: 'Carte', label: 'DDIAFORMS.aic.subject.maps'});
  }

  downloadFile(url: string, filename: string): void {
    this.controlActorService.downloadFile(url, filename);
  }

  goToModif(): void {
    this.router.navigate(['/source/unitsddia-erroneous/present-ddia/aic/', btoa(this.demandeAIC.id)]);
  }

  openOKModal(): void {
    if (this.isAerodromeConceded && this.user.role === SOURCE_VERIFIER){
      this.modalRef = this.modalService.show(ModalChoiceNationalinfComponent,
        this.modalDisplayService.getModalOptions(this.modalDatas, 'modal-dialog modal-notify modal-info'));
    }
    else{
      this.modalRef = this.modalService.show(ModalControlDDIAConfirmComponent,
        this.modalDisplayService.getModalOptions(this.modalDatas, 'modal-dialog modal-notify modal-info'));
    }
  }

  openRejectModal(functionToTrigger: (ddiaId: string, ddiaClassName: string, data: {[key: string]: string}) => Promise<any>): void {
    this.modalDatas.functionToTrigger = functionToTrigger;
    this.modalRef = this.modalService.show(ModalRejectDDIAComponent,
      this.modalDisplayService.getModalOptions(this.modalDatas, 'modal-dialog modal-notify modal-danger'));
  }

  openPublishSetModal(): void {
    this.modalRef = this.modalService.show(ModalPublishDDIAComponent,
      this.modalDisplayService.getModalOptions(this.modalDatas, 'modal-dialog modal-notify modal-info'));
  }

  openRelanceConfirmModal(): void {
    this.modalRef = this.modalService.show(ModalConfirmRelanceComponent,
      this.modalDisplayService.getModalOptions(this.modalDatas, 'modal-dialog modal-notify modal-warning'));
  }

  openCancelConfirmModal(): void {
    this.modalRef = this.modalService.show(ModalConfirmCancelDDIAComponent,
      this.modalDisplayService.getModalOptions(this.modalDatas, 'modal-dialog modal-notify modal-danger'));
  }

}
