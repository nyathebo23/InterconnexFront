import { Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SUPPAIP_CLASS_NAME, SUPPAIP_TYPE } from 'src/app/commons/constants';
import { DemandeSUPPAIP } from 'src/app/models/demande-suppaip.model';
import { User } from 'src/app/models/user.model';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { ModalControlDDIAConfirmComponent } from '../modal-control-ddia-confirm/modal-control-ddia-confirm.component';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModalDisplayService } from 'src/app/services/shared/modal-display.service';
import { SOURCE_VERIFIER } from 'src/app/commons/constants-roles';
import { ModalChoiceNationalinfComponent } from '../modal-choice-nationalinf/modal-choice-nationalinf.component';
import { ModalRejectDDIAComponent } from '../modal-reject-ddia/modal-reject-ddia.component';
import { ModalPublishDDIAComponent } from '../modal-publish-ddia/modal-publish-ddia.component';
import { ModalConfirmRelanceComponent } from '../modal-confirm-relance/modal-confirm-relance.component';
import { ModalConfirmCancelDDIAComponent } from '../modal-confirm-cancel-ddia/modal-confirm-cancel-ddia.component';

@Component({
  selector: 'app-suppaip-with-data',
  templateUrl: './suppaip-with-data.component.html',
  styleUrls: ['./suppaip-with-data.component.scss']
})
export class SUPPAIPWithDataComponent implements OnInit {

  suppaipForm: FormGroup;
  demandeSUPP: DemandeSUPPAIP;
  dataLoaded = false;
  className = SUPPAIP_CLASS_NAME;
  toDoAction: string;
  user: User;
  modalDatas: any;
  modalRef: MDBModalRef;
  initiatorInfos: string;
  loaderId = 'ddia-loader';
  isAerodromeConceded: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private modalDisplayService: ModalDisplayService,
    private controlActorService: ControlActorService,
    private modalService: MDBModalService,
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
      const id = atob(this.activatedRoute.snapshot.paramMap.get('id'));
      this.modalDatas = {
        ddiaClassName: SUPPAIP_CLASS_NAME,
        ddiaType: SUPPAIP_TYPE,
        ddiaId: id,
        action: this.toDoAction
      };

      this.ngxUiLoaderService.startLoader(this.loaderId);
      this.controlActorService.getSUPPAIPDetailsById(id).subscribe(
        (demandesupp) => {
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
        }, error => {
          this.controlActorService.setError(error);
        },
        () => {
          this.ngxUiLoaderService.stopLoader(this.loaderId);
        }
      );
    }
    catch (err) {

    }
  }

  goToModif(): void {
    this.router.navigate(['/source/unitsddia-erroneous/present-ddia/suppaip/', btoa(this.demandeSUPP.id)]);
  }

  downloadFile(url: string, filename: string): void {
    this.controlActorService.downloadFile(url, filename);
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


