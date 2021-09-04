import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DAILY_FREQ_ESTIMATED, DAILY_FREQ_PLANNED, NOTAM_CLASS_NAME, NOTAM_TYPE, VALIDITY_PERIOD_ESTIMATED, VALIDITY_PERIOD_PLANNED } from 'src/app/commons/constants';
import { DemandeNOTAM } from 'src/app/models/demande-notam.model';
import { User } from 'src/app/models/user.model';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalControlDDIAConfirmComponent } from '../modal-control-ddia-confirm/modal-control-ddia-confirm.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalChoiceNationalinfComponent } from '../modal-choice-nationalinf/modal-choice-nationalinf.component';
import { SOURCE_VERIFIER } from 'src/app/commons/constants-roles';
import { Location } from '@angular/common';
import { ModalRejectDDIAComponent } from '../modal-reject-ddia/modal-reject-ddia.component';
import { ModalPublishDDIAComponent } from '../modal-publish-ddia/modal-publish-ddia.component';
import { ModalConfirmRelanceComponent } from '../modal-confirm-relance/modal-confirm-relance.component';
import { ModalConfirmCancelDDIAComponent } from '../modal-confirm-cancel-ddia/modal-confirm-cancel-ddia.component';

@Component({
  selector: 'app-notam-with-data',
  templateUrl: './notam-with-data.component.html',
  styleUrls: ['./notam-with-data.component.scss']
})
export class NOTAMWithDataComponent implements OnInit {

  notamForm: FormGroup;
  demandeNOTAM: DemandeNOTAM;
  dataLoaded = false;
  className = NOTAM_CLASS_NAME;
  toDoAction: string;
  modalDatas: any;
  user: User;
  modalRef: MDBModalRef;
  initiatorInfos: string;
  loaderId = 'ddia-loader';
  isAerodromeConceded: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private modalDisplayService: ModalDisplayService,
    private modalService: MDBModalService,
    private controlActorService: ControlActorService,
    private authService: AuthManagerService,
    private activatedRoute: ActivatedRoute,
    private ngxUiLoaderService: NgxUiLoaderService,
  ) {
    this.toDoAction = activatedRoute.snapshot.data.toDoAction;
    this.user = this.authService.getUser();
    this.isAerodromeConceded = this.authService.getAerodrome() ? this.authService.getAerodrome().isConceded : false;
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.modalDatas = {
      ddiaClassName: NOTAM_CLASS_NAME,
      ddiaType: NOTAM_TYPE,
      ddiaId: id,
      action: this.toDoAction
    };

    this.ngxUiLoaderService.startLoader(this.loaderId);
    this.controlActorService.getNOTAMDetailsById(id).subscribe(
      (demandenotam) => {
        this.demandeNOTAM = demandenotam;
        const periodType = this.demandeNOTAM.periodType === VALIDITY_PERIOD_PLANNED ? 'planned' :
        this.demandeNOTAM.periodType === VALIDITY_PERIOD_ESTIMATED ? 'estimated' : '';
        const dailyFreqType = this.demandeNOTAM.dailyFreqType === DAILY_FREQ_PLANNED ? 'planned' :
        this.demandeNOTAM.dailyFreqType === DAILY_FREQ_ESTIMATED ? 'estimated' : '';
        const user = demandenotam.initiator;
        this.initiatorInfos = user.lastname + '  ' + user.lastname + ',  ' + user.quality + ',  ' + user.function;
        this.notamForm = this.formBuilder.group({
          depositDateTime: [{value: this.demandeNOTAM.depositDatetime, disabled: true}],
          rangeAction: [{value: this.demandeNOTAM.rangeAction, disabled: true}],
          typeNOTAM: [{value: this.demandeNOTAM.typeNOTAM, disabled: true}],
          text: [{value: this.demandeNOTAM.text, disabled: true}],
          notamTargetCode: [{value: this.demandeNOTAM.replaceorcancelNOTAMCode, disabled: true}],
          coords: [{value: this.demandeNOTAM.coords, disabled: true}],
          periodType: [{value: periodType, disabled: true}],
          validityPeriod: [{value: [this.demandeNOTAM.startValidityPeriod, this.demandeNOTAM.endValidityPeriod], disabled: true}],
          dailyFreqStart: [{value: this.demandeNOTAM.dailyFreqStart, disabled: true}],
          dailyFreqEnd: [{value: this.demandeNOTAM.dailyFreqEnd, disabled: true}],
          dailyFreqType: [{value: dailyFreqType, disabled: true}],
          infLimit: [{value: this.demandeNOTAM.lowerVerticalLimit, disabled: true}],
          supLimit: [{value: this.demandeNOTAM.upperVerticalLimit, disabled: true}],
        });
        this.dataLoaded = true;
      }, error => {
        this.controlActorService.setError(error);
      },
      () => {
        this.ngxUiLoaderService.stopLoader(this.loaderId);
      }
    );

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
