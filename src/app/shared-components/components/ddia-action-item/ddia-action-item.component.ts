import { Component, OnInit, Input } from '@angular/core';
import { ActionOnDDIA } from 'src/app/models/action-on-ddia.model';
import { DemandeAICItemList } from 'src/app/models/demandeAIC-item-list.model';
import { DemandeNOTAMItemList } from 'src/app/models/demandeNOTAM-item-list.model';
import { DemandeSUPPItemList } from 'src/app/models/demandeSUPP-item-list.model';
import { NOTAM_TYPE, AIC_TYPE, SUPPAIP_TYPE } from 'src/app/commons/constants';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-ddia-action-item',
  templateUrl: './ddia-action-item.component.html',
  styleUrls: ['./ddia-action-item.component.scss']
})
export class DDIAActionItemComponent implements OnInit {

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
  @Input() actionOnDDIA: ActionOnDDIA;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const startPath0 = this.route.parent.parent.snapshot.url[0].path;
    const startPath = this.route.parent.snapshot.url[0].path;
    this.id = this.actionOnDDIA.ddiaObject.id;
    this.reference = this.actionOnDDIA.ddiaObject.identDDIA;
    this.typeDDIA = this.actionOnDDIA.ddiaObject.ddiaType;
    this.airportname = this.actionOnDDIA.ddiaObject.airportName;
    this.unitname = this.actionOnDDIA.ddiaObject.unitName;
    this.text = this.actionOnDDIA.ddiaObject.text;
    this.state = this.actionOnDDIA.ddiaObject.state;
    this.actionDate = this.actionOnDDIA.datetime.toLocaleString();
    this.url = this.actionOnDDIA.ddiaObject.url;
    if (this.actionOnDDIA.ddiaObject.ddiaType === AIC_TYPE){
      const aicobject = this.actionOnDDIA.ddiaObject as DemandeAICItemList;
      this.object = aicobject.object;
      this.pathToExtend = startPath0 + '/' + startPath + '/present-ddia/aic/';
    }
    else if (this.actionOnDDIA.ddiaObject.ddiaType === SUPPAIP_TYPE){
      const suppaipobject = this.actionOnDDIA.ddiaObject as DemandeSUPPItemList;
      this.type = suppaipobject.typeSUPPAIP;
      this.pathToExtend = startPath0 + '/'  + startPath + '/present-ddia/suppaip/';
    }
    else if (this.actionOnDDIA.ddiaObject.ddiaType === NOTAM_TYPE) {
      const notamobject = this.actionOnDDIA.ddiaObject as DemandeNOTAMItemList;
      this.type = notamobject.typeNOTAM;
      this.pathToExtend = startPath0 + '/'  + startPath + '/present-ddia/notam/';
    }
    if (this.actionOnDDIA.ddiaObject.ddiaType === NOTAM_TYPE || this.actionOnDDIA.ddiaObject.ddiaType === SUPPAIP_TYPE){
      const object = this.actionOnDDIA.ddiaObject as DemandeNOTAMItemList | DemandeSUPPItemList;
      this.validityPeriodStart = object.startValidityPeriod.toLocaleString();
      this.validityPeriodEnd = object.endValidityPeriod.toLocaleString();
    }

  }
  goToDetails(): void {
    const nationalInf = this.actionOnDDIA.nationalInfDest;
    if (nationalInf){
      const navigationParams = {
          nationalInfName: nationalInf.name,
          isAuthority: nationalInf.isAuthority
      };
      this.router.navigateByUrl('/' + this.pathToExtend + this.id, {state: navigationParams});
    }
    else {
      this.router.navigate(['/' + this.pathToExtend, this.id]);
    }

  }
}
