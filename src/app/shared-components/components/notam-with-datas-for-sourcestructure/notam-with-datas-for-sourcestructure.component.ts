import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NOTAM_CLASS_NAME, NOTAM_TYPE, PENDING_ADMISSION_STATE, VALIDITY_PERIOD_PLANNED } from 'src/app/commons/constants';
import { DemandeNOTAM } from 'src/app/models/demande-notam.model';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalControlDDIAConfirmComponent } from '../modal-control-ddia-confirm/modal-control-ddia-confirm.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalRejectDDIAComponent } from '../modal-reject-ddia/modal-reject-ddia.component';
import { StructureSourceService } from 'src/app/services/agent-services/structure-source.service';

@Component({
  selector: 'app-notam-with-datas-for-sourcestructure',
  templateUrl: './notam-with-datas-for-sourcestructure.component.html',
  styleUrls: ['./notam-with-datas-for-sourcestructure.component.scss']
})
export class NOTAMWithDatasForSourcestructureComponent implements OnInit {

  notamForm: FormGroup;
  demandeNOTAM: DemandeNOTAM;
  dataLoaded = false;
  className = NOTAM_CLASS_NAME;
  toDoAction: string;
  modalDatas: any;
  modalRef: MDBModalRef;
  initiatorInfos: string;
  loaderId = 'ddia-loader';
  isAerodromeConceded: boolean;
  labelTargetNationalInf: string;
  objectDefaultState = PENDING_ADMISSION_STATE;
  constructor(
    private formBuilder: FormBuilder,
    private modalDisplayService: ModalDisplayService,
    private modalService: MDBModalService,
    private controlActorService: ControlActorService,
    private structureSourceService: StructureSourceService,
    private activatedRoute: ActivatedRoute,
    private ngxUiLoaderService: NgxUiLoaderService,
  ) {
    this.toDoAction = activatedRoute.snapshot.data.toDoAction;
    this.isAerodromeConceded = this.structureSourceService.isAerodromeConceded === 'yes';
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
        if (this.isAerodromeConceded){
          this.structureSourceService.getNationalInformerDDIATargeted(NOTAM_CLASS_NAME, id)
          .then((nationalinf) => {
            if (nationalinf.isAuthority){
              this.labelTargetNationalInf = 'SOURCESTRUCTURE.targetCCAALabel';
              this.modalDatas.approbationAfter = 'no';
            }
            else {
              this.labelTargetNationalInf = 'SOURCESTRUCTURE.targetASECNALabel';
              this.modalDatas.approbationAfter = 'yes';
            }
          })
          .catch((err) => {

          });
        }
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

  }
  openOKModal(): void {
    this.modalRef = this.modalService.show(ModalControlDDIAConfirmComponent,
      this.modalDisplayService.getModalOptions(this.modalDatas, 'modal-dialog modal-notify modal-info'));
  }

  openRejectModal(): void {
    this.modalDatas.functionToTrigger = this.controlActorService.admitDDIA;
    this.modalRef = this.modalService.show(ModalRejectDDIAComponent,
      this.modalDisplayService.getModalOptions(this.modalDatas, 'modal-dialog modal-notify modal-danger'));
  }
}
