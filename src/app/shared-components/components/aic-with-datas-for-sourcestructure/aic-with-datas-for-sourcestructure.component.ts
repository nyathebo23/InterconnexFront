import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AIC_CLASS_NAME, AIC_TYPE, PENDING_ADMISSION_STATE } from 'src/app/commons/constants';
import { DemandeAIC } from 'src/app/models/demande-aic.model';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { StructureSourceService } from 'src/app/services/agent-services/structure-source.service';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { ModalControlDDIAConfirmComponent } from '../modal-control-ddia-confirm/modal-control-ddia-confirm.component';
import { ModalRejectDDIAComponent } from '../modal-reject-ddia/modal-reject-ddia.component';

@Component({
  selector: 'app-aic-with-datas-for-sourcestructure',
  templateUrl: './aic-with-datas-for-sourcestructure.component.html',
  styleUrls: ['./aic-with-datas-for-sourcestructure.component.scss']
})
export class AicWithDatasForSourcestructureComponent implements OnInit {

  aicForm: FormGroup;
  subjectChoices: Array<{val: string, label: string}> = new Array();
  demandeAIC: DemandeAIC;
  initiatorInfos: string;
  dataLoaded = false;
  toDoAction: string;
  modalDatas: any;
  modalRef: MDBModalRef;
  loaderId = 'ddia-loader';
  isAerodromeConceded: boolean;
  labelTargetNationalInf: string;
  objectDefaultState = PENDING_ADMISSION_STATE;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: MDBModalService,
    private controlActorService: ControlActorService,
    private structureSourceService: StructureSourceService,
    private modalDisplayService: ModalDisplayService,
    private activatedRoute: ActivatedRoute,
    private ngxUiLoaderService: NgxUiLoaderService,
  ) {
    this.toDoAction = activatedRoute.snapshot.data.toDoAction;
    this.isAerodromeConceded = this.structureSourceService.isAerodromeConceded === 'yes';
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.modalDatas = {
      ddiaClassName: AIC_CLASS_NAME,
      ddiaType: AIC_TYPE,
      ddiaId: id,
      action: this.toDoAction
    };

    this.ngxUiLoaderService.startLoader(this.loaderId);
    this.controlActorService.getAICDetailsById(id).subscribe(
      (demandeaic) => {
        if (this.isAerodromeConceded && demandeaic.state === PENDING_ADMISSION_STATE){
          this.structureSourceService.getNationalInformerDDIATargeted(AIC_CLASS_NAME, id)
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

    this.subjectChoices.push({val: 'Administratif', label: 'DDIAFORMS.aic.subject.admin'});
    this.subjectChoices.push({val: 'ATC', label: 'DDIAFORMS.aic.subject.atc'});
    this.subjectChoices.push({val: 'Sécurité', label: 'DDIAFORMS.aic.subject.security'});
    this.subjectChoices.push({val: 'Zone à statut particulier', label: 'DDIAFORMS.aic.subject.zone'});
    this.subjectChoices.push({val: 'Carte', label: 'DDIAFORMS.aic.subject.maps'});

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
