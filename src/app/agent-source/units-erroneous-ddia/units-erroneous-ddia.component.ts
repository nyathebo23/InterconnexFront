import { Component, OnInit } from '@angular/core';
import { AgentSourceService } from 'src/app/services/agent-services/agent-source.service';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DemandeNOTAMItemList } from 'src/app/models/demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';

@Component({
  selector: 'app-units-erroneous-ddia',
  templateUrl: './units-erroneous-ddia.component.html',
  styleUrls: ['./units-erroneous-ddia.component.scss']
})
export class UnitsErroneousDDIAComponent implements OnInit {

  ddiaList: (DemandeAICItemList | DemandeNOTAMItemList | DemandeSUPPItemList) [];
  pagesNb = 1;
  constructor(private sourceAgentService: AgentSourceService) { }

  reloadDDIAItems(): void {
    this.sourceAgentService.getListDDIAWithErrors().subscribe(
      (ddiaList) => {
        this.ddiaList = ddiaList;
      }
    );
  }


  ngOnInit(): void {
    this.reloadDDIAItems();
  }

}
