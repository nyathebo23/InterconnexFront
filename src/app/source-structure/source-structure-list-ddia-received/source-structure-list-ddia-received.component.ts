import { Component, OnInit } from '@angular/core';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { StructureSourceService } from 'src/app/services/agent-services/structure-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';

@Component({
  selector: 'app-source-structure-list-ddia-received',
  templateUrl: './source-structure-list-ddia-received.component.html',
  styleUrls: ['./source-structure-list-ddia-received.component.scss']
})
export class SourceStructureListDDIAReceivedComponent implements OnInit {

  dateOrder = 'ascendingDate';
  ddiaType = 'all';
  ddiaActionsList: ActionOnDDIA[] = [];

  constructor(
    private authService: AuthManagerService,
    private structureSourceService: StructureSourceService
  ) {
  }

  ngOnInit(): void {
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
    this.structureSourceService.getDDIAListInWaiting(this.ddiaType, this.dateOrder)
    .then((actions) => {
      this.ddiaActionsList = actions;
    })
    .catch((err) => {

    });
  }


}
