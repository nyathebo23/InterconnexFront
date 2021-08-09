import { Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  isAerodromeLocalInf: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private modalDisplayService: ModalDisplayService,
    private controlActorService: ControlActorService,
    private modalService: MDBModalService,
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
    this.controlActorService.getSUPPAIPDetailsById(id).subscribe(
      (demandesupp) => {
        this.demandeSUPP = demandesupp;
        console.log(demandesupp.attachments);
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
    this.modalDatas = {
      ddiaClassName: SUPPAIP_CLASS_NAME,
      ddiaType: SUPPAIP_TYPE,
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


