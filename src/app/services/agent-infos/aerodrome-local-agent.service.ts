import { Injectable } from '@angular/core';
import { AerodromeExtendI } from 'src/app/interfaces/aerodrome-extend.interface';
import { Aerodrome } from 'src/app/models/aerodrome.model';
import { LocalInformerExtend } from 'src/app/models/local-informer-extend.model';
import { UnitSource } from 'src/app/models/unit-source.model';

@Injectable({
  providedIn: 'root'
})
export class AerodromeLocalAgentService {

  localinformer: LocalInformerExtend;
  aerodromeExtend: AerodromeExtendI;

  constructor() { }

  getLocalInf(): LocalInformerExtend {
    if (this.localinformer){
      return this.localinformer;
    }
    const jsonData = localStorage.getItem('localInfExtend');
    if (jsonData){
      return LocalInformerExtend.fromJSON(JSON.parse(jsonData));
    }
    return null;
  }

  getAerodromeExtend(): AerodromeExtendI {
    if (this.aerodromeExtend){
      return this.aerodromeExtend;
    }
    const jsonData = localStorage.getItem('aerodromeExtend');
    if (jsonData){
      return JSON.parse(jsonData);
    }
    return null;
  }


}
