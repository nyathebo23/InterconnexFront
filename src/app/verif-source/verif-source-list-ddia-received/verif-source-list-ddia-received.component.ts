import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { VerifSourceService } from 'src/app/services/agent-services/verif-source.service';
import { AuthManagerService } from 'src/app/services/auth-services/auth-manager.service';

@Component({
  selector: 'app-verif-source-list-ddia-received',
  templateUrl: './verif-source-list-ddia-received.component.html',
  styleUrls: ['./verif-source-list-ddia-received.component.scss']
})
export class VerifSourceListDDIAReceivedComponent implements OnInit {

  dateOrder = 'ascendingDate';
  ddiaType = 'all';
  ddiaActionsList: ActionOnDDIA[];
  errors: string[];
  constructor(
    private authService: AuthManagerService,
    private verifSourceService: VerifSourceService
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
    this.verifSourceService.getDDIAListInWaiting(this.ddiaType, this.dateOrder)
    .then((ddiaActions) => {
      this.ddiaActionsList = ddiaActions;
    })
    .catch((err: HttpErrorResponse) => {

    });
  }

}
