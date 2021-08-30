import { Component, OnInit, Input } from '@angular/core';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DemandeNOTAMItemList } from 'src/app/models/demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';
import { NOTAM_TYPE, AIC_TYPE, SUPPAIP_TYPE } from 'src/app/commons/constants';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-ddia-item',
  templateUrl: './ddia-item.component.html',
  styleUrls: ['./ddia-item.component.scss']
})
export class DDIAItemComponent implements OnInit {

  id: string;
  url: string;
  reference: string;
  typeDDIA: string;
  type: string;
  state: string;
  unitname: string;
  airportname: string;
  object: string;
  text: string;
  periodType: string;
  validityPeriodStart: string;
  validityPeriodEnd: string;
  action: string;
  actionDate: string;
  pathToExtend: string;
  @Input() ddiaItem: DemandeSUPPItemList | DemandeAICItemList | DemandeNOTAMItemList;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
      const startPath = this.route.parent.parent.routeConfig.path;
      const startPath1 = this.route.parent.routeConfig.path;
      this.id = this.ddiaItem.id;
      this.reference = this.ddiaItem.identDDIA;
      this.typeDDIA = this.ddiaItem.ddiaType;
      this.airportname = this.ddiaItem.airportName;
      this.unitname = this.ddiaItem.unitName;
      this.text = this.ddiaItem.text;
      this.state = this.ddiaItem.state;
      this.action = 'ddialist.ddiaitem.initiated';
      this.actionDate = this.ddiaItem.depositDatetime.toLocaleString();
      this.url = this.ddiaItem.url;
      if (this.ddiaItem.ddiaType === AIC_TYPE){
        const aicobject = this.ddiaItem as DemandeAICItemList;
        this.object = aicobject.object;
        this.pathToExtend = startPath + '/' + startPath1 + '/present-ddia/' + 'aic';
      }
      else if (this.ddiaItem.ddiaType === SUPPAIP_TYPE){
        const suppaipobject = this.ddiaItem as DemandeSUPPItemList;
        this.type = suppaipobject.typeSUPPAIP;
        this.pathToExtend = startPath + '/' + startPath1 + '/present-ddia/' + 'suppaip';
      }
      else if (this.ddiaItem.ddiaType === NOTAM_TYPE) {
        const notamobject = this.ddiaItem as DemandeNOTAMItemList;
        this.type = notamobject.typeNOTAM;
        this.pathToExtend = startPath + '/' + startPath1 + '/present-ddia/' + 'notam';
      }
      if (this.ddiaItem.ddiaType === NOTAM_TYPE || this.ddiaItem.ddiaType === SUPPAIP_TYPE){
        const object = this.ddiaItem as DemandeNOTAMItemList | DemandeSUPPItemList;
        this.validityPeriodStart = object.startValidityPeriod.toLocaleString();
        this.validityPeriodEnd = object.endValidityPeriod.toLocaleString();
      }
    }



}
