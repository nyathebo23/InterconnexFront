import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { NOTAM_CLASS_NAME, VALIDITY_PERIOD_PLANNED } from 'src/app/commons/constants';
import { DemandeNOTAM } from 'src/app/models/demande-notam.model';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';

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
  @Input() toDoAction: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private controlActorService: ControlActorService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.toDoAction = route.snapshot.data.toDoAction;

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.controlActorService.getNOTAMDetailsById(id).subscribe(
      (demandenotam) => {
        console.log(demandenotam);
        this.demandeNOTAM = demandenotam;
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
      }
    );
  }

  // openModal(): void {
  //   this.mdbModal.show();
  // }

  // closeModal(): void {
  //   this.mdbModal.hide();
  // }

}
