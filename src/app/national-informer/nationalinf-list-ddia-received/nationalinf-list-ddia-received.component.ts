import { Component, OnInit } from '@angular/core';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { InformateurNationalService } from 'src/app/services/agent-services/informateur-national.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';

@Component({
  selector: 'app-nationalinf-list-ddia-received',
  templateUrl: './nationalinf-list-ddia-received.component.html',
  styleUrls: ['./nationalinf-list-ddia-received.component.scss']
})
export class NationalinfListDDIAReceivedComponent implements OnInit {

  dateOrder = 'descendingDate';
  ddiaType = 'all';
  ddiaActionsList: ActionOnDDIA[] = [];

  constructor(
    private authService: AuthManagerService,
    private nationalInformerService: InformateurNationalService
  ) {
  }

  ngOnInit(): void {

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
    this.nationalInformerService.getDDIAListInWaiting(this.ddiaType, this.dateOrder)
    .then((ddiaActions) => {
      this.ddiaActionsList = ddiaActions;
    })
    .catch((err) => {

    });
  }

}
