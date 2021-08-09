import { Component, OnInit } from '@angular/core';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { InformateurLocalService } from 'src/app/services/agent-services/informateur-local.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';

@Component({
  selector: 'app-localinf-list-ddia-received',
  templateUrl: './localinf-list-ddia-received.component.html',
  styleUrls: ['./localinf-list-ddia-received.component.scss']
})
export class LocalinfListDDIAReceivedComponent implements OnInit {

  dateOrder = 'descendingDate';
  ddiaType = 'all';
  ddiaActionsList: ActionOnDDIA[] = [];

  constructor(
    private authService: AuthManagerService,
    private localInformerService: InformateurLocalService
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
    this.localInformerService.getDDIAListInWaiting(this.ddiaType,  this.dateOrder)
    .then((ddiaActions) => {
      this.ddiaActionsList = ddiaActions;
    })
    .catch((err) => {

    });
  }


}
