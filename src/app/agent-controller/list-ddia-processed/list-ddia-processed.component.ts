import { Component, OnInit } from '@angular/core';
import { ControlActorService } from 'src/app/services/agent-services/control-actor.service';
import { InformateurLocalService } from 'src/app/services/agent-services/informateur-local.service';
import { InformateurNationalService } from 'src/app/services/agent-services/informateur-national.service';
import { StructureSourceService } from 'src/app/services/agent-services/structure-source.service';
import { VerifSourceService } from 'src/app/services/agent-services/verif-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';

@Component({
  selector: 'app-list-ddia-processed',
  templateUrl: './list-ddia-processed.component.html',
  styleUrls: ['./list-ddia-processed.component.scss']
})
export class ListDDIAProcessedComponent implements OnInit {


  ddiaState = 'all';
  dateOrder = 'descendingDate';
  ddiaType = 'all';

  constructor(
    private authService: AuthManagerService,
    private controlActorService: ControlActorService
  ) {
  }

  onDDIAStateChange(state: string): void {
    this.ddiaState = state;
    console.log(state);
  }

  onDDIATypeChange(typeDDIA: string): void {
    this.ddiaType = typeDDIA;
    console.log(typeDDIA);
  }

  onDateOrderChange(dateOrder: string): void {
    this.dateOrder = dateOrder;
    console.log(dateOrder);
  }

  ngOnInit(): void {

  }

}
