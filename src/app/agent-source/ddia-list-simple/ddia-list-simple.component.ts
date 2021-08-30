import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DemandeNOTAMItemList } from 'src/app/models/demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';

@Component({
  selector: 'app-ddia-list-simple',
  templateUrl: './ddia-list-simple.component.html',
  styleUrls: ['./ddia-list-simple.component.scss']
})
export class DDIAListSimpleComponent implements OnInit, OnChanges {

  @Input() labelTitle: string;
  @Input() ddiaList: (DemandeNOTAMItemList | DemandeSUPPItemList | DemandeAICItemList)[];
  loaderId = 'ddia-loader-list';
  constructor(private ngxUiLoaderService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxUiLoaderService.startLoader(this.loaderId);
  }

  ngOnChanges(): void {
    if (this.ddiaList){
      this.ngxUiLoaderService.stopLoader(this.loaderId);
    }
  }

}
