import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PENDING_ADMISSION_STATE, SUPPAIP_CLASS_NAME, SUPPAIP_TYPE } from 'src/app/commons/constants';
import { DemandeSUPPAIP } from 'src/app/models/demande-suppaip.model';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { ModalControlDDIAConfirmComponent } from '../modal-control-ddia-confirm/modal-control-ddia-confirm.component';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalRejectDDIAComponent } from '../modal-reject-ddia/modal-reject-ddia.component';
import { StructureSourceService } from 'src/app/services/agent-services/structure-source.service';

@Component({
  selector: 'app-suppaip-with-datas-for-sourcestructure',
  templateUrl: './suppaip-with-datas-for-sourcestructure.component.html',
  styleUrls: ['./suppaip-with-datas-for-sourcestructure.component.scss']
})
export class SUPPAIPWithDatasForSourcestructureComponent implements OnInit {

  suppaipForm: FormGroup;
  demandeSUPP: DemandeSUPPAIP;
  dataLoaded = false;
  className = SUPPAIP_CLASS_NAME;
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
      ddiaClassName: SUPPAIP_CLASS_NAME,
      ddiaType: SUPPAIP_TYPE,
      ddiaId: id,
      action: this.toDoAction
    };

    this.ngxUiLoaderService.startLoader(this.loaderId);
    this.controlActorService.getSUPPAIPDetailsById(id).subscribe(
      (demandesupp) => {
        if (this.isAerodromeConceded){
          this.structureSourceService.getNationalInformerDDIATargeted(SUPPAIP_CLASS_NAME, id)
          .then((nationalinf) => {
            console.log(nationalinf);
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
        this.demandeSUPP = demandesupp;
        const user = demandesupp.initiator;
        this.initiatorInfos = user.lastname + '  ' + user.lastname + ',  ' + user.quality + ',  ' + user.function;
        this.suppaipForm = this.formBuilder.group({
          depositDateTime: [{value: this.demandeSUPP.depositDatetime, disabled: true}],
          typeSUPPAIP: [{value: this.demandeSUPP.typeSUPPAIP, disabled: true}],
          object: [{value: this.demandeSUPP.object, disabled: true}],
          codeDDIAToReplace: [{value: this.demandeSUPP.replacedDDIACode, disabled: true}],
          aipTargetSections: [{value: this.demandeSUPP.targetSection, disabled: true}],
          // aipTargetSectForm: new FormArray([]),
          validityPeriod: [{value: [this.demandeSUPP.startValidityPeriod, this.demandeSUPP.endValidityPeriod], disabled: true}],
          descriptionText: [{value: this.demandeSUPP.descriptionText, disabled: true}],
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
