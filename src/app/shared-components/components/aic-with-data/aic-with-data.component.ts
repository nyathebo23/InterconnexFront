import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-aic-with-data',
  templateUrl: './aic-with-data.component.html',
  styleUrls: ['./aic-with-data.component.scss']
})
export class AICWithDataComponent implements OnInit {

  aicForm: FormGroup;
  subjectChoices: Array<string> = new Array();
  subjectList: Array<string>;
  demandeAIC: DemandeAIC;
  initiatorInfos: string;
  dataLoaded = false;
  toDoAction: string;
  modalDatas: any;
  user: User;
  modalRef: MDBModalRef;
  loaderId = 'ddia-loader';
  isAerodromeLocalInf: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: MDBModalService,
    private controlActorService: ControlActorService,
    private modalDisplayService: ModalDisplayService,
    private authService: AuthManagerService,
    private activatedRoute: ActivatedRoute,
    private ngxUiLoaderService: NgxUiLoaderService
  ) {
    this.toDoAction = activatedRoute.snapshot.data.toDoAction;
    this.user = this.authService.getUser();
    this.isAerodromeLocalInf = this.user.role === SOURCE_VERIFIER && this.authService.getLocalInf() != null;
  }

  ngOnInit(): void {
    // this.initiatorInfos = this.demandeAIC.c
    const id = this.activatedRoute.snapshot.paramMap.get('id');
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
        this.ngxUiLoaderService.stopLoader(this.loaderId);
    });
    this.modalDatas = {
      ddiaClassName: AIC_CLASS_NAME,
      ddiaType: AIC_TYPE,
      ddiaId: id,
      action: this.toDoAction
    };
    this.subjectList = ['Administratif', 'ATC', 'Sécurité', 'Zone à statut particulier', 'Carte'];
    this.subjectChoices.push('DDIAFORMS.aic.subject.admin');
    this.subjectChoices.push('DDIAFORMS.aic.subject.atc');
    this.subjectChoices.push('DDIAFORMS.aic.subject.security');
    this.subjectChoices.push('DDIAFORMS.aic.subject.zone');
    this.subjectChoices.push('DDIAFORMS.aic.subject.maps');
  }

  openModal(): void {
    if (this.isAerodromeLocalInf){
      this.modalDatas.action = this.toDoAction;
      this.modalRef = this.modalService.show(ModalChoiceNationalinfComponent,
        this.modalDisplayService.getModalOptions(this.modalDatas, 'modal-dialog modal-notify modal-info'));
    }
    else{
      this.modalRef = this.modalService.show(ModalControlDDIAConfirmComponent,
        this.modalDisplayService.getModalOptions(this.modalDatas, 'modal-dialog modal-notify modal-info'));
    }
  }

  closeModal(): void {
    // this.mdbModal.hide();
  }
}
