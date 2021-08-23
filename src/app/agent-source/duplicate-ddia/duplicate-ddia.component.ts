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
  page = '1';
  pagesNb: number;
  ddiaList: (DemandeAICItemList | DemandeNOTAMItemList | DemandeSUPPItemList) [];

  constructor(
    private authService: AuthManagerService,
    private sourceAgentService: AgentSourceService
  ) {
  }

  onDDIAStateChange(state: string): void {
    this.ddiaState = state;
    this.page = '1';
    this.reloadDDIAItems();
  }

  onDDIATypeChange(typeDDIA: string): void {
    this.page = '1';
    this.ddiaType = typeDDIA;
    this.reloadDDIAItems();
  }

  onDateOrderChange(dateOrder: string): void {
    this.dateOrder = dateOrder;
    this.reloadDDIAItems();
  }

  onPageChange(page: string): void {
    this.page = page;
    this.reloadDDIAItems();
  }

  reloadDDIAItems(): void {
    this.sourceAgentService.getListDDIAInitiatedByUnit(this.ddiaType, this.ddiaState, this.dateOrder, this.page).subscribe(
      (ddiaList) => {
        this.ddiaList = ddiaList.listDDIA;
        console.log(ddiaList);
      }
    );
  }


  ngOnInit(): void {
    this.reloadDDIAItems();
  }



}
