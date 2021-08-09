import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NOTAM_CLASS_NAME, NOTAM_TYPE, VALIDITY_PERIOD_PLANNED } from 'src/app/commons/constants';
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
  isAerodromeLocalInf: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private modalDisplayService: ModalDisplayService,
    private modalService: MDBModalService,
    private controlActorService: ControlActorService,
    private authService: AuthManagerService,
    private activatedRoute: ActivatedRoute,
    private ngxUiLoaderService: NgxUiLoaderService
  ) {
    this.toDoAction = activatedRoute.snapshot.data.toDoAction;
    this.user = this.authService.getUser();
    this.isAerodromeLocalInf = this.user.role === SOURCE_VERIFIER && this.authService.getLocalInf() != null;
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.ngxUiLoaderService.startLoader(this.loaderId);
    this.controlActorService.getNOTAMDetailsById(id).subscribe(
      (demandenotam) => {
        this.demandeNOTAM = demandenotam;
        const user = demandenotam.initiator;
        this.initiatorInfos = user.lastname + '  ' + user.lastname + ',  ' + user.quality + ',  ' + user.function;
        this.notamForm = this.formBuilder.group({
          depositDateTime: [{value: this.demandeNOTAM.depositDatetime, disabled: true}],
          rangeAction: [{value: this.demandeNOTAM.rangeAction, disabled: true}],
          typeNOTAM: [{value: this.demandeNOTAM.typeNOTAM, disabled: true}],
          text: [{value: this.demandeNOTAM.text, disabled: true}],
          notamTargetCode: [{value: this.demandeNOTAM.replaceorcancelNOTAMCode, disabled: true}],
          coords: [{value: this.demandeNOTAM.coords, disabled: true}],
          periodType: [{value: this.demandeNOTAM.periodType === VALIDITY_PERIOD_PLANNED ? 'planned' : 'estimated', disabled: true}],
          validityPeriod: [{value: [this.demandeNOTAM.startValidityPeriod, this.demandeNOTAM.endValidityPeriod], disabled: true}],
          dailyFreqStart: [{value: this.demandeNOTAM.dailyFreqStart, disabled: true}],
          dailyFreqEnd: [{value: this.demandeNOTAM.dailyFreqEnd, disabled: true}],
          infLimit: [{value: this.demandeNOTAM.lowerVerticalLimit, disabled: true}],
          supLimit: [{value: this.demandeNOTAM.upperVerticalLimit, disabled: true}],
        });
        this.dataLoaded = true;
        this.ngxUiLoaderService.stopLoader(this.loaderId);
      }
    );
    this.modalDatas = {
      ddiaClassName: NOTAM_CLASS_NAME,
      ddiaType: NOTAM_TYPE,
      ddiaId: id,
      action: this.toDoAction
    };
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
}
