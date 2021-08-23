import { Injectable } from '@angular/core';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { LocalInformer } from 'src/app/models/local-informer.model';
import { NationalInformer } from 'src/app/models/national-informer.model';
import { UnitSource } from 'src/app/models/unit-source.model';

@Injectable({
  providedIn: 'root'
})
export class AerodromeAgentService {

  unit: UnitSource;
  aerodrome: Aerodrome;
  aerodromeLocalInf: LocalInformer;
  nationalInfs: NationalInformer[];

  constructor() { }

  getUnit(): UnitSource {
    if (this.unit){
      return this.unit;
    }
    const jsonUnit = localStorage.getItem('unit');
    if (jsonUnit){
      return UnitSource.fromJSON(JSON.parse(jsonUnit));
    }
    return null;
  }

  getAerodrome(): Aerodrome {
    if (this.aerodrome){
      return this.aerodrome;
    }
    const jsonAerodrome = localStorage.getItem('aerodrome');
    if (jsonAerodrome) {
      return Aerodrome.fromJSON(JSON.parse(jsonAerodrome));
    }
    return null;
  }

  getLocalInformer(): LocalInformer {
    if (this.aerodromeLocalInf){
      return this.aerodromeLocalInf;
    }
    const jsonLocalInf = localStorage.getItem('aerodromeLocalInf');
    if (jsonLocalInf){
      return LocalInformer.fromJSON(JSON.parse(jsonLocalInf));
    }
    return null;
  }

}
