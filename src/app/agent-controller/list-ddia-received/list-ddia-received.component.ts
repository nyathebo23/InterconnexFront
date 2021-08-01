import { Component, OnInit } from '@angular/core';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DemandeNOTAMItemList } from 'src/app/models/demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';
import { ActivatedRoute } from '@angular/router';
import { LOCAL_INFORMER, SOURCE_AGENT, SOURCE_STRUCTURE, SOURCE_VERIFIER } from 'src/app/commons/constants-roles';
import { Observable } from 'rxjs';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';


@Component({
  selector: 'app-list-ddia-received',
  templateUrl: './list-ddia-received.component.html',
  styleUrls: ['./list-ddia-received.component.scss']
})
export class ListDDIAReceivedComponent implements OnInit {

  ddiaState = 'all';
  dateOrder = 'descendingDate';
  ddiaType = 'all';
  ddiaActionsList: ActionOnDDIA[];
  agentRole: string;
  getDDIAListFunction: (typeDDIA: string, isLocalInf?: string, fromLocalInf?: string) => Observable<ActionOnDDIA[]>;
  constructor(
    private controlActorService: ControlActorService,

    private route: ActivatedRoute
  ) {
    this.agentRole = this.route.parent.snapshot.paramMap.get('agentRole');
  }
  onDDIAStateChange(state: string): void {
    this.ddiaState = state;
    this.reloadDDIAItems();
  }

  onDDIATypeChange(typeDDIA: string): void {
    this.ddiaType = typeDDIA;
    this.reloadDDIAItems();
  }

  onDateOrderChange(dateOrder: string): void {
    this.dateOrder = dateOrder;
    this.reloadDDIAItems();
  }

  reloadDDIAItems(): void {switch (this.agentRole){
    case SOURCE_VERIFIER:
      this.controlActorService.getDDIAListInWaitingForSourceVerifier(this.ddiaType, 'yes')
      .subscribe((resList) => {
        this.ddiaActionsList = resList;
      });
      break;
    case SOURCE_STRUCTURE:
      this.controlActorService.getDDIAListInWaitingForSourceStructure(this.ddiaType, 'yes')
      .subscribe((resList) => {
        this.ddiaActionsList = resList;
      });
      break;
    case LOCAL_INFORMER:
      this.controlActorService.getDDIAListInWaitingForExtLocalInf(this.ddiaType)
      .subscribe((resList) => {
        this.ddiaActionsList = resList;
      });
      break;
  }

  }

  ngOnInit(): void {

    this.reloadDDIAItems();
  }

}
