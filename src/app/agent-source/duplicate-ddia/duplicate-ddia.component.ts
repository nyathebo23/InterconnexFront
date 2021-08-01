import { Component, OnInit } from '@angular/core';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DemandeNOTAMItemList } from 'src/app/models/demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';

@Component({
  selector: 'app-duplicate-ddia',
  templateUrl: './duplicate-ddia.component.html',
  styleUrls: ['./duplicate-ddia.component.scss']
})
export class DuplicateDDIAComponent implements OnInit {

  ddiaState = 'all';
  dateOrder = 'descendingDate';
  ddiaType = 'notam';
  ddiaList: (DemandeAICItemList | DemandeNOTAMItemList | DemandeSUPPItemList) [];

  constructor(
    private authService: AuthManagerService,
    private sourceAgentService: AgentSourceService
  ) {
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

  reloadDDIAItems(): void {
    this.sourceAgentService.getListDDIAInitiatedByUnit(this.ddiaType).subscribe(
      (ddiaList) => {
        this.ddiaList = ddiaList;
        console.log(ddiaList);
      }
    );
  }


  ngOnInit(): void {
    this.sourceAgentService.getListDDIAInitiatedByUnit(this.ddiaType).subscribe(
      (ddiaList) => {
        this.ddiaList = ddiaList;
        console.log(ddiaList);
      }
    );
  }



}
