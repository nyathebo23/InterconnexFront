import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { SUPPAIP_CLASS_NAME } from 'src/app/commons/constants';
import { DemandeSUPPAIP } from 'src/app/models/demande-suppaip.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';

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
  @Input() toDoAction: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sourceAgentService: AgentSourceService,
    private controlActorService: ControlActorService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.toDoAction = route.snapshot.data.toDoAction;
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.controlActorService.getSUPPAIPDetailsById(id).subscribe(
      (demandesupp) => {
        console.log(demandesupp);
        this.demandeSUPP = demandesupp;
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
      }
    );
  }

}

